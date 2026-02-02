<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        return Service::with('category')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:service_categories,id',
            'name' => 'required|string|max:255|unique:services,name',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
        ]);

        return Service::create($validated);
    }

    public function show(Service $service)
    {
        return $service->load('category');
    }

    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'category_id' => 'sometimes|required|exists:service_categories,id',
            'name' => 'sometimes|required|string|max:255|unique:services,name,' . $service->id,
            'description' => 'nullable|string',
            'price' => 'sometimes|required|numeric|min:0',
        ]);

        $service->update($validated);

        return $service ->load('category');
    }

    public function destroy(Service $service)
    {
        $service->delete();

        return response()->json(['message' => 'Service deleted successfully.']);
    }
}
