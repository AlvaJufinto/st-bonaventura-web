<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   */
  public function run(): void
  {
    // \App\Models\User::factory(10)->create();

    \App\Models\Role::create([
      'name' => 'admin',
      'role_level' => 1,
      'description' => 'Administrator',
    ]);

    \App\Models\Status::create([
      'name' => 'archived',
    ]);

    \App\Models\Status::create([
      'name' => 'on-review',
    ]);

    \App\Models\Status::create([
      'name' => 'published',
    ]);


    \App\Models\User::create([
      'username' => 'admin',
      'name' => 'God',
      'email' => 'admin@gmail.com',
      'password' => bcrypt('AlvaJufinto2005'),
      'email_verified_at' => now(),
      'role_id' => 1,
    ]);

    \App\Models\User::create([
      'username' => 'komsos',
      'name' => 'komsos_bona',
      'email' => 'komsosbona@gmail.com',
      'password' => bcrypt('Password123'),
      'email_verified_at' => now(),
      'role_id' => 1,
    ]);
  }
}
