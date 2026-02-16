<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ConstructionController extends Controller
{
	public function pembangunanGereja()
	{
		return Inertia::render('Construction/PembangunanGereja');
	}
}
