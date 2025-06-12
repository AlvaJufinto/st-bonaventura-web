<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User; // Import the User model
use App\Models\Role; // Import the Role model if needed to fetch role_id dynamically

class UserSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $hashedPassword = bcrypt('Password123');
    $now = now(); // Ambil timestamp sekali


    $users = [
      // ANGGOTA DPH 2023 – 2026
      // role_id untuk DPH sesuai komen adalah 3 (contributor)
      [
        'username' => 'stephanus.royke',
        'name' => 'Stephanus Royke Djakarya, Pr.',
        'email' => 'stephanus.royke@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 2, // Diperbaiki: role_id untuk DPH sesuai daftar baru
      ],
      [
        'username' => 'antonius.arfin',
        'name' => 'Antonius Arfin Samosir, Pr.',
        'email' => 'antonius.arfin@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 2, // Diperbaiki
      ],
      [
        'username' => 'hubertus.hartono',
        'name' => 'Hubertus Hartono Sondakh',
        'email' => 'hubertus.hartono@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 2, // Diperbaiki
      ],
      [
        'username' => 'thomas.lim',
        'name' => 'Thomas Lim Kian Heng',
        'email' => 'thomas.lim@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 2, // Diperbaiki
      ],
      [
        'username' => 'ivon.sri',
        'name' => 'Ivon Sri Darmayanti',
        'email' => 'ivon.sri@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 2, // Diperbaiki
      ],
      [
        'username' => 'andreas.henry',
        'name' => 'Andreas Henry Mixson Lumban Batu',
        'email' => 'andreas.henry@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 2, // Diperbaiki
      ],
      [
        'username' => 'maria.odilia',
        'name' => 'Maria Odilia Damayanti',
        'email' => 'maria.odilia@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 2, // Diperbaiki
      ],
      [
        'username' => 'caecilia.supojo',
        'name' => 'Caecilia Supojo Niniek Dhamayanti',
        'email' => 'caecilia.supojo@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 2, // Diperbaiki
      ],
      [
        'username' => 'marcelina.felicia',
        'name' => 'Marcelina Felicia Linda Wiryadi',
        'email' => 'marcelina.felicia@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 2, // Diperbaiki
      ],
      [
        'username' => 'carolus.boromeus',
        'name' => 'Carolus Boromeus Dedi',
        'email' => 'carolus.boromeus@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 2, // Diperbaiki
      ],
      [
        'username' => 'stephanus.pudji',
        'name' => 'Stephanus Pudji Ludianto',
        'email' => 'stephanus.pudji@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 2, // Diperbaiki
      ],
      [
        'username' => 'fx.yanuar',
        'name' => 'Fransiskus Xaverius Yanuar Ekaputra',
        'email' => 'fx.yanuar@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 2, // Diperbaiki
      ],
      [
        'username' => 'maria.mili',
        'name' => 'Maria Mili Fonge',
        'email' => 'maria.mili@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 2, // Diperbaiki
      ],
      [
        'username' => 'martinus.robert',
        'name' => 'Martinus Robert Polana',
        'email' => 'martinus.robert@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 2, // Diperbaiki
      ],
      [
        'username' => 'ferry.olin',
        'name' => 'Ferry Olin Binsar',
        'email' => 'ferry.olin@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 2, // Diperbaiki
      ],
      [
        'username' => 'theresia.ferrania',
        'name' => 'Theresia Ferrania',
        'email' => 'theresia.ferrania@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 2, // Diperbaiki
      ],
      [
        'username' => 'agnes.amelia',
        'name' => 'Agnes Amelia Yowanda',
        'email' => 'agnes.amelia@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 2, // Diperbaiki
      ],
      [
        'username' => 'fx.adviadi',
        'name' => 'Fransiskus Xaverius Adviadi Nugroho',
        'email' => 'fx.adviadi@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 2, // Diperbaiki
      ],
      [
        'username' => 'marianus.ari',
        'name' => 'Marianus Ari Winarto',
        'email' => 'marianus.ari@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 2, // Diperbaiki
      ],
      [
        'username' => 'yohanes.bambang',
        'name' => 'Yohanes Bambang Kristianto',
        'email' => 'yohanes.bambang@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 2, // Diperbaiki
      ],
      [
        'username' => 'bernadus.wibisanto',
        'name' => 'Bernadus Wibisanto',
        'email' => 'bernadus.wibisanto@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 2, // Diperbaiki
      ],
      [
        'username' => 'fredericus.sugiarso',
        'name' => 'Fredericus Sugiarso Budihardjo',
        'email' => 'fredericus.sugiarso@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 2, // Diperbaiki
      ],

      // ANGGOTA DPP 2023 - 2026 (Including all subsequent categories)
      // role_id untuk DPP tetap 5 (sesuai komen, asumsikan ini role lain selain admin/moderator/contributor)
      // BIDANG PERIBADATAN
      [
        'username' => 'fransiskus.michael',
        'name' => 'Bp. Fransiskus Michael Setuso',
        'email' => 'fransiskus.michael@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      // BIDANG PEWARTAAN
      [
        'username' => 'ign.setyanto',
        'name' => 'Bp. Ign. Setyanto Joko Maryuwono',
        'email' => 'ign.setyanto@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'philipus.vembrey',
        'name' => 'Bp. Philipus Vembrey',
        'email' => 'philipus.vembrey@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'benedict.toar',
        'name' => 'Bp. Benedict Toar Pratasis',
        'email' => 'benedict.toar@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      // BIDANG PERSEKUTUAN DAN PENDAMPINGAN KATEGORIAL
      [
        'username' => 'vincentius.anggoro',
        'name' => 'Bp. Vincentius Anggoro Cahyo Legowo',
        'email' => 'vincentius.anggoro@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'stephanie.widjaja',
        'name' => 'Sdri. Stephanie Widjaja',
        'email' => 'stephanie.widjaja@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'renius.simamora',
        'name' => 'Bp. Renius Simamora',
        'email' => 'renius.simamora@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'alexander.teme',
        'name' => 'Bp. Alexander Teme',
        'email' => 'alexander.teme@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'fransisca.mimie',
        'name' => 'Ibu Fransisca Mimie Sumiyati',
        'email' => 'fransisca.mimie@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'ernest.abraham',
        'name' => 'Bp. Ernest Abraham Surjadipradja',
        'email' => 'ernest.abraham@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'caecilia.sri',
        'name' => 'Ibu Caecilia Sri Minsuriany',
        'email' => 'caecilia.sri@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'christina.ambarwati',
        'name' => 'Ibu Christina Ambarwati',
        'email' => 'christina.ambarwati@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'bernadeth.renita',
        'name' => 'Ibu Bernadeth Renita Mulyaningtyas',
        'email' => 'bernadeth.renita@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'florentina.patricia',
        'name' => 'Ibu Florentina Patricia Kustyorini',
        'email' => 'florentina.patricia@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'elizabeth.poedyasmara',
        'name' => 'Ibu Elizabeth Poedyasmara',
        'email' => 'elizabeth.poedyasmara@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'fransiska.rema',
        'name' => 'Ibu Fransiska Rema Sakeng',
        'email' => 'fransiska.rema@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      // BIDANG PELAYANAN DAN TIM KHUSUS
      [
        'username' => 'maria.regina',
        'name' => 'Ibu Maria Regina Hartoyo',
        'email' => 'maria.regina@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'yehezkiel.vega',
        'name' => 'Bp. Yehezkiel Vega Adjibusono',
        'email' => 'yehezkiel.vega@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'helena.fanidah',
        'name' => 'Ibu Helena Fanidah Tanuhendrata',
        'email' => 'helena.fanidah@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'albertus.dominic',
        'name' => 'Bp. Albertus Dominic Surya Dharma',
        'email' => 'albertus.dominic@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'antonius.setyo',
        'name' => 'Bp. Antonius Setyo Mulyanto',
        'email' => 'antonius.setyo@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'maria.demseria',
        'name' => 'Ibu Maria Demseria Silalahi',
        'email' => 'maria.demseria@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      // BIDANG KESAKSIAN
      [
        'username' => 'ronlybert.togatorop',
        'name' => 'Bp. Ronlybert Togatorop',
        'email' => 'ronlybert.togatorop@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'george.robert',
        'name' => 'Bp. George Robert Gunawan',
        'email' => 'george.robert@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'stefanus.prasito',
        'name' => 'Bp. Stefanus Prasito Adi',
        'email' => 'stefanus.prasito@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      // BIDANG PENELITIAN DAN PENGEMBANGAN PAROKI
      [
        'username' => 'christopher.haris',
        'name' => 'Bp. Christopher Haris Pratama',
        'email' => 'christopher.haris@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'christina.irma',
        'name' => 'Ibu Christina Irma Wirawaty',
        'email' => 'christina.irma@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      // BIDANG PERENCANAAN DAN EVALUASI
      [
        'username' => 'yoseph.liantoro',
        'name' => 'Bp. Yoseph Liantoro',
        'email' => 'yoseph.liantoro@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      // PENDAMPING BAGIAN
      [
        'username' => 'bonaventura.eddy',
        'name' => 'Bp. Bonaventura Eddy',
        'email' => 'bonaventura.eddy@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'yustina.sri',
        'name' => 'Ibu Yustina Sri Andarini',
        'email' => 'yustina.sri@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'antonius.anang',
        'name' => 'Bp. Antonius Anang Budi Arso',
        'email' => 'antonius.anang@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],

      // KOORDINATOR WILAYAH
      [
        'username' => 'felix.yosafat',
        'name' => 'Bp. Felix Yosafat',
        'email' => 'felix.yosafat@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'tanty.syahlina',
        'name' => 'Ibu Tanty Syahlina Tarigan',
        'email' => 'tanty.syahlina@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'fransiska.mardiana',
        'name' => 'Ibu Fransiska Mardiana',
        'email' => 'fransiska.mardiana@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'yoakim.nugroho',
        'name' => 'Bp. Yoakim Nugroho Ekomursanto',
        'email' => 'yoakim.nugroho@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'yohanes.edy',
        'name' => 'Bp. Yohanes Edy Susanto',
        'email' => 'yohanes.edy@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'veronika.tanner',
        'name' => 'Ibu Veronika Tanner',
        'email' => 'veronika.tanner@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'gratiana.crecentia',
        'name' => 'Ibu Gratiana Crecentia Ramahwati Karyadi',
        'email' => 'gratiana.crecentia@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'yohana.ari',
        'name' => 'Ibu Yohana Ari Warigalit',
        'email' => 'yohana.ari@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'bernadette.melissa',
        'name' => 'Ibu Bernadette Melissa Budiman',
        'email' => 'bernadette.melissa@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'agustinus.indarto',
        'name' => 'Bp. Agustinus Indarto',
        'email' => 'agustinus.indarto@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'marcellus.kisyanto',
        'name' => 'Bp. Marcellus Kisyanto Halim',
        'email' => 'marcellus.kisyanto@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],

      // KETUA LINGKUNGAN
      // WILAYAH I
      [
        'username' => 'christopher.sutanto',
        'name' => 'Bp. Christopher Sutanto Adi Yongky',
        'email' => 'christopher.sutanto@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'peter.lino',
        'name' => 'Bp. Peter Lino',
        'email' => 'peter.lino@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'veronica.katarina',
        'name' => 'Ibu Veronica Katarina Erlin Octavia',
        'email' => 'veronica.katarina@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'adrianus.lioe',
        'name' => 'Bp. Adrianus Lioe',
        'email' => 'adrianus.lioe@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      // WILAYAH II
      [
        'username' => 'christopher.erwin',
        'name' => 'Bp. Christopher Erwin Budianto',
        'email' => 'christopher.erwin@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'agnes.venny',
        'name' => 'Ibu Agnes Venny Wunas',
        'email' => 'agnes.venny@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'fransiska.evi',
        'name' => 'Ibu Fransiska Evi Lusiana',
        'email' => 'fransiska.evi@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'agnes.febrita',
        'name' => 'Ibu Agnes Febrita Kusumawati',
        'email' => 'agnes.febrita@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'yohanes.violison',
        'name' => 'Bp. Yohanes Violison Martheo',
        'email' => 'yohanes.violison@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      // WILAYAH III
      [
        'username' => 'margaretha.dwi',
        'name' => 'Ibu Margaretha Dwi Astuti',
        'email' => 'margaretha.dwi@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'pensi.kristiana',
        'name' => 'Ibu Pensi Kristiana Siahaan',
        'email' => 'pensi.kristiana@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'rosalia.prasetyaningsih',
        'name' => 'Ibu Rosalia Prasetyaningsih',
        'email' => 'rosalia.prasetyaningsih@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'nicolaus.suparno',
        'name' => 'Bp. Nicolaus Suparno',
        'email' => 'nicolaus.suparno@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      // WILAYAH IV
      [
        'username' => 'christina.endah',
        'name' => 'Ibu Christina Endah Purnomo Wulandari',
        'email' => 'christina.endah@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'maria.goreti',
        'name' => 'Ibu Maria Goreti Rian Garyati',
        'email' => 'maria.goreti@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'vincentius.taufik',
        'name' => 'Bp. Vincentius Taufik Manfaluti',
        'email' => 'vincentius.taufik@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'gervasius.dri',
        'name' => 'Bp. Gervasius Dri Istiya Yudana',
        'email' => 'gervasius.dri@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'agustinus.yudho',
        'name' => 'Bp. Agustinus Yudho Wirajati',
        'email' => 'agustinus.yudho@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      // WILAYAH V
      [
        'username' => 'ferdinandus.mustar',
        'name' => 'Bp. Ferdinandus Mustar Hasibuan',
        'email' => 'ferdinandus.mustar@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'alfernia.uli',
        'name' => 'Ibu Alfernia Uli Aritonang',
        'email' => 'alfernia.uli@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'theresia.rini',
        'name' => 'Ibu Theresia Rini Supriati',
        'email' => 'theresia.rini@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      // WILAYAH VI
      [
        'username' => 'yohanes.adios',
        'name' => 'Bp. Yohanes Adios Falentino Ririhena',
        'email' => 'yohanes.adios@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'leonardus.teddy',
        'name' => 'Bp. Leonardus Teddy Bramantya',
        'email' => 'leonardus.teddy@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'theresia.mustika',
        'name' => 'Ibu Theresia Mustika Dewi',
        'email' => 'theresia.mustika@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'dionisius.bambang',
        'name' => 'Bp. Dionisius Bambang Hermawan',
        'email' => 'dionisius.bambang@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'yohanes.widjaja',
        'name' => 'Bp. Yohanes Widjaja Gomulya',
        'email' => 'yohanes.widjaja@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      // WILAYAH VII
      [
        'username' => 'grace.indriani',
        'name' => 'Ibu Grace Indriani',
        'email' => 'grace.indriani@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'maria.immaculata',
        'name' => 'Ibu Maria Immaculata Sri Marsanti',
        'email' => 'maria.immaculata@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'jane.agnes',
        'name' => 'Ibu Jane Agnes Tampatty',
        'email' => 'jane.agnes@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'imelda.meiske',
        'name' => 'Ibu Imelda Meiske',
        'email' => 'imelda.meiske@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'helene.kam',
        'name' => 'Ibu Helene Kam Len Nio',
        'email' => 'helene.kam@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'marcella.erlin',
        'name' => 'Ibu Marcella Erlin Biantini',
        'email' => 'marcella.erlin@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      // WILAYAH VIII
      [
        'username' => 'natalie.rini',
        'name' => 'Ibu Natalie Rini Kustini Amelia',
        'email' => 'natalie.rini@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'maria.clara',
        'name' => 'Ibu Maria Clara Kaefitri Taman',
        'email' => 'maria.clara@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'maria.sutiono',
        'name' => 'Ibu Anna Maria Baby Agustine Sutiono',
        'email' => 'maria.sutiono@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'anna.natalia',
        'name' => 'Ibu Anna Natalia',
        'email' => 'anna.natalia@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      // WILAYAH IX
      [
        'username' => 'pius.chandra',
        'name' => 'Bp. Pius Chandra Widjayanto',
        'email' => 'pius.chandra@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'pauline.tri',
        'name' => 'Ibu Pauline Tri Juliarti Mili Timu',
        'email' => 'pauline.tri@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'james.madison',
        'name' => 'Bp. James Madison Sitanggang',
        'email' => 'james.madison@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'maria.mawarni',
        'name' => 'Ibu Maria Mawarni Simamora',
        'email' => 'maria.mawarni@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'maxima.henie',
        'name' => 'Ibu Maxima Henie Kun Widisusanti',
        'email' => 'maxima.henie@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      // WILAYAH X
      [
        'username' => 'laurentius.molo',
        'name' => 'Bp. Laurentius Molo',
        'email' => 'laurentius.molo@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'anastasia.martini',
        'name' => 'Ibu Anastasia Martini',
        'email' => 'anastasia.martini@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'yohanes.ricky',
        'name' => 'Bp. Yohanes Ricky Iriawan',
        'email' => 'yohanes.ricky@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'irene.lydia',
        'name' => 'Ibu Irene Lydia N. Welan',
        'email' => 'irene.lydia@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      // WILAYAH XI
      [
        'username' => 'theresia.dewi',
        'name' => 'Ibu Theresia Dewi Anggraini',
        'email' => 'theresia.dewi@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'nicholas.arief',
        'name' => 'Bp. Nicholas Arief Subroto',
        'email' => 'nicholas.arief@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'bernadet.tri',
        'name' => 'Ibu Bernadet Tri Astuti Nur Endah',
        'email' => 'bernadet.tri@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'pricilla.jane',
        'name' => 'Ibu Pricilla Jane Halim',
        'email' => 'pricilla.jane@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],

      // PERWAKILAN SEKOLAH KATOLIK
      // Sr. Hedwigis, FSGM (Skipped - Tidak memiliki nama kedua yang jelas sesuai format)
      [
        'username' => 'yohanes.rachmat',
        'name' => 'Br. Yohanes Rachmat Simamora, OFM',
        'email' => 'yohanes.rachmat@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      [
        'username' => 'maria.djokosetio',
        'name' => 'Ibu Anna Maria Djokosetio',
        'email' => 'maria.djokosetio@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],

      // PERWAKILAN BIARA DAN KOMUNITAS
      [
        'username' => 'm.julita',
        'name' => 'Sr. M. Julita, FSGM',
        'email' => 'm.julita@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
      // Br. Yohanes Rachmat Simamora, OFM (Duplikat - Sudah ada di bagian Sekolah Katolik)
      [
        'username' => 'guido.chrisna',
        'name' => 'Pastor Guido Chrisna Hidayat, SJ',
        'email' => 'guido.chrisna@stbonaventura.org',
        'password' => $hashedPassword,
        'email_verified_at' => $now,
        'role_id' => 3, // Tetap 5
      ],
    ];

    User::insert($users);
  }
}
