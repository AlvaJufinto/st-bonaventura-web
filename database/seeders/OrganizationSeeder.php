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
      'Pewartaan' => ['Seksi Katekese', 'Seksi KKS', 'Seksi KOMSOS'],
      'Persekutuan & Pendampingan Territorial dan Kategorial' => [
        'Seksi Kerasulan Keluarga',
        'Seksi Kepemudaan',
        'Seksi Panggilan',
        'Legio Mariae',
        'PDKK',
        'KKIT',
        'Meditasi Kitab Suci ME',
        'PWK St. Monika',
        'Simeon Hanna',
        'Adorasi SMK dan Kerahiman Ilahi',
        'WKRI'
      ],
      'Pelayanan & Tim Khusus' => [
        'Seksi Pengembangan Sosial Ekonomi',
        'Seksi Pendidikan',
        'Seksi Kesehatan',
        'Tim Khusus ASAK',
        'Tim Khusus CU',
        'Tim Khusus APP'
      ],
      'Kesaksian' => ['Seksi Keadilan Perdamaian', 'Seksi HAAK', 'Seksi Lingkungan Hidup'],
      'Pelatihan & Pengembangan Paroki' => ['Seksi Keadilan Perdamaian', 'Seksi HAAK', 'Seksi Lingkungan Hidup'],
      'Perencanaan & Evaluasi' => ['Seksi Perencanaan dan Evaluasi'],
      'Bagian' => ['Bagian PKG', 'Bagian RT Pastoran', 'Keamanan'],
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
        $childType = (str_contains($childName, 'Bagian') || $parentName === 'Bagian') ? 'Bagian' : 'Seksi';
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