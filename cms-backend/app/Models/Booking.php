<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    public const STATUS_ASSIGNED = 'assigned';
    public const STATUS_CANCELLED = 'cancelled';
    public const STATUS_COMPLETED = 'completed';

    protected $fillable = [
            'user_id',
            'quote_id', 
            'service_id', 
            'booking_date',
            'booking_time', 
            'location',
            'total_amount',
            'status',
            'cancelled_at'
    ];

    protected $casts = [
        'booking_date' => 'date',
        'booking_time' => 'datetime:H:i',
    ];

    public function user(){
        return $this->belongsTo(User::class);
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

    public function quote()
    {
        return $this->belongsTo(Quote::class);
    }
    
}
