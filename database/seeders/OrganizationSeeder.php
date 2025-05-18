<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Organization;
use App\Models\OrganizationType;

class OrganizationSeeder extends Seeder
{
  public function run(): void
  {
    $data = [
      'Peribadatan' => ['Seksi Liturgi'],
      'Pewartaan' => ['Seksi Katekese', 'Seksi Kerasulan Kitab Suci', 'Seksi Komunikasi Sosial'],
      'Persekutuan & Pendampingan Territorial dan Kategorial' => [
        'Seksi Kerasulan Keluarga',
        'Seksi Kepemudaan',
        'Seksi Panggilan',
        'Komunitas Kategorial Legio Mariae',
        'Komunitas Kategorial Gerakan Imam Maria',
        'Komunitas Kategorial Persekutuan Doa Pembaharuan Karismatik Katolik',
        'Komunitas Kategorial Kerabat Kerja Ibu Teresa / KKIT',
        'Komunitas Kategorial Meditasi Kitab Suci',
        'Komunitas Kategorial PWK St. Monika',
        'Komunitas Kategorial Paguyuban Simeon Hanna',
        'Komunitas Kategorial Wanita Katolik Republik Indonesia',
      ],
      'Pelayanan & Tim Khusus' => [
        'Seksi Pengembangan Sosial Ekonomi',
        'Seksi Pendidikan',
        'Seksi Kesehatan',
        'Tim Khusus ASAK',
        'Tim Khusus Usaha Sejahtera Bonaventura (CU)',
        'Tim Khusus APP'
      ],
      'Kesaksian' => ['Seksi Keadilan Perdamaian', 'Seksi Hubungan Antar Agama dan Kemasyarakatan', 'Seksi Lingkungan Hidup'],
      'Pelatihan & Pengembangan Paroki' => ['Seksi Penelitian dan Pengembangan', 'Seksi Pelatihan dan Kaderisasi'],
      'Perencanaan & Evaluasi' => ['Seksi Perencanaan dan Evaluasi'],
      'Bagian' => ['Bagian Pemeliharaan Komplek Gereja', 'Bagian Rumah Tangga Pastoran', 'Bagian Keamanan'],
    ];

    // Mapping untuk menentukan tipe organisasi berdasarkan kata depan
    $typeMapping = [
      'Seksi' => 'Seksi',
      'Komunitas' => 'Komunitas',
      'Tim' => 'Tim', // Update: Tim sekarang memiliki tipe sendiri
      'Bagian' => 'Bagian'
    ];

    foreach ($data as $parentName => $children) {
      $typeName = $parentName === 'Bagian' ? 'Bagian' : 'Bidang';
      $parent = Organization::create([
        'name' => $parentName,
        'organization_type_id' => OrganizationType::where('name', $typeName)->first()->id,
        'description' => $parentName,
        'status_id' => 3,  // published
      ]);

      foreach ($children as $childName) {
        // Mengambil kata pertama dari nama untuk menentukan tipe
        $firstWord = strtok($childName, ' ');

        // Menentukan tipe berdasarkan kata pertama
        $childType =  $typeMapping[$firstWord] ?? 'Seksi';

        // Khusus untuk Bagian, selalu set sebagai Bagian
        if ($parentName === 'Bagian') {
          $childType = 'Bagian';
        }

        Organization::create([
          'name' => $childName,
          'organization_type_id' => OrganizationType::where('name', $childType)->first()->id,
          'parent_id' => $parent->id,
          'description' => $childName,
          'status_id' => 3,  // published
        ]);
      }
    }
  }
}
