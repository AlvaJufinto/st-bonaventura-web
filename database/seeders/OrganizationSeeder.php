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
      'Peribadatan' => [
        'description' => 'Mengelola dan menyelenggarakan berbagai aspek peribadatan untuk umat, memastikan kelancaran dan kekhidmatan liturgi di paroki.',
        'children' => [
          'Seksi Liturgi' => ['head_id' => null, 'description' => 'Bertanggung jawab atas kelancaran dan kekhidmatan perayaan liturgi, termasuk persiapan perlengkapan, tata ibadah, dan petugas liturgi.']
        ]
      ],
      'Pewartaan' => [
        'description' => 'Bertanggung jawab atas penyebaran Sabda Tuhan dan pembinaan iman umat melalui katekese, Kitab Suci, dan media komunikasi sosial.',
        'children' => [
          'Seksi Katekese' => ['head_id' => null, 'description' => 'Menyelenggarakan pendidikan iman dan bimbingan rohani bagi umat Katolik dari berbagai usia, mempersiapkan mereka untuk menerima sakramen.'],
          'Seksi Kerasulan Kitab Suci' => ['head_id' => null, 'description' => 'Mendorong dan memfasilitasi pendalaman serta penghayatan Sabda Tuhan melalui berbagai kegiatan, seperti lectio divina dan kelompok studi Kitab Suci.'],
          'Seksi Komunikasi Sosial' => ['head_id' => null, 'description' => 'Mengelola dan menyebarkan informasi serta pesan-pesan Gereja melalui media komunikasi modern, menjangkau umat dan masyarakat luas.']
        ]
      ],
      'Persekutuan & Pendampingan Territorial dan Kategorial' => [
        'description' => 'Membangun persekutuan umat yang erat dan memberikan pendampingan khusus bagi kelompok-kelompok kategorial dan teritorial untuk memperkuat iman dan solidaritas.',
        'children' => [
          'Seksi Kerasulan Keluarga' => ['head_id' => null, 'description' => 'Memberikan pendampingan dan dukungan bagi keluarga-keluarga Katolik dalam membangun kehidupan rumah tangga yang harmonis dan kristiani.'],
          'Seksi Kepemudaan' => ['head_id' => null, 'description' => 'Mengembangkan potensi dan iman kaum muda melalui various program pembinaan, rekreasi, dan pelayanan sosial.'],
          'Seksi Panggilan' => ['head_id' => null, 'description' => 'Mendorong dan membimbing umat muda untuk menemukan dan menanggapi panggilan hidupnya, baik sebagai imam, biarawan/biarawati, maupun awam yang berkomitmen.'],
          'Komunitas Kategorial Legio Mariae' => ['head_id' => null, 'description' => 'Sebuah organisasi kerasulan awam yang aktif dalam pelayanan rohani dan karya amal, meneladani Bunda Maria.'],
          'Komunitas Kategorial Gerakan Imam Maria' => ['head_id' => null, 'description' => 'Gerakan rohani yang mengajak para imam dan umat beriman untuk menguduskan diri kepada Bunda Maria melalui doa dan persembahan hidup.'],
          'Komunitas Kategorial Persekutuan Doa Pembaharuan Karismatik Katolik' => ['head_id' => null, 'description' => 'Menghidupkan iman melalui doa bersama, pujian, penyembahan, dan karunia-karunia Roh Kudus.'],
          'Komunitas Kategorial Kerabat Kerja Ibu Teresa / KKIT' => ['head_id' => null, 'description' => 'Terinspirasi oleh karya St. Teresa dari Kalkuta, komunitas ini berfokus pada pelayanan kasih kepada mereka yang paling miskin dan membutuhkan.'],
          'Komunitas Kategorial Meditasi Kitab Suci' => ['head_id' => null, 'description' => 'Menyediakan wadah bagi umat untuk mendalami dan merefleksikan Kitab Suci melalui metode meditasi kontemplatif.'],
          'Komunitas Kategorial PWK St. Monika' => ['head_id' => null, 'description' => 'Kelompok doa bagi para ibu yang mendoakan anak-anak dan keluarga, meneladani keteladanan St. Monika.'],
          'Komunitas Kategorial Paguyuban Simeon Hanna' => ['head_id' => null, 'description' => 'Wadah bagi para lansia untuk saling mendukung, berbagi iman, dan terus berkarya di usia senja.'],
          'Komunitas Kategorial Wanita Katolik Republik Indonesia' => ['head_id' => null, 'description' => 'Organisasi wanita Katolik yang bergerak di bidang sosial, pendidikan, dan kesejahteraan keluarga.']
        ]
      ],
      'Pelayanan & Tim Khusus' => [
        'description' => 'Fokus pada pelayanan sosial, pendidikan, kesehatan, dan program-program khusus untuk meningkatkan kesejahteraan dan kualitas hidup umat di paroki.',
        'children' => [
          'Seksi Pengembangan Sosial Ekonomi' => ['head_id' => null, 'description' => 'Meningkatkan kesejahteraan umat melalui program-program pemberdayaan ekonomi, kewirausahaan, dan bantuan sosial.'],
          'Seksi Pendidikan' => ['head_id' => null, 'description' => 'Mendukung dan mengembangkan pendidikan Katolik, baik formal maupun non-formal, untuk membentuk pribadi yang utuh dan beriman.'],
          'Seksi Kesehatan' => ['head_id' => null, 'description' => 'Memberikan pelayanan kesehatan dasar, penyuluhan kesehatan, dan pendampingan bagi umat yang sakit dan membutuhkan.'],
          'Tim Khusus ASAK' => ['head_id' => null, 'description' => 'Tim Adopsi Siswa Asuh Keuskupan yang berfokus pada pendampingan dan dukungan pendidikan bagi anak-anak kurang mampu.'],
          'Tim Khusus Usaha Sejahtera Bonaventura (CU)' => ['head_id' => null, 'description' => 'Mengelola Credit Union untuk membantu umat dalam pengelolaan keuangan, simpan pinjam, dan pengembangan usaha mikro.'],
          'Tim Khusus APP' => ['head_id' => null, 'description' => 'Tim Aksi Puasa Pembangunan yang mengorganisir dan menyalurkan dana untuk proyek-proyek pembangunan sosial dan karitatif.']
        ]
      ],
      'Kesaksian' => [
        'description' => 'Menjadi garam dan terang dunia dengan mengupayakan keadilan, perdamaian, dialog antaragama, dan kepedulian lingkungan hidup sebagai wujud iman Katolik.',
        'children' => [
          'Seksi Keadilan Perdamaian' => ['head_id' => null, 'description' => 'Mendorong terwujudnya keadilan sosial dan perdamaian di tengah masyarakat, serta menyuarakan hak-hak kaum tertindas.'],
          'Seksi Hubungan Antar Agama dan Kemasyarakatan' => ['head_id' => null, 'description' => 'Membangun dialog dan kerja sama antarumat beragama serta menjalin relasi harmonis dengan berbagai elemen masyarakat.'],
          'Seksi Lingkungan Hidup' => ['head_id' => null, 'description' => 'Meningkatkan kesadaran dan kepedulian umat terhadap kelestarian lingkungan hidup sebagai bagian dari ciptaan Tuhan.']
        ]
      ],
      'Pelatihan & Pengembangan Paroki' => [
        'description' => 'Melakukan riset, pengembangan, dan pelatihan untuk meningkatkan kapasitas serta kualitas pelayanan pastoral bagi para pelayan dan umat di paroki.',
        'children' => [
          'Seksi Penelitian dan Pengembangan' => ['head_id' => null, 'description' => 'Melakukan studi dan analisis untuk pengembangan program-program pastoral yang inovatif dan relevan.'],
          'Seksi Pelatihan dan Kaderisasi' => ['head_id' => null, 'description' => 'Menyelenggarakan pelatihan dan pembinaan bagi para pemimpin dan kader pastoral di paroki.']
        ]
      ],
      'Perencanaan & Evaluasi' => [
        'description' => 'Menyusun strategi, merencanakan program, dan mengevaluasi implementasinya demi efektivitas pastoral serta pencapaian tujuan paroki secara menyeluruh.',
        'children' => [
          'Seksi Perencanaan dan Evaluasi' => ['head_id' => null, 'description' => 'Menyusun rencana strategis dan mengevaluasi kinerja program-program paroki untuk mencapai tujuan pastoral yang efektif.']
        ]
      ],
      'Bagian' => [
        'description' => 'Unit-unit yang bertanggung jawab atas dukungan operasional, pemeliharaan fasilitas, dan keamanan di lingkungan paroki untuk mendukung semua kegiatan.',
        'children' => [
          'Bagian Pemeliharaan Komplek Gereja' => ['head_id' => null, 'description' => 'Bertanggung jawab atas perawatan, kebersihan, dan perbaikan fasilitas serta aset-aset di komplek gereja.'],
          'Bagian Rumah Tangga Pastoran' => ['head_id' => null, 'description' => 'Mengelola kebutuhan rumah tangga pastoran, including logistik dan kenyamanan para pastor.'],
          'Bagian Keamanan' => ['head_id' => null, 'description' => 'Menjaga keamanan dan ketertiban di lingkungan gereja dan pastoran selama kegiatan berlangsung.']
        ]
      ],
    ];

    $typeMapping = [
      'Seksi' => 'Seksi',
      'Komunitas' => 'Komunitas',
      'Tim' => 'Tim',
      'Bagian' => 'Bagian'
    ];

    $organizationTypes = OrganizationType::all()->keyBy('name');

    // Initialize a counter for head_id starting from 25
    $headIdCounter = 25;

    foreach ($data as $parentName => $parentData) {
      $typeName = $parentName === 'Bagian' ? 'Bagian' : 'Bidang';

      $parentType = $organizationTypes[$typeName] ?? null;
      if (!$parentType) {
        throw new \Exception("OrganizationType '{$typeName}' tidak ditemukan.");
      }

      // Parent organizations will not have a head_id assigned from this sequence
      $parent = Organization::create([
        'name' => $parentName,
        'organization_type_id' => $parentType->id,
        'description' => $parentData['description'],
        'status_id' => 3,
        'head_id' => null, // Parents don't get an auto-incremented head_id from this sequence
      ]);

      foreach ($parentData['children'] as $childName => $childInfo) {
        $firstWord = strtok($childName, ' ');
        $childTypeName = $typeMapping[$firstWord] ?? 'Seksi';

        if ($parentName === 'Bagian') {
          $childTypeName = 'Bagian';
        }

        $childType = $organizationTypes[$childTypeName] ?? null;
        if (!$childType) {
          throw new \Exception("OrganizationType '{$childTypeName}' tidak ditemukan.");
        }

        // Assign head_id sequentially if it's null and within the desired range (25-55)
        $currentChildHeadId = $childInfo['head_id'];
        if ($currentChildHeadId === null && $headIdCounter <= 55) {
          $currentChildHeadId = $headIdCounter++;
        }

        Organization::create([
          'name' => $childName,
          'organization_type_id' => $childType->id,
          'parent_id' => $parent->id,
          'description' => $childInfo['description'],
          'status_id' => 3,
          'head_id' => $currentChildHeadId,
        ]);
      }
    }
  }
}
