<?php

namespace App\Providers;

use App\Services\Permissions;
use App\Services\SharedData;
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
    Inertia::share([
      'wilayahAll' => SharedData::wilayah(),
      'bidangAll' => SharedData::bidang(),
      'auth' => function () {
        return [
          'user' => auth()->user(),
        ];
      },
      'permissions' => function () {
        return Permissions::permissions(auth()->user());
      },
      'impersonating' => fn() => session()->has('impersonate_original_id'),
    ]);
  }
}
