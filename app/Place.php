<?php
namespace App;
use \Illuminate\Database\Eloquent\Model;

class Place extends Model {
    use \Illuminate\Database\Eloquent\SoftDeletes;
    public $guarded = ['id'];
    public $hidden = [];
    public $casts = [
        'perks' => 'array',
        'pics' => 'array',
        'beds' => 'array',
        'loc_lat' => 'float',
        'loc_lon' => 'float',
        'is_active' => 'bool',
        'is_verified' => 'bool',
    ];

    public function scopeSafeWrite($q, User $u = null) {
        if (!$u) $u = user();
        if (!$u || $u->is_admin) return;
        $q->where('user_id', $u->id);
    }

    public function scopeReady($q) {
        $q->where('is_verified', true)->where('is_active', true);
    }

    public function user() {
        return $this->belongsTo(User::class)->withTrashed();
    }

    public function rooms() {
        return $this->hasMany(Room::class);
    }

    public function units() {
        return $this->hasManyThrough(Unit::class, Room::class);
    }

    public function bookings() {
        return $this->hasMany(Booking::class);
    }

    public function scopeIsAvailable($q, $n, $since, $to) {
        $available_places = Unit::selectRaw('sum(size)')
            ->whereColumn('place_id', '=', 'places.id');
        $q->addSelect(['available_places' => $available_places ])
            ->where('available_places', '>=', $n);
    }

    public function scopeAddDistanceFrom($q, float $lat, float $lon) {
        $q->addSelect(\DB::raw("(
            6371 * acos (
              cos ( radians($lat) )
              * cos( radians( loc_lat ) )
              * cos( radians( loc_lon ) - radians($lon) )
              + sin ( radians($lat) )
              * sin( radians( loc_lat ) )
            )
          ) as distance"));
    }

}
