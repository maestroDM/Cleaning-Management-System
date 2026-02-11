<?php

namespace app\Http\Controllers\Api;

use App\Models\Booking;
use App\Models\Quote;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BookingController extends Controller
{
    public function store(Request $request)
    {
       $user = $request->user();

       $validated = $request->validate([
            'quote_id' => 'required|exists:quotes,id',
            'booking_date' => 'required|date|after_or_equal:today',
            'booking_time' => 'required|date_format:H:i',
            'location' => 'required|string|max:255',
       ]);

        return DB::transaction(function () use ($validated, $user) {
            $quote = Quote::where('id', $validated['quote_id'])
                ->where('user_id', $user->id)
                ->firstOrFail();
            
            if ($quote->status !== Quote::STATUS_ACCEPTED) {
                return response()->json([
                    'message' => 'Only accepted quotes can be booked'
                ], 400);
            }

            if (Booking::where('quote_id', $quote->id)->exists()) {
                return response()->json([
                    'message' => 'This quote has already been booked.'
                ], 400);
            }

            $booking = Booking::create([
                'user_id' => $user->id,
                'quote_id' => $quote->id,
                'service_id' => $quote->service_id,
                'booking_date' => $validated['booking_date'],
                'booking_time' => $validated['booking_date'] . ' ' . $validated['booking_time'] . ':00' ,
                'location' => $validated['location'],
                'total_amount' => $quote->estimated_price,
            ]);

            return response()->json([
                'message' => 'Booking created successfully.',
                'booking' => $booking->load('service')
            ], 201);
        });
    }

    public function cancel($id, Request $request)
    {
        $user = $request->user();

        $booking = Booking::where('id', $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        if ($booking->status === 'cancelled') {
            return response()->json([
                'message' => 'Booking is already cancelled.'
            ], 400);
        }

        if ($booking->status === 'completed') {
            return response()->json([
                'message' => 'Completed bookings cannot be cancelled.'
            ]);
        }

        $booking->update([
            'status' => 'cancelled',
            'cancelled_at' => now(),
        ]);

        return response()->json([
            'message' => 'Booking cancelled successfully.',
            'booking'=> $booking
        ]);
    }
}

