<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('organization_user', function (Blueprint $table) {
            $table->foreignId('period_id')->nullable()->after('organization_id')->constrained('periods')->onDelete('set null');
        });

        // Add composite unique index that includes period_id
        // This allows the same user+org combination in different periods
        DB::statement('ALTER TABLE organization_user ADD UNIQUE INDEX user_id_organization_id_period_unique (user_id, organization_id, period_id)');
    }

    public function down(): void
    {
        Schema::table('organization_user', function (Blueprint $table) {
            $table->dropForeign(['period_id']);
            $table->dropColumn('period_id');
        });
        DB::statement('ALTER TABLE organization_user ADD UNIQUE INDEX user_id_organization_id_unique (user_id, organization_id)');
    }
};
