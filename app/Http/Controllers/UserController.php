<?php

namespace App\Http\Controllers;

use App\Models\User;
use GuzzleHttp\Psr7\Query;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function getUsers(Request $request)
  {
    $query = User::query();

    // --- Perbaikan: Filter status_id = 3 selalu diterapkan ---
    $query->where('status_id', 3);
    $query->whereDoesntHave('organization');
    // --- Akhir Perbaikan ---

    // Filter berdasarkan search term jika ada
    if ($search = $request->input('search')) {
      $query->where(function ($q) use ($search) {
        $q->where('name', 'like', '%' . $search . '%')
          ->orWhere('username', 'like', '%' . $search . '%')
          ->orWhere('email', 'like', '%' . $search . '%');
      });
    }

    $users = $query->limit(10)->get(); // Contoh: ambil 10 hasil pertama

    // Kembalikan dalam format JSON
    return response()->json([
      'data' => $users,
    ]);
  }

  public function index()
  {
    $users = User::with(['role', 'organization', 'status'])->paginate(30);

    return Inertia::render('User/Index', compact('users'));
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(string $id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    //
  }
}
