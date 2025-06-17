<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\Auth\ImpersonateController;
use App\Http\Controllers\BidangController;
use App\Http\Controllers\CouncilController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InformationController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SacramentController;
use App\Http\Controllers\TerritorialController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WilayahController;
use App\Models\Article;
use Carbon\Carbon;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Cache;
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

  Route::get('/berita-kegiatan', [ArticleController::class, 'indexGuest'])->name('article.guest.index');
  Route::get('/berita-kegiatan/{article:slug}', [ArticleController::class, 'show'])->name('article.guest.show');
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

Route::get('/bidang-pelayanan/{bidang:slug}/{bidangDetailSlug}', [BidangController::class, 'showDetailGuest'])->name('bidang.guest.detail');

Route::get('/bidang-pelayanan/{bidang:slug}', [BidangController::class, 'showGuest'])->name('bidang.guest.show');

Route::post('/admin/impersonate/stop', [ImpersonateController::class, 'stop'])->name('impersonate.stop');


// ADMIN
Route::prefix('admin')->middleware('auth')->group(function () {
  Route::post('/impersonate/{user}', [ImpersonateController::class, 'loginAs'])
    ->name('impersonate.login')
    ->middleware('check.permission:canImpersonate');

  Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
  })->name('dashboard');

  Route::resource('/article', ArticleController::class);

  // warta minggu
  Route::middleware('check.permission:allowToSeeWartaMinggu')->group(function () {
    Route::patch('/warta-minggu/{id}/approve', [NewsController::class, 'approve'])->name('warta-minggu.approve')->middleware('check.permission:allowToPublish');
    Route::patch('/warta-minggu/{id}/revert', [NewsController::class, 'revert'])->name('warta-minggu.revert')->middleware('check.permission:allowToPublish');
    Route::resource('/warta-minggu', NewsController::class);
  });

  // teritorial
  Route::middleware('check.permission:allowToSeeAllTerritorial')->group(function () {
    Route::patch('/teritorial/{id}/approve', [TerritorialController::class, 'approve'])->name('teritorial.approve')->middleware('check.permission:allowToPublish');
    Route::patch('/teritorial/{id}/revert', [TerritorialController::class, 'revert'])->name('teritorial.revert')->middleware('check.permission:allowToPublish');
    Route::resource('/teritorial', TerritorialController::class)->except(['showGuest']);
  });


  // User
  Route::middleware('check.permission:allowToSeeAllPengurus')->group(function () {
    Route::get('/api/get-users', [UserController::class, 'getUsers'])->name('api.get-users');
    Route::resource('user', UserController::class);
    Route::post('/user/{id}/upload-profile-picture', [UserController::class, 'uploadProfilePicture'])
      ->name('user.upload-profile-picture');
    Route::post('/user/{id}/remove-profile-picture', [UserController::class, 'removeProfilePicture'])
      ->name('user.remove-profile-picture');
  });


  // Bidang
  Route::middleware('check.permission:allowToSeeAllBidang')->group(function () {
    Route::patch('/bidang/{id}/approve', [BidangController::class, 'approve'])->name('bidang.approve')->middleware('check.permission:allowToPublish');
    Route::patch('/bidang/{id}/revert', [BidangController::class, 'revert'])->name('bidang.revert')->middleware('check.permission:allowToPublish');
    Route::resource('/bidang', BidangController::class);
  });


  // Profile
  // Routes
  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::post('/profile', [ProfileController::class, 'updateWithFile'])->name('profile.update.file');

  // DPH
  Route::post('/dph/reorder', [CouncilController::class, 'reorder'])->name('dph.reorder');
  Route::resource('/dph', CouncilController::class)
    ->middleware('check.permission:allowToSeeDPH');
});


require __DIR__ . '/auth.php';
