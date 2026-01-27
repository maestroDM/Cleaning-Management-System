<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| 
| Here is where you can register API routes for your application.
| These routes are loaded by the RouteServiceProvider and assigned
| to the "api" middleware group. All routes will be prefixed with /api.
|
*/

/*
|--------------------------------------------------------------------------
| Public Test / Health Check Route
|--------------------------------------------------------------------------
| Used to verify frontend-backend connectivity.
| No authentication required.
*/
Route::get('/health', function () {
    return response()->json([
        'success' => true,
        'status' => 'ok',
        'message' => 'Backend API is reachable'
    ], 200);
});

/*
|--------------------------------------------------------------------------
| Authentication Routes (Placeholder)
|--------------------------------------------------------------------------
| These will be implemented in later sprints.
*/
Route::post('/auth/login', function () {
    return response()->json([
        'success' => true,
        'message' => 'Login endpoint placeholder'
    ]);
});

Route::post('/auth/register', function () {
    return response()->json([
        'success' => true,
        'message' => 'Register endpoint placeholder'
    ]);
});

/*
|--------------------------------------------------------------------------
| Protected Routes Example
|--------------------------------------------------------------------------
| These routes require authentication (to be enforced later).
*/
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Request $request) {
        return response()->json([
            'success' => true,
            'data' => $request->user()
        ]);
    });

});
