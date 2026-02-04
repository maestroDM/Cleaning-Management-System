<?php

namespace app\Http\Controllers\Api;

use app\Models\Booking;
use Illuminate\Http\Request;

class BookingController
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'service_id' => 'required|exists:services,id',
            'booking_date' => 'required|date'
        ]);

        $booking = Booking::create([
            'user_id' => $request->user()->id,
            'service_id' => $validated['service_id'],
            'booking_date' => $validated['booking_date'],
            'status' => 'pending'
        ]);

        return response()->json([
            'message' => 'Booking created successfully.',
            'booking' => $booking
        ], 201);
    }
}

