<?php
namespace App;
use \Illuminate\Database\Eloquent\Model;

class BookingUnit extends Model {
    public $guarded = ['id'];
    public $hidden = [];

    public function scopeActive($q) {
        $q->whereHas('booking');
    }

    public function booking() {
        return $this->belongsTo(Booking::class)->withTrashed();
    }

    public function room() {
        return $this->belongsTo(Room::class)->withTrashed();
    }
}
