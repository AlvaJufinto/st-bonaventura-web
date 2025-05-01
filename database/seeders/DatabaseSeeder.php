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

    \App\Models\Role::insert(
      [
        [
          'name' => 'admin',
          'role_level' => 1,
          'description' => 'Highest authority',
        ],
        [
          'name' => 'moderator',
          'role_level' => 2,
          'description' => 'for komsos',
        ],
        [
          'name' => 'contributor',
          'role_level' => 3,
          'description' => 'for sektretariat, ketua organisasi e.g. wilayah, lingkungan',
        ]
      ]
    );

    \App\Models\Status::insert([
      [
        'name' => 'archived',
      ],
      [
        'name' => 'on-review',
      ],
      [
        'name' => 'published',
      ]
    ]);


    \App\Models\User::insert([
      [
        'username' => 'admin',
        'name' => 'Alva',
        'email' => 'admin@gmail.com',
        'password' => bcrypt('AlvaJufinto2005'),
        'email_verified_at' => now(),
        'role_id' => 1,
      ],
      [
        'username' => 'komsos',
        'name' => 'Komsos Bona',
        'email' => 'komsosbona@gmail.com',
        'password' => bcrypt('Password123'),
        'email_verified_at' => now(),
        'role_id' => 1,
      ]
    ]);

    \App\Models\OrganizationType::insert([
      [
        'name' => 'Wilayah',
        'description' => 'Head dari Lingkungan',
      ],
      [
        'name' => 'Lingkungan',
        'description' => 'Lingkungan',
      ],
      [
        'name' => 'Bidang',
        'description' => 'Head dari Seksi',
      ],
      [
        'name' => 'Seksi',
        'description' => 'Seksi',
      ],
      [
        'name' => 'Bagian',
        'description' => 'Can be Head of Bagian',
      ],
    ]);

    $this->call([
      WilayahSeeder::class,
      OrganizationSeeder::class
    ]);
  }
}