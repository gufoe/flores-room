<?php
namespace App;
use \Illuminate\Database\Eloquent\Model;

class Room extends Model {
    use \Illuminate\Database\Eloquent\SoftDeletes;

    public $guarded = ['id'];
    public $hidden = [
        'bookings',
    ];
    public $appends = [
        'places',
    ];
    public $casts = [
        'perks' => 'array',
        'shape' => 'array',
        'b1_price' => 'float',
        'b2_price' => 'float',
        'is_dorm' => 'boolean',
        'is_female_only' => 'boolean',
        'is_active' => 'boolean',
        'availability' => 'integer',
        'av_b1' => 'integer',
        'av_b2' => 'integer',
    ];


    public function scopeSafeWrite($q, User $u = null) {
        if (!$u) $u = user();
        if (!$u || $u->is_admin) return;
        $q->whereHas('place', function($q) use ($u) {
            $q->safeWrite($u);
        });
    }

    public function scopeActive($q) {
        $q->where('is_active', true);
    }

    public function place() {
        return $this->belongsTo(Place::class)->withTrashed();
    }

    public function bookings() {
        return $this->belongsTo(BookingUnit::class)->active();
    }

    public function scopeIsDorm() {
        $q->where('type', 'like', '%-dorm');
    }

    public function scopeAddAvailability($q, $dates) {
        $q->addSelect(\DB::raw("{$this->generateAddAvailability($dates)} as availability"));
        $q->addSelect(\DB::raw("{$this->generateAddAvailability($dates, 1)} as av_b1"));
        $q->addSelect(\DB::raw("{$this->generateAddAvailability($dates, 2)} as av_b2"));
    }
    public function generateAddAvailability(array $dates, int $bed_size = null) {
        $subqueries = collect($dates)->map(function ($date) use ($bed_size) {
            return $this->generateAvailabilityOn($date, $bed_size);
        });
        if ($subqueries->count() == 1) {
            return $subqueries->first();
        } else {
            return "LEAST({$subqueries->join(', ')})";
        }
    }

    public function generateAvailabilityOn(string $date, int $bed_size = null) {
        $room_bed_q = '(COALESCE(rooms.b1_count, 0) + COALESCE(rooms.b2_count*2, 0))';
        $book_bed_q = '(COALESCE(BU.b1_count, 0) + COALESCE(BU.b2_count*2, 0))';
        if ($bed_size) { // counts beds - not people!
            if ($bed_size > 2) abort(400, 'wtf! '.$bed_size);
            $room_bed_q = "COALESCE(rooms.b{$bed_size}_count, 0)";
            $book_bed_q = "COALESCE(BU.b{$bed_size}_count, 0)";
        }
        return "(
            $room_bed_q -
            COALESCE((
                SELECT (
                    case when is_dorm then ( SUM($book_bed_q) )
                    else ( $room_bed_q ) end
                ) FROM booking_units BU
                JOIN bookings B ON BU.booking_id=B.id
                WHERE room_id = rooms.id
                    AND B.deleted_at IS NULL
                    AND B.check_in <= '$date'
                    AND B.check_out > '$date'
                GROUP BY room_id -- important!
            ), 0)
        )";
    }

    public function getPlacesAttribute() {
        return $this->b1_count + $this->b2_count*2;
    }
}
