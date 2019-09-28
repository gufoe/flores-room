<?php
namespace App;
use \Illuminate\Database\Eloquent\Model;

class Session extends Model {
    public $guarded = ['id'];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function scopeActive($q) {
        $q->where(function($q) {
            $q->whereNull('expires_at')->orWhere('expires_at', '>', to_datetime('now'));
        })->whereHas('user');
    }

    public function extendExpiry() {
        $this->update([ 'expires_at' => to_datetime('now + 2 week') ]);
    }
}
