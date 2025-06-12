<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CouncilSeeder extends Seeder
{
  public function run(): void
  {

    $councils = [
      ['title' => 'Ketua Umum DP / PGDP', 'name' => 'Romo Stephanus Royke Djakarya Pr'],
      ['title' => 'Ketua I DP / PGDP', 'name' => 'Antonius Arfin Samosir, Pr.'],
      ['title' => 'Wakil Ketua I DP / PGDP', 'name' => 'Hubertus Hartono Sondakh'],
      ['title' => 'Wakil Ketua II DP / PGDP', 'name' => 'Thomas Lim Kian Heng'],
      ['title' => 'Sekretaris I DP / PGDP', 'name' => 'Ivon Sri Darmayanti'],
      ['title' => 'Sekretaris II DP / PGDP', 'name' => 'Andreas Henry Mixson Lumban Batu'],
      ['title' => 'Sekretaris III DP / PGDP', 'name' => 'Maria Odilia Damayanti'],
      ['title' => 'Bendahara I DP / PGDP', 'name' => 'Caecilia Supojo Niniek Dhamayanti'],
      ['title' => 'Bendahara II DP / PGDP', 'name' => 'Marcelina Felicia Linda Wiryadi'],
      ['title' => 'Bendahara III DP / PGDP', 'name' => 'Carolus Boromeus Dedi'],
      ['title' => 'Bidang Peribadatan', 'name' => 'Stephanus Pudji Ludianto'],
      ['title' => 'Bidang Pewartaan', 'name' => 'Fransiskus Xaverius Yanuar Ekaputra'],
      ['title' => 'Bidang Pewartaan', 'name' => 'Maria Mili Fonge'],
      ['title' => 'Bidang Persekutuan & Pendampingan Teritorial dan Kategorial', 'name' => 'Martinus Robert Polana'],
      ['title' => 'Bidang Persekutuan & Pendampingan Teritorial dan Kategorial', 'name' => 'Ferry Olin Binsar'],
      ['title' => 'Bidang Pelayanan & Team Khusus', 'name' => 'Theresia Ferrania'],
      ['title' => 'Bidang Pelayanan & Team Khusus', 'name' => 'Agnes Amelia Yowanda'],
      ['title' => 'Bidang Kesaksian', 'name' => 'Fransiskus Xaverius Adviadi Nugroho'],
      ['title' => 'Bidang Pelatihan dan Pengembangan Paroki', 'name' => 'Marianus Ari Winarto'],
      ['title' => 'Bidang Perencanaan & Evaluasi', 'name' => 'Yohanes Bambang Kristianto'],
      ['title' => 'Bidang Perencanaan & Evaluasi', 'name' => 'Bernadus Wibisanto'],
      ['title' => 'Pendampingan Bagian', 'name' => 'Fredericus Sugiarso Budihardjo'],
    ];

    foreach ($councils as $index => $council) {
      DB::table('councils')->insert([
        'title' => $council['title'],
        'user_id' => $index + 3,
        'order' => $index + 1,
        'created_at' => now(),
        'updated_at' => now(),
      ]);
    }
  }
}