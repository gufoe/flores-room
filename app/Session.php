<?php
namespace App;
use \Illuminate\Database\Eloquent\Model;

class Session extends Model {
    public $guarded = ['id'];

    public function user() {
        return $this->belongsTo(User::class)->withTrashed();
    }
}
