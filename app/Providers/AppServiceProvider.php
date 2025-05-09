<?php

namespace App\Providers;

use App\Models\Organization;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
  /**
   * Register any application services.
   */
  public function register(): void
  {
    //
  }

  /**
   * Bootstrap any application services.
   */
  public function boot(): void
  {
    $wilayahAll = collect(); // default empty collection

    if (Schema::hasTable('organizations')) {
      $wilayahAll = Organization::where('organization_type_id', 1)->get();
    }

    Inertia::share([
      'wilayahAll' => $wilayahAll
    ]);
  }
}
