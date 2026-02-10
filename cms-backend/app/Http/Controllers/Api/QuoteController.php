<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Quote;
use App\Models\Service;

class QuoteController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
        'service_id' => ['required', 'exists:services,id'],
        'additional_info' => ['nullable', 'string', 'max:2000'],
    ]);

    $quote = Quote::create([
        'user_id' => $request->user()->id,
        'service_id' => $validated['service_id'],
        'additional_info' => $validated['additional_info'] ?? null,
        'status' => 'pending',
    ]);

    $exists = Quote::where('user_id', $request->user()->id)
        ->where('service_id', $validated['service_id'])
        ->where('status', 'pending')
        ->exists();

    if ($exists) {
        return response()->json([
            'message' => 'You already have a pending quote for this service'
        ], 409);
    }



    return response()->json([
        'message' => 'Quote request submitted successfully',
        'data' => $quote,
    ], 201);
    }

    public function decide(Request $request, Quote $quote)
    {
        if ($request->user()->id !== $quote->user_id) {
            return response()->json([
                'message' => 'Forbidden'
            ], 403);
        }

        if ($quote->isTerminal()) {
            return response()->json([
                'message' => 'This quote can no longer be changed'
            ], 405);
        }

        $validated = $request->validate([
            'status' => ['required', 'in:accepted,rejected'],
        ]);

        if (! $quote->canTransitionTo($validated['status'])) {
            return response()->json([
                'message' => 'Invalid status transition'
            ], 422);
        }

        $quote->update([
            'status' => $validated['status'],
        ]);

        return response()->json([
            'message' => 'Quote status updated successfully',
            'data' => $quote,
        ]);
    }
}
