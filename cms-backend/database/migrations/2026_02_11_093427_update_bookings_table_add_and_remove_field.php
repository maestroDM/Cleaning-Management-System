<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {

            $table->foreignId('quote_id')
                ->constrained()
                ->onDelete('cascade')->after('user_id');

            $table->foreignId('service_id')
                ->constrained()
                ->onDelete('cascade');

            $table->date('booking_date');
            
            $table->string('location');

            $table->dropColumn('status');

            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->string('status', ['pending', 'confirmed', 'completed', 'canceled'])->default('pending');
            $table->dropColumn(['location', 'booking_date']);
            $table->dropForeign(['service_id']);
            $table->dropColumn('service_id');
            $table->dropForeign(['quote_id']);
            $table->dropColumn('quote_id');
        });
    }
};
