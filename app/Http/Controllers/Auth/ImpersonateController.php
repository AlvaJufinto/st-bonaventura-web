<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class ImpersonateController extends Controller
{
  public function loginAs(User $user)
  {
    // Simpan ID admin asli
    Session::put('impersonate_original_id', Auth::id());

    // Login sebagai user target
    Auth::login($user);

    return redirect()->route('dashboard');
  }

  public function stop()
  {
    $originalId = Session::pull('impersonate_original_id');

    if ($originalId) {
      Auth::loginUsingId($originalId);
    }

    return redirect()->route('user.index');
  }
}
