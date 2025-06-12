<?php

namespace App\Services;

use App\Models\Organization;
use Illuminate\Support\Facades\Schema;

class SharedData
{
  public static function wilayah()
  {
    if (!Schema::hasTable('organizations')) {
      return collect();
    }

    return Organization::where('organization_type_id', 1)->where('status_id', 3)->get();
  }

  public static function bidang()
  {
    if (!Schema::hasTable('organizations')) {
      return collect();
    }

    return Organization::where('organization_type_id', 3)->where('status_id', 3)->get();
  }
}