<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = ['user_id', 'service_id', 'booking_date', 'status'];

    public function user(){
        return $this->belongsToMany(User::class, 'booking_service')->withpivot('quantity', 'price');
    }

    public function payments(){
        return $this->hasOne(Payment::class);
    }

    public function staff(){
        return $this->belongsToMany(Staff::class, 'staff_assignments');
    }

    public function service(){
        return $this->belongsTo(Service::class);
    }
    
}
