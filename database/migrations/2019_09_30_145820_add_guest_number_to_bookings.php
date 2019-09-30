<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddGuestNumberToBookings extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->tinyInteger('guest_number')->nullable();
        });
        foreach (\App\Booking::withTrashed()->cursor() as $b) {
            $b->update([
                'guest_number' => $b->units()->sum(\DB::raw('b1_count + b2_count*2')),
            ]);
        }
        \DB::statement('ALTER TABLE `bookings` CHANGE `guest_number` `guest_number` tinyint(4) NOT NULL');
        // Schema::table('bookings', function (Blueprint $table) {
        //     $table->tinyInteger('guest_number')->notNull()->change();
        // });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('bookings', function (Blueprint $table) {
            //
        });
    }
}
