<?php

namespace App\Http\Controllers\Api;

use App\Models\ServiceCategory;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ServiceCategoryController extends Controller
{
    /**
     * Display a listing of service categories.
     * Used by AdminServices dropdown.
     */
    public function index()
    {
        return response()->json(
            ServiceCategory::select('id', 'name')
                ->orderBy('name')
                ->get(),
            200
        );
    }

    /**
     * Store a newly created service category.
     * (Optional – for category management later)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:service_categories,name',
        ]);

        $category = ServiceCategory::create($validated);

        return response()->json([
            'message' => 'Service category created successfully',
            'data' => $category
        ], 201);
    }

    /**
     * Display a specific service category.
     */
    public function show($id)
    {
        $category = ServiceCategory::findOrFail($id);

        return response()->json($category, 200);
    }

    /**
     * Update a service category.
     */
    public function update(Request $request, $id)
    {
        $category = ServiceCategory::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:service_categories,name,' . $category->id,
        ]);

        $category->update($validated);

        return response()->json([
            'message' => 'Service category updated successfully',
            'data' => $category
        ], 200);
    }

    /**
     * Remove a service category.
     */
    public function destroy($id)
    {
        $category = ServiceCategory::findOrFail($id);
        $category->delete();

        return response()->json([
            'message' => 'Service category deleted successfully'
        ], 200);
    }
}
