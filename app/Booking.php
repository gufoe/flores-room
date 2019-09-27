<?php
namespace App;
use \Illuminate\Database\Eloquent\Model;

class Booking extends Model {
    use \Illuminate\Database\Eloquent\SoftDeletes;
    public $guarded = ['id'];
    public $hidden = [];

    public function place() {
        return $this->belongsTo(Place::class)->withTrashed();
    }

    public function user() {
        return $this->belongsTo(User::class)->withTrashed();
    }

    public function units() {
        return $this->hasMany(BookingUnit::class);
    }
}
