<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SacramentController extends Controller
{
  public function baptism()
  {
    return Inertia::render('Sacrament/Baptism');
  }

  public function communion()
  {
    return Inertia::render('Sacrament/Communion');
  }

  public function confirmation()
  {
    return Inertia::render('Sacrament/Confirmation');
  }

  public function reconciliation()
  {
    return Inertia::render('Sacrament/Reconciliation');
  }

  public function anointing()
  {
    return Inertia::render('Sacrament/Anointing');
  }

  public function marriage()
  {
    return Inertia::render('Sacrament/Marriage');
  }
}
