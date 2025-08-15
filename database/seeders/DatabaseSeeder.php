<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\ArticleType;
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
					'description' => 'for komsos',
				],
				[
					'name' => 'contributor',
					'role_level' => 3,
					'description' => 'for sektretariat, ketua organisasi e.g. wilayah, lingkungan',
				],
				[
					'name' => 'sekretariat',
					'role_level' => 3,
					'description' => 'for sektretariat',
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
			],
			[
				'name' => 'rejected',
			]
		]);


		\App\Models\User::insert([
			[
				'username' => 'admin',
				'name' => 'alva',
				'email' => 'alva@stbonaventura.org',
				'password' => bcrypt('AlvaJufinto2005'),
				'email_verified_at' => now(),
				'role_id' => 1,
				'status_id' => 3,
				'profile_picture' => '2025-06-17-15x26x38-VAJ.jpg',
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
			// 1
			[
				'name' => 'Wilayah',
				'description' => 'Head dari Lingkungan',
			],
			// 2
			[
				'name' => 'Lingkungan',
				'description' => 'Lingkungan',
			],
			// 3
			[
				'name' => 'Bidang',
				'description' => 'Head dari Seksi dan Komunitas',
			],
			// 4
			[
				'name' => 'Seksi',
				'description' => 'Seksi',
			],
			// 5
			[
				'name' => 'Bagian',
				'description' => 'Can be Head of Bagian ',
			],
			// 6
			[
				'name' => 'Komunitas',
				'description' => 'Can be Head of Bagian',
			],
			// 7
			[
				'name' => 'Tim',
				'description' => 'Can be Head of Bagian',
			],
			// 8
			[
				'name' => 'BagianAnak',
				'description' => 'Can be Head of Bagian ',
			],
			// 9
			[
				'name' => 'Paroki',
				'description' => 'Paroki Aja',
			],
		]);

		Organization::create([
			'name' => "Paroki",
			'organization_type_id' => 9,
			'description' => "Bydefault punya paroki",
			'status_id' => 3,
			'head_id' => 1,
		]);

		ArticleType::insert([
			[
				"name" => "berita",
			],
			[
				"name" => "kegiatan",
			],
			[
				"name" => "pengumuman",
			]
		]);

		$this->call([
			UserSeeder::class,
			WilayahSeeder::class,
			OrganizationSeeder::class,
			ArticleSeeder::class,
			CouncilSeeder::class
		]);
	}
}
