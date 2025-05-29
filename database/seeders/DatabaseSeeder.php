<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Organization;
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
          'description' => 'for komsos and',
        ],
        [
          'name' => 'contributor',
          'role_level' => 3,
          'description' => 'for sektretariat, ketua organisasi e.g. wilayah, lingkungan',
        ],
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
        'name' => 'fufufafa',
        'email' => 'alva@stbonaventura.org',
        'password' => bcrypt('AlvaJufinto2005'),
        'email_verified_at' => now(),
        'role_id' => 1,
        'status_id' => 3,
        'profile_picture' => '2025-05-02-11x51x34-KUI.png',
      ],
      [
        'username' => 'komsos',
        'name' => 'Komsos Bona',
        'email' => 'komsos@stbonaventura.org',
        'password' => bcrypt('Password123'),
        'email_verified_at' => now(),
        'role_id' => 2,
        'status_id' => 3,
        'profile_picture' => null,
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
        'description' => 'Head dari Seksi dan Komunitas',
      ],
      [
        'name' => 'Seksi',
        'description' => 'Seksi',
      ],
      [
        'name' => 'Bagian',
        'description' => 'Can be Head of Bagian ',
      ],
      [
        'name' => 'Komunitas',
        'description' => 'Can be Head of Bagian',
      ],
      [
        'name' => 'Tim',
        'description' => 'Can be Head of Bagian',
      ],
      [
        'name' => 'Paroki',
        'description' => 'Paroki Aja',
      ],
    ]);

    Organization::create([
      'name' => "Paroki",
      'organization_type_id' => 8,
      'description' => "Bydefault punya paroki",
      'status_id' => 3,
      'head_id' => 1,
    ]);

    $this->call([
      UserSeeder::class,
      WilayahSeeder::class,
      OrganizationSeeder::class,
    ]);
  }
}
