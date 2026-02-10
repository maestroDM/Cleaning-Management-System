<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Quote;

class AdminQuoteController extends Controller
{
    public function index()
    {
        $quotes = Quote::with(['user', 'service'])
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json($quotes);
    }

    public function show(Quote $quote)
    {
        return response()->json(
            $quote->load(['user', 'service'])
        );
    }

    public function review(Request $request, Quote $quote)
    {
        if ($quote->isTerminal()) {
            return response()->json([
                'message' => 'This quote can longer be modified'
            ], 409);
        }
    
        $validated = $request->validate([
            'estimated_price' => ['required', 'numeric', 'min:0'],
            'status' => ['required', 'in:reviewed,rejected'],
        ]);

        if(! $quote->canTransitionTo($validated['status'])) {
            return response()->json([
                'message' => 'invalid status transition'
            ], 422);
        }

        $quote->update([
            'estimated_price' => $validated['estimated_price'],
            'status' => $validated['status'],
            'reviewed_by' => $request->user()->id,
            'reviewed_at' => now(),
        ]);

        return response()->json([
            'message' => 'Quote reviewed successfully',
            'data' => $quote,
        ]);
    }
}
