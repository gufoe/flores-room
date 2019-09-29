<?php
namespace App;
use \Illuminate\Database\Eloquent\Model;

class Booking extends Model {
    use \Illuminate\Database\Eloquent\SoftDeletes;
    public $guarded = ['id'];
    public $hidden = [];
    public $appends = [
        'nights'
    ];
    public $casts = [
        'price' => 'float',
    ];

    public function place() {
        return $this->belongsTo(Place::class)->withTrashed();
    }

    public function user() {
        return $this->belongsTo(User::class)->withTrashed();
    }

    public function units() {
        return $this->hasMany(BookingUnit::class);
    }

    public function getNightsAttribute() {
        return (strtotime($this->check_out) - strtotime($this->check_in)) / 86400;
    }

    public function calcTotal() {
        return $this->units()->sum('price') * $this->nights;
    }
}
