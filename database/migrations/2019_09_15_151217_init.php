<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Init extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->down();

        Schema::create('files', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('user_id')->unsigned()->nullable();
            $table->string('name', 100);
            $table->boolean('is_image');
            $table->string('token', 100)->unique();
            $table->timestamps();
        });

        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name', 1000);
            $table->string('pic', 100)->nullable();
            $table->string('auth_driver', 20)->index(); // (email|facebook|google)
            $table->string('auth_id', 200)->unique(); // email or social ID
            $table->string('auth_token', 500)->index(); // password or social token
            $table->string('wa_number')->nullable();
            $table->string('referral_code')->unique();
            $table->bigInteger('referrer_id')->unsigned()->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('referrer_id')->references('id')->on('users')->onDelete('set null');
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('user_id')->unsigned();
            $table->string('token', 200)->unique();
            $table->datetime('expires_at')->index()->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::create('places', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('user_id')->unsigned();
            $table->string('name')->index();
            $table->string('slug')->unique();
            $table->string('type')->index();
            $table->string('perks')->index();
            $table->string('pics', 1000)->default('[]');
            $table->string('loc_city')->index();
            $table->string('loc_addr')->index();
            $table->string('loc_lat')->index();
            $table->string('loc_lon')->index();
            $table->boolean('is_verified')->index();
            $table->boolean('is_active')->index();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::create('rooms', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('place_id')->unsigned();
            $table->string('name');
            $table->boolean('is_dorm')->default(false)->index();
            $table->decimal('price', 10, 2)->unsigned()->nullable()->index();
            $table->string('shape')->default('[]'); // derives b1 and b2 count
            $table->tinyInteger('b1_count')->unsigned()->index();
            $table->tinyInteger('b2_count')->unsigned()->index();
            $table->decimal('b1_price', 10, 2)->unsigned()->nullable()->index();
            $table->decimal('b2_price', 10, 2)->unsigned()->nullable()->index();
            $table->string('perks')->index();
            $table->boolean('is_female_only')->default(false);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('place_id')->references('id')->on('places')->onDelete('cascade');
        });

        Schema::create('bookings', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('user_id')->unsigned()->nullable();
            $table->bigInteger('place_id')->unsigned();
            $table->decimal('price', 10, 2)->index();
            $table->string('code')->index();
            $table->date('check_in')->index();
            $table->date('check_out')->index();
            $table->boolean('from_extern_source')->default(false);
            $table->boolean('did_client_cancel')->default(false);
            $table->boolean('did_host_cancel')->default(false);
            $table->boolean('is_paid')->default(false)->index();
            $table->boolean('is_refunded')->default(false)->index();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('place_id')->references('id')->on('places')->onDelete('cascade');
        });

        Schema::create('booking_units', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('booking_id')->unsigned();
            $table->bigInteger('room_id')->unsigned()->nullable();
            $table->tinyInteger('b1_count')->unsigned()->nullable()->index();
            $table->tinyInteger('b2_count')->unsigned()->nullable()->index();
            $table->decimal('b1_price', 10, 2)->unsigned()->nullable()->index();
            $table->decimal('b2_price', 10, 2)->unsigned()->nullable()->index();
            $table->timestamps();

            $table->foreign('booking_id')->references('id')->on('bookings')->onDelete('cascade');
            $table->foreign('room_id')->references('id')->on('rooms')->onDelete('cascade');
        });

        Schema::create('feedback', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('booking_id')->unsigned();
            $table->string('comment', 1000);
            $table->string('reply', 1000)->nullable();
            $table->tinyInteger('score_avg')->unsigned()->index();
            $table->tinyInteger('score_host')->unsigned()->index();
            $table->tinyInteger('score_location')->unsigned()->index();
            $table->tinyInteger('score_service')->unsigned()->index();
            $table->tinyInteger('score_cleanliness')->unsigned()->index();
            $table->timestamps();

            $table->foreign('booking_id')->references('id')->on('bookings')->onDelete('cascade');
        });

        Schema::create('chat', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('booking_id')->unsigned();
            $table->bigInteger('user_id')->unsigned();
            $table->string('message', 300);
            $table->timestamps();

            $table->foreign('booking_id')->references('id')->on('bookings')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        drop_table('chat');
        drop_table('feedback');
        drop_table('booking_units');
        drop_table('bookings');
        drop_table('beds');
        drop_table('rooms');
        drop_table('places');
        drop_table('sessions');
        drop_table('users');
        drop_table('files');
    }
}
