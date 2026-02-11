<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quote extends Model
{
    public const STATUS_PENDING = 'pending';
    public const STATUS_REVIEWED = 'reviewed';
    public const STATUS_ACCEPTED = 'accepted';
    public const STATUS_REJECTED = 'rejected';

    public static function allowedTransitions(): array
    {
        return [
            self::STATUS_PENDING => [
                self::STATUS_REVIEWED,
                self::STATUS_REJECTED,
            ],
            self::STATUS_REVIEWED => [
                self::STATUS_ACCEPTED,
                self::STATUS_REJECTED,
            ],
        ];
    }

    public function canTransitionTo(string $newStatus): bool
    {
        return in_array(
            $newStatus,
            self::allowedTransitions()[$this->status] ?? [],
            true
        );
    }

    public function isTerminal(): bool
    {
        return in_array($this->status, [
            self::STATUS_ACCEPTED,
            self::STATUS_REJECTED,
        ], true);
    }


    protected $fillable = [
        'user_id',
        'service_id',
        'additional_info',
        'status',
        'estimated_price',
        'reviewed_by',
        'reviewed_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function reviewer()
    {
        return $this->belongsTo(User::class);
    }

    
}
