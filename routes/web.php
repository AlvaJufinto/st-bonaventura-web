<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\Auth\ImpersonateController;
use App\Http\Controllers\BidangController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InformationController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SacramentController;
use App\Http\Controllers\TerritorialController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WilayahController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// PUBLIC
Route::get('/', HomeController::class)->name('home.guest.index');

Route::prefix('tentang')->group(function () {
  Route::get('/dewan-paroki', [AboutController::class, 'council'])->name('council.guest.index');
  Route::get('/sejarah', [AboutController::class, 'history'])->name('history.guest.index');
  Route::get('/santo-pelindung', [AboutController::class, 'saint'])->name('saint.guest.index');
});

Route::prefix('informasi')->group(function () {
  Route::get('/warta-minggu', [InformationController::class, 'news'])->name('news.guest.index');
});

Route::prefix('sakramen')->group(function () {
  Route::get('/baptis', [SacramentController::class, 'baptism'])->name('baptism.guest.index');
  Route::get('/komuni-pertama', [SacramentController::class, 'communion'])->name('communion.guest.index');
  Route::get('/krisma', [SacramentController::class, 'confirmation'])->name('confirmation.guest.index');
  Route::get('/rekonsiliasi', [SacramentController::class, 'reconciliation'])->name('reconciliation.guest.index');
  Route::get('/perminyakan', [SacramentController::class, 'anointing'])->name('anointing.guest.index');
  Route::get('/perkawinan', [SacramentController::class, 'marriage'])->name('marriage.guest.index');
});

Route::prefix('wilayah')->group(function () {
  Route::get('/peta', [TerritorialController::class, 'map'])->name('map.guest.index');
  Route::get('/{territorial:slug}', [TerritorialController::class, 'showGuest'])->name('wilayah.guest.show');
});

Route::prefix('lingkungan')->group(function () {
  Route::get('/{territorial:slug}', [TerritorialController::class, 'showGuest'])->name('lingkungan.guest.show');
});

Route::get('/bidang-pelayanan/{bidang:slug}', [BidangController::class, 'showGuest'])->name('bidang.guest.show');


Route::post('/admin/impersonate/stop', [ImpersonateController::class, 'stop'])->name('impersonate.stop');

// ADMIN
Route::prefix('admin')->middleware('auth')->group(function () {
  Route::post('/impersonate/{user}', [ImpersonateController::class, 'loginAs'])
    ->name('impersonate.login');

  Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
  })->name('dashboard');


  // artikel / berita
  Route::resource('/article', ArticleController::class);

  // warta minggu
  Route::patch('/warta-minggu/{id}/approve', [NewsController::class, 'approve'])->name('warta-minggu.approve');
  Route::patch('/warta-minggu/{id}/revert', [NewsController::class, 'revert'])->name('warta-minggu.revert');
  Route::resource('/warta-minggu', NewsController::class);

  // teritorial
  Route::patch('/teritorial/{id}/approve', [TerritorialController::class, 'approve'])->name('teritorial.approve');
  Route::patch('/teritorial/{id}/revert', [TerritorialController::class, 'revert'])->name('teritorial.revert');
  Route::resource('/teritorial', TerritorialController::class)->except(['showGuest']);


  // User
  Route::get('/api/get-users', [UserController::class, 'getUsers'])->name('api.get-users');
  Route::resource('user', UserController::class);

  // Bidang
  Route::resource('/bidang', BidangController::class);


  // Profile
  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


});


require __DIR__ . '/auth.php';