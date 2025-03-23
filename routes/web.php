<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InformationController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ProfileController;
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
});

Route::prefix('informasi')->group(function () {
  Route::get('/warta-minggu', [InformationController::class, 'news'])->name('news.guest.index');
});


// ADMIN
Route::middleware('auth')->group(function () {
  Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
  })->name('dashboard');

  Route::resource('/articles', ArticleController::class);

  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
