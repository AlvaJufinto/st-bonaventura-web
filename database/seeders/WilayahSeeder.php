<?php

namespace Database\Seeders;

use App\Models\Organization;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class WilayahSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $wilayahLingkunganData = [
      [
        'wilayah' => [
          'name' => 'Wilayah I',
          'alternate_name' => 'Wilayah Santa Maria Ratu Rosari',
          'address' => 'Ria Rio Pacuan Kuda',
        ],
        'lingkungan' => [
          ['Lingkungan Santa Anna', 'Lingkungan Pulo Mas Utara I', 'Pulo Mas Utara I'],
          ['Lingkungan Santo Yoakim', 'Lingkungan Pulo Mas Utara II & III', 'Pulo Mas Utara II & III'],
          ['Lingkungan Santo Antonius Padua', 'Lingkungan Pulo Mas Timur I', 'Pulo Mas Timur I'],
          ['Lingkungan Santo Carolus Borromeus', 'Lingkungan Pacuan Kuda', 'Pacuan Kuda'],
        ]
      ],
      [
        'wilayah' => [
          'name' => 'Wilayah II',
          'alternate_name' => 'Wilayah Santo Maximilian Kolbe',
          'address' => 'Pulo Mas Selatan',
        ],
        'lingkungan' => [
          ['Lingkungan Santo Mikael', 'Lingkungan Pulo Mas Barat VI', 'Pulo Mas Barat VI'],
          ['Lingkungan Santa Angela', 'Lingkungan Pulo Mas V - Kalbis', 'Pulo Mas V - Kalbis'],
          ['Lingkungan Santo Andreas', 'Lingkungan Pasadenia - Pulomas VIII', 'Pasadenia - Pulomas VIII'],
          ['Lingkungan Santa Agnes', 'Lingkungan Pulo Mas Timur', 'Pulo Mas Timur'],
          ['Lingkungan Santa Sesilia', 'Lingkungan Pulo Mas Barat - Batu Merah Delima', 'Pulo Mas Barat - Batu Merah Delima'],
        ]
      ],
      [
        'wilayah' => [
          'name' => 'Wilayah III',
          'alternate_name' => 'Wilayah Santo Gregorius Agung',
          'address' => 'Kampung Baru Waringin',
        ],
        'lingkungan' => [
          ['Lingkungan Santo Stefanus', 'Lingkungan Kampung Baru Timur', 'Kampung Baru Timur'],
          ['Lingkungan Santa Monika', 'Lingkungan Waringin Tuparev', 'Waringin Tuparev'],
          ['Lingkungan Santo Tarsisius', 'Lingkungan Mahoni Mutiara', 'Mahoni Mutiara'],
          ['Lingkungan Santa Elisabeth', 'Lingkungan Kampung Baru Barat', 'Kampung Baru Barat'],
        ]
      ],
      [
        'wilayah' => [
          'name' => 'Wilayah IV',
          'alternate_name' => 'Wilayah Santo Gabriel',
          'address' => 'Kampung Ambon',
        ],
        'lingkungan' => [
          ['Lingkungan Santo Lukas Penginjil', 'Lingkungan Kayu', 'Kayu'],
          ['Lingkungan Santo Matius Penginjil', 'Lingkungan Kikir', 'Kikir'],
          ['Lingkungan Santo Blasius', 'Lingkungan Tembok', 'Tembok'],
          ['Lingkungan Santo Thomas Aquinas', 'Lingkungan Kusen Tener', 'Kusen Tener'],
          ['Lingkungan Santo Benediktus', 'Lingkungan Pasar Ampera', 'Pasar Ampera'],
        ]
      ],
      [
        'wilayah' => [
          'name' => 'Wilayah V',
          'alternate_name' => 'Wilayah Santa Veronika',
          'address' => 'Rawamangun',
        ],
        'lingkungan' => [
          ['Lingkungan Santa Maria', 'Lingkungan Haji Ten', 'Haji Ten'],
          ['Lingkungan Santo Yusuf', 'Lingkungan Pemuda', 'Pemuda'],
          ['Lingkungan Santa Maria Magdalena', 'Lingkungan Kayu Jati - Velodrome', 'Kayu Jati - Velodrome'],
        ]
      ],
      [
        'wilayah' => [
          'name' => 'Wilayah VI',
          'alternate_name' => 'Wilayah Santo Yohanes Paulus II',
          'address' => 'Pulo Asem',
        ],
        'lingkungan' => [
          ['Lingkungan Santa Klara', 'Lingkungan Taman Pulo Asem Utara', 'Taman Pulo Asem Utara'],
          ['Lingkungan Santo Petrus', 'Lingkungan Pulo Asem Sekolahan', 'Pulo Asem Sekolahan'],
          ['Lingkungan Santo Markus Penginjil', 'Lingkungan Pulo Asem Utara', 'Pulo Asem Utara'],
          ['Lingkungan Santo Valentinus', 'Lingkungan Pulo Asem Timur', 'Pulo Asem Timur'],
          ['Lingkungan Santa Katarina Labore', 'Lingkungan Pulo Asem Puskesmas', 'Pulo Asem Puskesmas'],
        ]
      ],
      [
        'wilayah' => [
          'name' => 'Wilayah VII',
          'alternate_name' => 'Wilayah Santa Maria Bunda Allah',
          'address' => 'Kayu Putih',
        ],
        'lingkungan' => [
          ['Lingkungan Santa Lidwina', 'Lingkungan Kayu Putih Tengah IV', 'Kayu Putih Tengah IV'],
          ['Lingkungan Santo Paulus Rasul', 'Lingkungan Tanah Mas', 'Tanah Mas'],
          ['Lingkungan Santa Bernadette Soubirous', 'Lingkungan Kayu Putih Tengah I-II', 'Kayu Putih Tengah I-II'],
          ['Lingkungan Santa Margaretha Alacoque', 'Lingkungan Kayu Putih Selatan', 'Kayu Putih Selatan'],
          ['Lingkungan Santa Teresa dari Kalkuta', 'Lingkungan Kayu Putih Tengah III Residence', 'Kayu Putih Tengah III Residence'],
          ['Lingkungan Santa Kristina', 'Lingkungan Kayu Putih Tirtamas', 'Kayu Putih Tirtamas'],
        ]
      ],
      [
        'wilayah' => [
          'name' => 'Wilayah VIII',
          'alternate_name' => 'Wilayah Santo Yusuf Pekerja',
          'address' => 'Kayu Putih & Pulo Nangka Timur',
        ],
        'lingkungan' => [
          ['Lingkungan Santo Damianus', 'Lingkungan Kayu Putih Utara I', 'Kayu Putih Utara I'],
          ['Lingkungan Santo Fransiskus Asisi', 'Lingkungan Kayu Putih Timur I & II', 'Kayu Putih Timur I & II'],
          ['Lingkungan Santa Theresia Kanak Kanak Yesus', 'Lingkungan Kayu Putih Utara III & VI', 'Kayu Putih Utara III & VI'],
          ['Lingkungan Santo Eduardus', 'Lingkungan Pulo Nangka Timur I-II dan Pulo Nangka Tengah', 'Pulo Nangka Timur I-II dan Pulo Nangka Tengah'],
        ]
      ],
      [
        'wilayah' => [
          'name' => 'Wilayah IX',
          'alternate_name' => 'Wilayah Santo Yohanes',
          'address' => 'Pulo Gadung',
        ],
        'lingkungan' => [
          ['Lingkungan Santa Anastasia', 'Lingkungan Kayu Mas', 'Kayu Mas'],
          ['Lingkungan Santo Yustinus', 'Lingkungan Griya Indah', 'Griya Indah'],
          ['Lingkungan Santo Albertus Agung', 'Lingkungan Gading Icon dan Oak', 'Gading Icon dan Oak'],
          ['Lingkungan Santo Yohanes Pemandi', 'Lingkungan Palad', 'Palad'],
          ['Lingkungan Santo Theofilus', 'Lingkungan Taruna', 'Taruna'],
        ]
      ],
      [
        'wilayah' => [
          'name' => 'Wilayah X',
          'alternate_name' => 'Wilayah Santo Fransiskus Xaverius',
          'address' => 'Jati Pulo Gadung',
        ],
        'lingkungan' => [
          ['Lingkungan Santo Agustinus', 'Lingkungan Jati Pratama', 'Jati Pratama'],
          ['Lingkungan Santo Ignatius', 'Lingkungan Jati Kenari', 'Jati Kenari'],
          ['Lingkungan Santa Ursula', 'Lingkungan Jati Mundu', 'Jati Mundu'],
          ['Lingkungan Santo Yulius', 'Lingkungan Kawasan Terminal Pulo Gadung', 'Kawasan Terminal Pulo Gadung'],
        ]
      ],
      [
        'wilayah' => [
          'name' => 'Wilayah XI',
          'alternate_name' => 'Wilayah Santa Etheldreda',
          'address' => 'Vila Sari Mas',
        ],
        'lingkungan' => [
          ['Lingkungan Santa Agatha', 'Lingkungan Villa Sari Mas Raya', 'Villa Sari Mas Raya'],
          ['Lingkungan Santa Lucia', 'Lingkungan Villa Sari Mas Barat', 'Villa Sari Mas Barat'],
          ['Lingkungan Santo Laurensius', 'Lingkungan Villa Sari Mas Tengah', 'Villa Sari Mas Tengah'],
          ['Lingkungan Santa Yustina', 'Lingkungan Villa Sari Mas Timur', 'Villa Sari Mas Timur'],
        ]
      ],
      [
        'wilayah' => [
          'name' => 'Wilayah XII',
          'alternate_name' => 'Wilayah Fiktif',
          'address' => 'Vila Sari Mas',
        ],
      ],
    ];

    foreach ($wilayahLingkunganData as $item) {
      $wilayah = Organization::create([
        'name' => $item['wilayah']['name'],
        'alternate_name' => $item['wilayah']['alternate_name'],
        'address' => $item['wilayah']['address'],
        'organization_type_id' => 1,
        'status_id' => 3,
      ]);

      if (isset($item['lingkungan'])) {
        foreach ($item['lingkungan'] as [$name, $altName, $address]) {
          Organization::create([
            'name' => $name,
            'alternate_name' => $altName,
            'address' => $address,
            'organization_type_id' => 2,
            'status_id' => 3,
            'parent_id' => $wilayah->id,
          ]);
        }
      }
    }
  }
}