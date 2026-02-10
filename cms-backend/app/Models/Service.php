<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = ['category_id', 'name', 'description', 'price', 'duration'];

    public function category()
    {
        return $this->belongsTo(ServiceCategory::class, 'category_id');
    }

    public function bookings()
    {
        return $this->belongsToMany(Booking::class, 'booking_service')->withpivot('quantity', 'price');
    }

    public function quotes()
    {
        return $this->hasMany(Quotes::class);
    }
}
