<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class StaffController extends Controller{
    Public function store(Request $request){
        Gate::authorize('createStaff', User::class);

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',

        ]);

        $staff = User::create([
            ...$data,
            'password' => bcrypt($data['password']),
            'role_id' => 2,
            'availability'=> 'active',

        ]);

            return response()->json([
                'message' => 'Staff registered successfully',
                'staff' => $staff,
            ], 201);
    }
    
    public function deactivate(User $user){
        Gate::authorize('deactivate, $user');

        $user->update(['status' => 'inactive']);

        return response()->json([
            'message' => 'Staff deactivated'
        ]);
    }

    public function destroy(User $user){
        Gate::authorize('delete', $user);

        $user->delete();

        return response()->json([
            'message'=> 'Staff deleted successfully'
        ]);
    }
}