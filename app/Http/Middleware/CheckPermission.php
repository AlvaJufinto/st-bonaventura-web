<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Services\Permissions;

class CheckPermission
{
  public function handle(Request $request, Closure $next, string $permissionKey)
  {


    $user = auth()->user();

    if (!$user) {
      return redirect()->route('login');
    }

    $permissions = Permissions::permissions($user);

    if (!($permissions[$permissionKey] ?? false)) {
      abort(403, 'Unauthorized');
    }

    return $next($request);
  }
}
