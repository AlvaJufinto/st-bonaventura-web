<?php

namespace Database\Seeders;

use App\Models\Council;
use App\Models\Organization;
use App\Models\Period;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PeriodSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();
        $hashedPassword = bcrypt('Password123');

        // =============================================
        // 1. CREATE PERIODS
        // =============================================
        $period1 = Period::create([
            'name' => '2023-2026',
            'start_year' => 2023,
            'end_year' => 2026,
            'is_active' => false,
        ]);

        $period2 = Period::create([
            'name' => '2026-2029',
            'start_year' => 2026,
            'end_year' => 2029,
            'is_active' => true,
        ]);

        // =============================================
        // 2. BACKFILL EXISTING DATA TO PERIOD 1
        // =============================================
        Organization::whereNull('period_id')->update(['period_id' => $period1->id]);
        Council::whereNull('period_id')->update(['period_id' => $period1->id]);
        DB::table('organization_user')->whereNull('period_id')->update(['period_id' => $period1->id]);

        // =============================================
        // 3. CREATE PERIOD 2 ORGANIZATIONS FIRST (so we have org IDs for user linking)
        // =============================================

        // Helper
        $createOrg = function ($name, $typeId, $headId, $parentId, $alternateName = null) use ($period2) {
            return Organization::create([
                'name' => $name,
                'slug' => Str::slug($name),
                'organization_type_id' => $typeId,
                'status_id' => 3,
                'head_id' => $headId,
                'parent_id' => $parentId,
                'alternate_name' => $alternateName,
                'period_id' => $period2->id,
            ]);
        };

        // --- DPP Period 2 Parent Organizations (type 3 = Bidang) ---
        $p2Peribadatan = $createOrg('Peribadatan', 3, null, null);
        $p2Pewartaan = $createOrg('Pewartaan', 3, null, null);
        $p2Persekutuan = $createOrg('Persekutuan & Pendampingan', 3, null, null);
        $p2Pelayanan = $createOrg('Pelayanan & Tim Khusus', 3, null, null);
        $p2Kesaksian = $createOrg('Kesaksian', 3, null, null);
        $p2Pelatihan = $createOrg('Pelatihan & Pengembangan Paroki', 3, null, null);
        $p2Perencanaan = $createOrg('Perencanaan & Evaluasi', 3, null, null);
        $p2Bagian = $createOrg('Bagian', 5, null, null);

        // --- DPP Period 2 Children (Seksi, Komunitas, Tim) ---
        $createSeksi = fn($name, $typeId, $headId, $parentId) => $createOrg($name, $typeId, $headId, $parentId);

        // Peribadatan
        $p2SeksiLiturgi = $createOrg('Seksi Liturgi', 4, null, $p2Peribadatan->id);

        // Pewartaan
        $p2SeksiKatekese = $createOrg('Seksi Katekese', 4, null, $p2Pewartaan->id);
        $p2SeksiKitabSuci = $createOrg('Seksi Kerasulan Kitab Suci', 4, null, $p2Pewartaan->id);
        $p2SeksiKomunikasi = $createOrg('Seksi Komunikasi Sosial', 4, null, $p2Pewartaan->id);

        // Persekutuan
        $p2SeksiKeluarga = $createOrg('Seksi Kerasulan Keluarga', 4, null, $p2Persekutuan->id);
        $p2SeksiKepemudaan = $createOrg('Seksi Kepemudaan', 4, null, $p2Persekutuan->id);
        $p2SeksiPanggilan = $createOrg('Seksi Panggilan', 4, null, $p2Persekutuan->id);
        $p2KomLegioMariae = $createOrg('Komunitas Kategorial Legio Mariae', 6, null, $p2Persekutuan->id);
        $p2KomGIM = $createOrg('Komunitas Kategorial Gerakan Imam Maria', 6, null, $p2Persekutuan->id);
        $p2KomPDKK = $createOrg('Komunitas Kategorial Persekutuan Doa Pembaharuan Karismatik Katolik', 6, null, $p2Persekutuan->id);
        $p2KomKKIT = $createOrg('Komunitas Kategorial Kerabat Kerja Ibu Teresa', 6, null, $p2Persekutuan->id);
        $p2KomMeditasi = $createOrg('Komunitas Kategorial Meditasi Kitab Suci', 6, null, $p2Persekutuan->id);
        $p2KomMarriage = $createOrg('Komunitas Kategorial Marriage Encounter', 6, null, $p2Persekutuan->id);
        $p2KomPWK = $createOrg('Komunitas Kategorial PWK St. Monika', 6, null, $p2Persekutuan->id);
        $p2KomSimeon = $createOrg('Komunitas Kategorial Paguyuban Simeon Hanna', 6, null, $p2Persekutuan->id);
        $p2KomAdorasi = $createOrg('Komunitas Kategorial Adorasi Sakramen Mahakudus dan Kerahiman Ilahi', 6, null, $p2Persekutuan->id);
        $p2WanitaKatolik = $createOrg('Komunitas Kategorial Wanita Katolik Republik Indonesia', 6, null, $p2Persekutuan->id);

        // Pelayanan
        $p2SeksiSosial = $createOrg('Seksi Pengembangan Sosial Ekonomi', 4, null, $p2Pelayanan->id);
        $p2SeksiPendidikan = $createOrg('Seksi Pendidikan', 4, null, $p2Pelayanan->id);
        $p2SeksiKesehatan = $createOrg('Seksi Kesehatan', 4, null, $p2Pelayanan->id);
        $p2TimASAK = $createOrg('Tim Khusus ASAK', 7, null, $p2Pelayanan->id);
        $p2TimCU = $createOrg('Tim Khusus Usaha Sejahtera Bonaventura', 7, null, $p2Pelayanan->id);
        $p2TimAPP = $createOrg('Tim Khusus APP', 7, null, $p2Pelayanan->id);

        // Kesaksian
        $p2SeksiKeadilan = $createOrg('Seksi Keadilan Perdamaian', 4, null, $p2Kesaksian->id);
        $p2SeksiHubungan = $createOrg('Seksi Hubungan Antar Agama dan Kemasyarakatan', 4, null, $p2Kesaksian->id);
        $p2SeksiLingkungan = $createOrg('Seksi Lingkungan Hidup', 4, null, $p2Kesaksian->id);

        // Pelatihan
        $p2SeksiPenelitian = $createOrg('Seksi Penelitian dan Pengembangan', 4, null, $p2Pelatihan->id);
        $p2SeksiKaderisasi = $createOrg('Seksi Pelatihan dan Kaderisasi', 4, null, $p2Pelatihan->id);

        // Perencanaan
        $p2SeksiPerencanaan = $createOrg('Seksi Perencanaan dan Evaluasi', 4, null, $p2Perencanaan->id);

        // Bagian
        $p2BagianPemeliharaan = $createOrg('Bagian Pemeliharaan Komplek Gereja', 9, null, $p2Bagian->id);
        $p2BagianRumah = $createOrg('Bagian Rumah Tangga Pastoran', 9, null, $p2Bagian->id);
        $p2BagianKeamanan = $createOrg('Bagian Keamanan', 9, null, $p2Bagian->id);
        $p2BagianKaryawan = $createOrg('Bagian Kekaryawanan', 9, null, $p2Bagian->id);

        // --- Wilayah Period 2 ---
        $wilayahData = [
            ['I', 'Santa Maria Ratu Rosari', 'Ria Rio Pacuan Kuda'],
            ['II', 'Santo Maximilian Kolbe', 'Pulo Mas Selatan'],
            ['III', 'Santo Gregorius Agung', 'Kp. Baru Waringin'],
            ['IV', 'Santo Gabriel', 'Kp. Ambon'],
            ['V', 'Santa Veronika', 'Rawamangun'],
            ['VI', 'Santo Yohanes Paulus II', 'Pulo Asem'],
            ['VII', 'Santa Maria Bunda Allah', 'Kayu Putih'],
            ['VIII', 'Santo Yusuf Pekerja', 'Kayu Putih & Pulo Nangka Timur'],
            ['IX', 'Santo Yohanes', 'Pulo Gadung'],
            ['X', 'Santo Fransiskus Xaverius', 'Jati Pulo Gadung'],
            ['XI', 'Santa Etheldreda', 'Villa Sari Mas'],
        ];

        $p2WilayahIds = [];
        foreach ($wilayahData as $i => $w) {
            $name = 'Wilayah ' . $w[0];
            $wilayah = Organization::create([
                'name' => $name,
                'alternate_name' => $w[1],
                'slug' => Str::slug($name) . '-p2',
                'organization_type_id' => 1,
                'status_id' => 3,
                'head_id' => null,
                'parent_id' => null,
                'address' => $w[2],
                'period_id' => $period2->id,
            ]);
            $p2WilayahIds[$i] = $wilayah->id;
        }

        // --- Lingkungan Period 2 ---
        $lingkunganData = [
            // WIL I
            ['Lingkungan Santa Anna', 'Pulo Mas Utara I', 0, 'St. Anna'],
            ['Lingkungan Santo Antonius Padua', 'Pulo Mas Timur I', 0, 'St. Antonius dari Padua'],
            ['Lingkungan Santo Yoakim', 'Pulo Mas Utara II & III', 0, 'St. Joakim'],
            ['Lingkungan Santo Carolus Borromeus', 'Pacuan Kuda', 0, 'St. Carolus Borromeus'],
            // WIL II
            ['Lingkungan Santa Agnes', 'Pulo Mas Timur', 1, 'St. Agnes'],
            ['Lingkungan Santa Angela', 'Pulo Mas V Kalbis', 1, 'St. Angela'],
            ['Lingkungan Santa Sesilia', 'Pulo Mas Barat', 1, 'St. Sisilia'],
            ['Lingkungan Santo Andreas', 'Pasadena Pulomas VIII', 1, 'St. Andreas'],
            ['Lingkungan Santo Mikael', 'Pulo Mas Barat VI', 1, 'St. Mikael'],
            // WIL III
            ['Lingkungan Santo Stefanus', 'Kp. Baru Timur', 2, 'St. Stefanus'],
            ['Lingkungan Santo Tarsisius', 'Mahoni Mutiara', 2, 'St. Tarsisius'],
            ['Lingkungan Santa Monika', 'Waringin Tuparev', 2, 'St. Monika'],
            ['Lingkungan Santa Elisabeth', 'Kp. Baru Barat', 2, 'St. Elizabeth'],
            // WIL IV
            ['Lingkungan Santo Lukas Penginjil', 'Kayu', 3, 'St. Lukas Penginjil'],
            ['Lingkungan Santo Matius Penginjil', 'Kikir', 3, 'St. Matius Penginjil'],
            ['Lingkungan Santo Thomas Aquinas', 'Kusen Tener', 3, 'St. Thomas Aquinas'],
            ['Lingkungan Santo Blasius', 'Tembok', 3, 'St. Blasius'],
            ['Lingkungan Santo Benediktus', 'Pasar Ampera', 3, 'St. Benediktus'],
            // WIL V
            ['Lingkungan Santa Maria', 'Haji Ten', 4, 'St. Maria'],
            ['Lingkungan Santo Yusuf', 'Pemuda', 4, 'St. Yusuf'],
            ['Lingkungan Santa Maria Magdalena', 'Kayu Jati Velodrome', 4, 'St. Maria Magdalena'],
            // WIL VI
            ['Lingkungan Santo Markus Penginjil', 'Pulo Asem Utara', 5, 'St. Markus Penginjil'],
            ['Lingkungan Santo Valentinus', 'Pulo Asem Timur', 5, 'St. Valentinus'],
            ['Lingkungan Santa Katarina Labore', 'Pulo Asem Puskesmas', 5, 'St. Katarina Labore'],
            ['Lingkungan Santa Klara', 'Taman Pulo Asem Utara', 5, 'St. Klara dari Asisi'],
            ['Lingkungan Santo Petrus', 'Pulo Asem Sekolahan', 5, 'St. Petrus'],
            // WIL VII
            ['Lingkungan Santo Paulus Rasul', 'Tanah Mas', 6, 'St. Paulus Rasul'],
            ['Lingkungan Santa Margaretha', 'Kayu Putih Selatan', 6, 'St. Margaretha'],
            ['Lingkungan Santa Lidwina', 'Kayu Putih Tengah IV', 6, 'St. Lidwina'],
            ['Lingkungan Santa Kristina', 'Kayu Putih Tirtamas', 6, 'St. Kristina'],
            ['Lingkungan Santa Bernadette Soubirous', 'Kayu Putih Tengah I-II', 6, 'St. Bernadette Soubirous'],
            // WIL VIII
            ['Lingkungan Santa Theresia Kanak Kanak Yesus', 'Kayu Putih Utara III & VI', 7, 'St. Theresia Kanak Kanak Yesus'],
            ['Lingkungan Santo Damianus', 'Kayu Putih Utara I', 7, 'St. Damianus'],
            ['Lingkungan Santo Fransiskus Asisi', 'Kayu Putih Timur I & II', 7, 'St. Fransiskus Asisi'],
            ['Lingkungan Santo Eduardus', 'Pulo Nangka Timur I-II dan Pulo Nangka Tengah', 7, 'St. Eduardus'],
            // WIL IX
            ['Lingkungan Santo Yohanes Pemandi', 'Palad', 8, 'St. Yohanes Pemandi'],
            ['Lingkungan Santa Anastasia', 'Kayu Mas', 8, 'St. Anastasia'],
            ['Lingkungan Santo Theofilus', 'Taruna', 8, 'St. Theofilus'],
            ['Lingkungan Santo Yustinus', 'Griya Indah', 8, 'St. Yustinus'],
            ['Lingkungan Santo Albertus Agung', 'Gading Icon dan Oak', 8, 'St. Albertus Agung'],
            // WIL X
            ['Lingkungan Santa Ursula', 'Jati Mundu', 9, 'St. Ursula'],
            ['Lingkungan Santo Ignatius', 'Jati Kenari', 9, 'St. Ignatius Loyola'],
            ['Lingkungan Santo Agustinus', 'Jati Pratama', 9, 'St. Agustinus'],
            ['Lingkungan Santo Yulius', 'Kawasan Terminal Pulo Gadung', 9, 'St. Yulius'],
            // WIL XI
            ['Lingkungan Santo Laurensius', 'Villa Sari Mas Tengah', 10, 'St. Laurensius'],
            ['Lingkungan Santo Yustina', 'Villa Sari Mas Timur', 10, 'St. Yustina'],
            ['Lingkungan Santa Agatha', 'Villa Sari Mas Raya', 10, 'St. Agatha'],
            ['Lingkungan Santa Lucia', 'Villa Sari Mas Barat', 10, 'St. Lucia'],
        ];

        foreach ($lingkunganData as $ling) {
            Organization::create([
                'name' => $ling[0],
                'alternate_name' => $ling[1],
                'slug' => Str::slug($ling[0]) . '-p2',
                'organization_type_id' => 2,
                'status_id' => 3,
                'head_id' => null,
                'parent_id' => $p2WilayahIds[$ling[2]],
                'period_id' => $period2->id,
            ]);
        }

        // =============================================
        // 4. CREATE USERS — username/email based on ORGANIZATION slug
        //    Profile picture still uses person name path
        // =============================================

        // Format: [username, name, email, role_id, profile_picture, orgSlug, orgRole]
        // username = org slug (e.g., dpp.seksi-liturgi, lingkungan.santa-anna)
        // email = username + @stbonaventura.org
        // profile_picture = users/2026/dpp/{PersonNameNoSpaces}.webp
        $p2Users = [
            // --- DPH (PGDP) Period 2 ---
            ['dph.ketua-umum', 'Pastor Stephanus Roy Djakarya, Pr.', 'dph.ketua-umum@stbonaventura.org', 2, 'users/2026/dph/RmStephanusRoyDjakaryaPr.webp'],
            ['dph.ketua-i', 'Pastor Benediktus Ari Darmawan, Pr.', 'dph.ketua-i@stbonaventura.org', 2, 'users/2026/dph/RmBenediktusAriDarmawanPr.webp'],
            ['dph.wakil-ketua-i', 'Thomas Lim Kian Heng', 'dph.wakil-ketua-i@stbonaventura.org', 2, 'users/2026/dph/ThomasLimKianHeng.webp'],
            ['dph.wakil-ketua-ii', 'Tanty Syahlina Tarigan', 'dph.wakil-ketua-ii@stbonaventura.org', 2, 'users/2026/dpp/TantySyahlinaTarigan.webp'],
            ['dph.sekretaris-i', 'Andreas Henry Mixson Lumban Batu', 'dph.sekretaris-i@stbonaventura.org', 2, 'users/2026/dpp/AndreasHenryMixsonLumbanBatu.webp'],
            ['dph.sekretaris-ii', 'Bernadette Priwahyuni', 'dph.sekretaris-ii@stbonaventura.org', 2, 'users/2026/dpp/BernadettePriwahyuni.webp'],
            ['dph.sekretaris-iii', 'Irene Feciany', 'dph.sekretaris-iii@stbonaventura.org', 2, 'users/2026/dpp/IreneFeciany.webp'],
            ['dph.bendahara-i', 'Marcelina Felicia Linda', 'dph.bendahara-i@stbonaventura.org', 2, 'users/2026/dpp/MarcelinaFeliciaLinda.webp'],
            ['dph.bendahara-ii', 'Helene Kam Len Nio', 'dph.bendahara-ii@stbonaventura.org', 2, 'users/2026/dpp/HeleneKamLenNio.webp'],
            ['dph.bendahara-iii', 'Ronald Yohannes', 'dph.bendahara-iii@stbonaventura.org', 2, 'users/2026/dpp/RonaldYohannes.webp'],

            // --- DPP Koordinator Bidang ---
            ['dpp.koor-peribadatan', 'Fransiskus Michael Setuso', 'dpp.koor-peribadatan@stbonaventura.org', 2, 'users/2026/dpp/FransiskusMichaelSetuso.webp'],
            ['dpp.koor-pewartaan', 'Robert Polana', 'dpp.koor-pewartaan@stbonaventura.org', 2, 'users/2026/dpp/RobertPolana.webp'],
            ['dpp.koor-persekutuan', 'Maria Mili Fonge', 'dpp.koor-persekutuan@stbonaventura.org', 2, 'users/2026/dpp/MariaMiliFonge.webp'],
            ['dpp.koor-pelayanan', 'Theresia Ferrania', 'dpp.koor-pelayanan@stbonaventura.org', 2, 'users/2026/dpp/TheresiaFerrania.webp'],
            ['dpp.koor-kesaksian', 'Ferry Olin Binsar', 'dpp.koor-kesaksian@stbonaventura.org', 2, 'users/2026/dpp/FerryOlinBinsar.webp'],
            ['dpp.koor-pelatihan', 'FX. Adviadi Nugroho', 'dpp.koor-pelatihan@stbonaventura.org', 2, 'users/2026/dpp/FXAdviadiNugroho.webp'],
            ['dpp.koor-perencanaan', 'Bernadus Wibisanto', 'dpp.koor-perencanaan@stbonaventura.org', 2, 'users/2026/dpp/BernadusWibisanto.webp'],
            ['dpp.koor-pendampingan', 'Vincentius Anggoro Cahyo Legowo', 'dpp.koor-pendampingan@stbonaventura.org', 2, 'users/2026/dpp/VincentiusAnggoroCahyoLegowo.webp'],

            // --- DPP Seksi/Komunitas/Tim ---
            ['dpp.seksi-liturgi', 'Yulius Suyatijo', 'dpp.seksi-liturgi@stbonaventura.org', 3, 'users/2026/dpp/YuliusSuyatijo.webp'],
            ['dpp.seksi-katekese', 'Ign. Setyanto Joko Maryuwono', 'dpp.seksi-katekese@stbonaventura.org', 3, 'users/2026/dpp/IgnSetyantoJokoMaryuwono.webp'],
            ['dpp.seksi-kitab-suci', 'Sylvia Veronica Makaminang', 'dpp.seksi-kitab-suci@stbonaventura.org', 3, 'users/2026/dpp/SylviaVeronicaMakaminang.webp'],
            ['dpp.seksi-komunikasi', 'Candra Wijaya', 'dpp.seksi-komunikasi@stbonaventura.org', 3, 'users/2026/dpp/CandraWijaya.webp'],
            ['dpp.seksi-keluarga', 'Antonius Trio Limas', 'dpp.seksi-keluarga@stbonaventura.org', 3, 'users/2026/dpp/AntoniusTrioLimas.webp'],
            ['dpp.seksi-kepemudaan', 'Erawati Maria Simanjorang', 'dpp.seksi-kepemudaan@stbonaventura.org', 3, 'users/2026/dpp/ErawatiMariaSimanjorang.webp'],
            ['dpp.seksi-panggilan', 'Bonaventura Eddy', 'dpp.seksi-panggilan@stbonaventura.org', 3, 'users/2026/dpp/BonaventuraEddy.webp'],
            ['dpp.kom-legio-mariae', 'Fransiska Remila', 'dpp.kom-legio-mariae@stbonaventura.org', 3, 'users/2026/dpp/FransiskaRemila.webp'],
            ['dpp.kom-gim', 'Fransisca Mimie Sumiyati', 'dpp.kom-gim@stbonaventura.org', 3, 'users/2026/dpp/FransiscaMimieSumiyati.webp'],
            ['dpp.kom-pdkk', 'Ernest Abraham Surjadipradja', 'dpp.kom-pdkk@stbonaventura.org', 3, 'users/2026/dpp/ErnestAbrahamSurjadipradja.webp'],
            ['dpp.kom-kkit', 'Caecilia Sri Minsuriany', 'dpp.kom-kkit@stbonaventura.org', 3, 'users/2026/dpp/CaeciliaSriMinsuriany.webp'],
            ['dpp.kom-meditasi', 'Christina Ambarwati', 'dpp.kom-meditasi@stbonaventura.org', 3, 'users/2026/dpp/ChristinaAmbarwati.webp'],
            ['dpp.kom-marriage', 'Ishidorus Reza Primahendra & Bernadeth Renita', 'dpp.kom-marriage@stbonaventura.org', 3, 'users/2026/dpp/IshidorusRezaPrimahendra&BernadethRenitaMulyaningtyas.webp'],
            ['dpp.kom-pwk', 'Caecilia Juniati', 'dpp.kom-pwk@stbonaventura.org', 3, 'users/2026/dpp/CaeciliaJuniati.webp'],
            ['dpp.kom-simeon', 'Ien Siswi Astuti', 'dpp.kom-simeon@stbonaventura.org', 3, 'users/2026/dpp/IenSiswiAstuti.webp'],
            ['dpp.kom-adorasi', 'Blasius Dodu', 'dpp.kom-adorasi@stbonaventura.org', 3, 'users/2026/dpp/BlasiusDodu.webp'],
            ['dpp.wanita-katolik', 'Maria Tri Adhara Librawanti', 'dpp.wanita-katolik@stbonaventura.org', 3, 'users/2026/dpp/MariaTriAdharaLibrawanti.webp'],
            ['dpp.seksi-sosial', 'Maria Regina Hartoyo', 'dpp.seksi-sosial@stbonaventura.org', 3, 'users/2026/dpp/MariaReginaHartoyo.webp'],
            ['dpp.seksi-pendidikan', 'Yehezkiel Vega Adjibusono', 'dpp.seksi-pendidikan@stbonaventura.org', 3, 'users/2026/dpp/YehezkielVegaAdjibusono.webp'],
            ['dpp.seksi-kesehatan', 'Helena Fanidah Tanuhendrata', 'dpp.seksi-kesehatan@stbonaventura.org', 3, 'users/2026/dpp/HelenaFanidahTanuhendrata.webp'],
            ['dpp.tim-asak', 'Claudia Anne', 'dpp.tim-asak@stbonaventura.org', 3, 'users/2026/dpp/ClaudiaAnne.webp'],
            ['dpp.tim-cu', 'Antonius Setyo Mulyanto', 'dpp.tim-cu@stbonaventura.org', 3, 'users/2026/dpp/AntoniusSetyoMulyanto.webp'],
            ['dpp.tim-app', 'Juventus Deka Aditama', 'dpp.tim-app@stbonaventura.org', 3, 'users/2026/dpp/JuventusDekaAditama.webp'],
            ['dpp.seksi-keadilan', 'Avenanda Patria Guntur', 'dpp.seksi-keadilan@stbonaventura.org', 3, 'users/2026/dpp/AvenandaPatriaGuntur.webp'],
            ['dpp.seksi-hubungan', 'Setiadji Karuniawan Seputra', 'dpp.seksi-hubungan@stbonaventura.org', 3, 'users/2026/dpp/SetiadjiKaruniawanSeputra.webp'],
            ['dpp.seksi-lingkungan', 'Stefanus Prasito Adi', 'dpp.seksi-lingkungan@stbonaventura.org', 3, 'users/2026/dpp/StefanusPrasitoAdi.webp'],
            ['dpp.seksi-penelitian', 'Alfonsus Sonny Kusuma Wijaya', 'dpp.seksi-penelitian@stbonaventura.org', 3, 'users/2026/dpp/AlfonsusSonnyKusumaWijaya.webp'],
            ['dpp.seksi-kaderisasi', 'Anastasia Wilsa Theodore', 'dpp.seksi-kaderisasi@stbonaventura.org', 3, 'users/2026/dpp/AnastasiaWilsaTheodore.webp'],
            ['dpp.seksi-perencanaan', 'Yoseph Liantoro', 'dpp.seksi-perencanaan@stbonaventura.org', 3, 'users/2026/dpp/YosephLiantoro.webp'],
            ['dpp.bagian-pemeliharaan', 'Maria Goretti Triyanti Ratnasari', 'dpp.bagian-pemeliharaan@stbonaventura.org', 3, 'users/2026/dpp/MariaGorettiTriyantiRatnasari.webp'],
            ['dpp.bagian-rumah-tangga', 'Irene Damar Widiastuti', 'dpp.bagian-rumah-tangga@stbonaventura.org', 3, 'users/2026/dpp/IreneDamarWidiastuti.webp'],
            ['dpp.bagian-keamanan', 'George Robert Gunawan', 'dpp.bagian-keamanan@stbonaventura.org', 3, 'users/2026/dpp/GeorgeRobertGunawan.webp'],
            ['dpp.bagian-karyawan', 'Imelda Tarigan', 'dpp.bagian-karyawan@stbonaventura.org', 3, 'users/2026/dpp/ImeldaTarigan.webp'],

            // --- Koordinator Wilayah ---
            ['wilayah.i', 'Felix Yosafat', 'wilayah.i@stbonaventura.org', 3, 'users/2026/dpp/FelixYosafat.webp'],
            ['wilayah.ii', 'Agnes Febrita Kusumawati', 'wilayah.ii@stbonaventura.org', 3, 'users/2026/dpp/AgnesFebritaKusumawati.webp'],
            ['wilayah.iii', 'Fransiska Mardiana Rumahorbo', 'wilayah.iii@stbonaventura.org', 3, 'users/2026/dpp/FransiskaMardiana.webp'],
            ['wilayah.iv', 'Alfonsus Adi Wicaksono', 'wilayah.iv@stbonaventura.org', 3, 'users/2026/dpp/AlfonsusAdiWicaksono.webp'],
            ['wilayah.v', 'Luciana Novica Helmi Panjaitan', 'wilayah.v@stbonaventura.org', 3, 'users/2026/dpp/LucianaNovicaHelmiPanjaitan.webp'],
            ['wilayah.vi', 'Veronika Tanner', 'wilayah.vi@stbonaventura.org', 3, 'users/2026/dpp/VeronikaTanner.webp'],
            ['wilayah.vii', 'Gratiana Crecentia Ramahwati Karyadi', 'wilayah.vii@stbonaventura.org', 3, 'users/2026/dpp/GratianaCrecentiaRamahwatiKaryadi.webp'],
            ['wilayah.viii', 'Yohana Ari Warigalit', 'wilayah.viii@stbonaventura.org', 3, 'users/2026/dpp/YohanaAriWarigalit.webp'],
            ['wilayah.ix', 'Haposan David Napitupulu', 'wilayah.ix@stbonaventura.org', 3, 'users/2026/dpp/HaposanDavidNapitupulu.webp'],
            ['wilayah.x', 'Louis Irwansson Lubis', 'wilayah.x@stbonaventura.org', 3, 'users/2026/dpp/LouisIrwanssonLubis.webp'],
            ['wilayah.xi', 'Marcellus Kisyanto Halim', 'wilayah.xi@stbonaventura.org', 3, 'users/2026/dpp/MarcellusKisyantoHalim.webp'],

            // --- Lingkungan (username based on slug) ---
            ['lingkungan.santa-anna', 'Christopher Sutanto Adi Yongky', 'lingkungan.santa-anna@stbonaventura.org', 3, 'users/2026/dpp/ChristopherSutantoAdiYongky.webp'],
            ['lingkungan.santo-antonius', 'Renny Suryana', 'lingkungan.santo-antonius@stbonaventura.org', 3, 'users/2026/dpp/RennySuryana.webp'],
            ['lingkungan.santo-yoakim', 'Stephanus Marko Erawan Halim', 'lingkungan.santo-yoakim@stbonaventura.org', 3, 'users/2026/dpp/StephanusMarkoErawanHalim.webp'],
            ['lingkungan.santo-carolus', 'Debby Elysabeth Thioritz', 'lingkungan.santo-carolus@stbonaventura.org', 3, 'users/2026/dpp/DebbyElysabethThioritz.webp'],
            ['lingkungan.santa-agnes', 'Mikaela Mellyn Soetiono', 'lingkungan.santa-agnes@stbonaventura.org', 3, 'users/2026/dpp/MikaelaMellynSoetiono.webp'],
            ['lingkungan.santa-angela', 'Agnes Venny Wunas', 'lingkungan.santa-angela@stbonaventura.org', 3, 'users/2026/dpp/AgnesVennyWunas.webp'],
            ['lingkungan.santa-sesilia', 'Fransiska Evi Lusiana', 'lingkungan.santa-sesilia@stbonaventura.org', 3, 'users/2026/dpp/FransiskaEviLusiana.webp'],
            ['lingkungan.santo-andreas', 'Maria Grace Massing', 'lingkungan.santo-andreas@stbonaventura.org', 3, 'users/2026/dpp/MariaGraceMassing.webp'],
            ['lingkungan.santo-mikael', 'Yohanes Violison Martheo', 'lingkungan.santo-mikael@stbonaventura.org', 3, 'users/2026/dpp/YohanesViolisonMartheo.webp'],
            ['lingkungan.santo-stefanus', 'Margaretha Dwiningsih Astuti', 'lingkungan.santo-stefanus@stbonaventura.org', 3, 'users/2026/dpp/MargarethaDwiAstuti.webp'],
            ['lingkungan.santo-tarsisius', 'Bertha Loi', 'lingkungan.santo-tarsisius@stbonaventura.org', 3, 'users/2026/dpp/BerthaLoi.webp'],
            ['lingkungan.santa-monika', 'Rosalia Prasetyaningsih', 'lingkungan.santa-monika@stbonaventura.org', 3, 'users/2026/dpp/RosaliaPrasetyaningsih.webp'],
            ['lingkungan.santa-elisabeth', 'Eviani Sakeng', 'lingkungan.santa-elisabeth@stbonaventura.org', 3, 'users/2026/dpp/EvianiSakeng.webp'],
            ['lingkungan.santo-lukas', 'Christina Endah Purnomo Wulandari', 'lingkungan.santo-lukas@stbonaventura.org', 3, 'users/2026/dpp/ChristinaEndahPurnomoWulandari.webp'],
            ['lingkungan.santo-matius', 'Agatha Mirna Indraswari', 'lingkungan.santo-matius@stbonaventura.org', 3, 'users/2026/dpp/AgathaMirnaIndraswari.webp'],
            ['lingkungan.santo-thomas', 'Vincentius Taufik Manfaluti', 'lingkungan.santo-thomas@stbonaventura.org', 3, 'users/2026/dpp/VincentiusTaufikManfaluti.webp'],
            ['lingkungan.santo-blasius', 'Gervasius Dri Istiya Yudana', 'lingkungan.santo-blasius@stbonaventura.org', 3, 'users/2026/dpp/GervasiusDriIstiyaYudana.webp'],
            ['lingkungan.santo-benediktus', 'Agustinus Yudho Wirajati', 'lingkungan.santo-benediktus@stbonaventura.org', 3, 'users/2026/dpp/AgustinusYudhoWirajati.webp'],
            ['lingkungan.santa-maria', 'Monang Parhusip Nainggolan', 'lingkungan.santa-maria@stbonaventura.org', 3, 'users/2026/dpp/MonangParhusipNainggolan.webp'],
            ['lingkungan.santo-yusuf', 'Alfernia Uli Aritonang', 'lingkungan.santo-yusuf@stbonaventura.org', 3, 'users/2026/dpp/AlferniaUliAritonang.webp'],
            ['lingkungan.santa-magdalena', 'Theresia Rini Supriati', 'lingkungan.santa-magdalena@stbonaventura.org', 3, 'users/2026/dpp/TheresiaRiniSupriati.webp'],
            ['lingkungan.santo-markus', 'Andreas Cahyo Adi Kuncoro', 'lingkungan.santo-markus@stbonaventura.org', 3, 'users/2026/dpp/AndreasCahyoAdiKuncoro.webp'],
            ['lingkungan.santo-valentinus', 'F.X. Chrisye', 'lingkungan.santo-valentinus@stbonaventura.org', 3, 'users/2026/dpp/FXChrisye.webp'],
            ['lingkungan.santa-katarina', 'Theresia Mustika Dewi', 'lingkungan.santa-katarina@stbonaventura.org', 3, 'users/2026/dpp/TheresiaMustikaDewi.webp'],
            ['lingkungan.santa-klara', 'Dionisius Bambang Hermawan', 'lingkungan.santa-klara@stbonaventura.org', 3, 'users/2026/dpp/DionisiusBambangHermawan.webp'],
            ['lingkungan.santo-petrus', 'Stanislaus Kotska Sandy Qlintang', 'lingkungan.santo-petrus@stbonaventura.org', 3, 'users/2026/dpp/StanislausKotskaSandyQlintang.webp'],
            ['lingkungan.santo-paulus', 'Gracia Grace Indriani', 'lingkungan.santo-paulus@stbonaventura.org', 3, 'users/2026/dpp/GraciaGraceIndriani.webp'],
            ['lingkungan.santa-margaretha', 'Oktavianus Michael Sentot', 'lingkungan.santa-margaretha@stbonaventura.org', 3, 'users/2026/dpp/OktavianusMichaelSentot.webp'],
            ['lingkungan.santa-lidwina', 'Jane Agnes Tampatty', 'lingkungan.santa-lidwina@stbonaventura.org', 3, 'users/2026/dpp/JaneAgnesTampatty.webp'],
            ['lingkungan.santa-kristina', 'Imelda Meiske', 'lingkungan.santa-kristina@stbonaventura.org', 3, 'users/2026/dpp/ImeldaMeiske.webp'],
            ['lingkungan.santa-bernadette', 'Albertus Dominic Surya Dharma', 'lingkungan.santa-bernadette@stbonaventura.org', 3, 'users/2026/dpp/AlbertusDominicSuryaDharma.webp'],
            ['lingkungan.santa-theresia', 'Natalie Rini Kustini Amelia', 'lingkungan.santa-theresia@stbonaventura.org', 3, 'users/2026/dpp/NatalieRiniKustiniAmelia.webp'],
            ['lingkungan.santo-damianus', 'Elke Emiliana Herlin Januar', 'lingkungan.santo-damianus@stbonaventura.org', 3, 'users/2026/dpp/ElkeEmilianaHerlinJanuar.webp'],
            ['lingkungan.santo-fransiskus', 'Anna Maria Baby Agustine Sutiono', 'lingkungan.santo-fransiskus@stbonaventura.org', 3, 'users/2026/dpp/AnnaMariaBabyAgustineSutiono.webp'],
            ['lingkungan.santo-eduardus', 'Eric Prabowo Somanto', 'lingkungan.santo-eduardus@stbonaventura.org', 3, 'users/2026/dpp/EricPrabowoSomanto.webp'],
            ['lingkungan.santo-yohanes-pemandi', 'Yohana Asti Ratnasari', 'lingkungan.santo-yohanes-pemandi@stbonaventura.org', 3, 'users/2026/dpp/YohanaAstiRatnasari.webp'],
            ['lingkungan.santa-anastasia', 'Maria Roseni Yosephine', 'lingkungan.santa-anastasia@stbonaventura.org', 3, 'users/2026/dpp/MariaRoseniYosephine.webp'],
            ['lingkungan.santo-theofilus', 'Friska Maria Hutabara', 'lingkungan.santo-theofilus@stbonaventura.org', 3, 'users/2026/dpp/FriskaMariaHutabara.webp'],
            ['lingkungan.santo-yustinus', 'Pardamean G. Hutapea', 'lingkungan.santo-yustinus@stbonaventura.org', 3, 'users/2026/dpp/PardameanHutapea.webp'],
            ['lingkungan.santo-albertus-agung', 'Sebastianus F. Maryadi', 'lingkungan.santo-albertus-agung@stbonaventura.org', 3, 'users/2026/dpp/SebastianusFMaryadi.webp'],
            ['lingkungan.santa-ursula', 'Laurentius Molo', 'lingkungan.santa-ursula@stbonaventura.org', 3, 'users/2026/dpp/LaurentiusMolo.webp'],
            ['lingkungan.santo-ignatius', 'Anastasia Martini', 'lingkungan.santo-ignatius@stbonaventura.org', 3, 'users/2026/dpp/AnastasiaMartini.webp'],
            ['lingkungan.santo-agustinus', 'Ray Aditya Iswara', 'lingkungan.santo-agustinus@stbonaventura.org', 3, 'users/2026/dpp/RayAdityaIswara.webp'],
            ['lingkungan.santo-yulius', 'Irene Lydia N. Welan', 'lingkungan.santo-yulius@stbonaventura.org', 3, 'users/2026/dpp/IreneLydiaNWelan.webp'],
            ['lingkungan.santo-laurensius', 'Theresia Dewi Anggraini', 'lingkungan.santo-laurensius@stbonaventura.org', 3, 'users/2026/dpp/TheresiaDewiAnggraini.webp'],
            ['lingkungan.santo-yustina', 'Nicholas Arief Subroto', 'lingkungan.santo-yustina@stbonaventura.org', 3, 'users/2026/dpp/NicholasAriefSubroto.webp'],
            ['lingkungan.santa-agatha', 'Bernadet Tri Astuti Nur Endah', 'lingkungan.santa-agatha@stbonaventura.org', 3, 'users/2026/dpp/BernadetTriAstutiNurEndah.webp'],
            ['lingkungan.santa-lucia', 'Maria Mariana Mira Riyani', 'lingkungan.santa-lucia@stbonaventura.org', 3, 'users/2026/dpp/MariaMarianaMiraRiyani.webp'],

            // --- Sekolah & Biara ---
            ['sekolah.tk-smp', 'Sr. Hedwigis, FSGM', 'sekolah.tk-smp@stbonaventura.org', 3, 'users/2026/dpp/SrHedwigisFSGM.webp'],
            ['sekolah.sma-smk', 'Yohanes Halek', 'sekolah.sma-smk@stbonaventura.org', 3, 'users/2026/dpp/YohanesHalek.webp'],
            ['sekolah.don-bosco', 'F.X. Sulistiyono', 'sekolah.don-bosco@stbonaventura.org', 3, 'users/2026/dpp/FXSulistiyono.webp'],
            ['biara.susteran', 'Sr. M. Karitas, FSGM', 'biara.susteran@stbonaventura.org', 3, 'users/2026/dpp/SrMKaritasFSGM.webp'],
            ['biara.duns-scotus', 'Pastor Yoseph Agut, OFM', 'biara.duns-scotus@stbonaventura.org', 3, 'users/2026/dpp/PastorYosephAgutOFM.webp'],
            ['biara.sj-pulo-nangka', 'Pastor Guido Chrisna Hidayat, SJ', 'biara.sj-pulo-nangka@stbonaventura.org', 3, 'users/2026/dpp/PastorGuidoChrisnaHidayatSJ.webp'],
            ['biara.sj-kp-ambon', 'Pastor Thomas Hidya Tjaya, SJ', 'biara.sj-kp-ambon@stbonaventura.org', 3, 'users/2026/dpp/PastorThomasHidyaTjayaSJ.webp'],
        ];

        $userIdMap = [];
        foreach ($p2Users as $u) {
            $user = User::create([
                'username' => $u[0],
                'name' => $u[1],
                'email' => $u[2],
                'password' => $hashedPassword,
                'role_id' => $u[3],
                'status_id' => 3,
                'period_id' => $period2->id,
                'profile_picture' => $u[4],
                'email_verified_at' => $now,
            ]);
            $userIdMap[$u[0]] = $user->id;
        }

        // =============================================
        // 5. LINK USERS TO ORGANIZATIONS via pivot
        // =============================================
        // [username, orgSlug, role]
        $pivotLinks = [
            // DPP Seksi/Komunitas/Tim
            ['dpp.seksi-liturgi', 'peribadatan', 'Seksi Liturgi'],
            ['dpp.seksi-katekese', 'pewartaan', 'Seksi Katekese'],
            ['dpp.seksi-kitab-suci', 'pewartaan', 'Seksi Kerasulan Kitab Suci'],
            ['dpp.seksi-komunikasi', 'pewartaan', 'Seksi Komunikasi Sosial'],
            ['dpp.seksi-keluarga', 'persekutuan-pendampingan', 'Seksi Kerasulan Keluarga'],
            ['dpp.seksi-kepemudaan', 'persekutuan-pendampingan', 'Seksi Kepemudaan'],
            ['dpp.seksi-panggilan', 'persekutuan-pendampingan', 'Seksi Panggilan'],
            ['dpp.kom-legio-mariae', 'persekutuan-pendampingan', 'Komunitas Legio Mariae'],
            ['dpp.kom-gim', 'persekutuan-pendampingan', 'Komunitas Gerakan Imam Maria'],
            ['dpp.kom-pdkk', 'persekutuan-pendampingan', 'Komunitas PDKK'],
            ['dpp.kom-kkit', 'persekutuan-pendampingan', 'Komunitas KKIT'],
            ['dpp.kom-meditasi', 'persekutuan-pendampingan', 'Komunitas Meditasi Kitab Suci'],
            ['dpp.kom-marriage', 'persekutuan-pendampingan', 'Komunitas Marriage Encounter'],
            ['dpp.kom-pwk', 'persekutuan-pendampingan', 'Komunitas PWK St. Monika'],
            ['dpp.kom-simeon', 'persekutuan-pendampingan', 'Komunitas Paguyuban Simeon Hanna'],
            ['dpp.kom-adorasi', 'persekutuan-pendampingan', 'Komunitas Adorasi Sakramen'],
            ['dpp.wanita-katolik', 'persekutuan-pendampingan', 'Wanita Katolik RI'],
            ['dpp.seksi-sosial', 'pelayanan-tim-khusus', 'Seksi Pengembangan Sosial Ekonomi'],
            ['dpp.seksi-pendidikan', 'pelayanan-tim-khusus', 'Seksi Pendidikan'],
            ['dpp.seksi-kesehatan', 'pelayanan-tim-khusus', 'Seksi Kesehatan'],
            ['dpp.tim-asak', 'pelayanan-tim-khusus', 'Tim Khusus ASAK'],
            ['dpp.tim-cu', 'pelayanan-tim-khusus', 'Tim Khusus CU'],
            ['dpp.tim-app', 'pelayanan-tim-khusus', 'Tim Khusus APP'],
            ['dpp.seksi-keadilan', 'kesaksian', 'Seksi Keadilan Perdamaian'],
            ['dpp.seksi-hubungan', 'kesaksian', 'Seksi Hubungan Antar Agama'],
            ['dpp.seksi-lingkungan', 'kesaksian', 'Seksi Lingkungan Hidup'],
            ['dpp.seksi-penelitian', 'pelatihan-pengembangan-paroki', 'Seksi Penelitian'],
            ['dpp.seksi-kaderisasi', 'pelatihan-pengembangan-paroki', 'Seksi Pelatihan dan Kaderisasi'],
            ['dpp.seksi-perencanaan', 'perencanaan-evaluasi', 'Seksi Perencanaan dan Evaluasi'],
            ['dpp.bagian-pemeliharaan', 'bagian', 'Bagian Pemeliharaan Komplek Gereja'],
            ['dpp.bagian-rumah-tangga', 'bagian', 'Bagian Rumah Tangga Pastoran'],
            ['dpp.bagian-keamanan', 'bagian', 'Bagian Keamanan'],
            ['dpp.bagian-karyawan', 'bagian', 'Bagian Kekaryawanan'],

            // Lingkungan
            ['lingkungan.santa-anna', 'lingkungan-santa-anna', 'Ketua Lingkungan'],
            ['lingkungan.santo-antonius', 'lingkungan-santo-antonius-padua', 'Ketua Lingkungan'],
            ['lingkungan.santo-yoakim', 'lingkungan-santo-yoakim', 'Ketua Lingkungan'],
            ['lingkungan.santo-carolus', 'lingkungan-santo-carolus-borromeus', 'Ketua Lingkungan'],
            ['lingkungan.santa-agnes', 'lingkungan-santa-agnes', 'Ketua Lingkungan'],
            ['lingkungan.santa-angela', 'lingkungan-santa-angela', 'Ketua Lingkungan'],
            ['lingkungan.santa-sesilia', 'lingkungan-santa-sesilia', 'Ketua Lingkungan'],
            ['lingkungan.santo-andreas', 'lingkungan-santo-andreas', 'Ketua Lingkungan'],
            ['lingkungan.santo-mikael', 'lingkungan-santo-mikael', 'Ketua Lingkungan'],
            ['lingkungan.santo-stefanus', 'lingkungan-santo-stefanus', 'Ketua Lingkungan'],
            ['lingkungan.santo-tarsisius', 'lingkungan-santo-tarsisius', 'Ketua Lingkungan'],
            ['lingkungan.santa-monika', 'lingkungan-santa-monika', 'Ketua Lingkungan'],
            ['lingkungan.santa-elisabeth', 'lingkungan-santa-elisabeth', 'Ketua Lingkungan'],
            ['lingkungan.santo-lukas', 'lingkungan-santo-lukas-penginjil', 'Ketua Lingkungan'],
            ['lingkungan.santo-matius', 'lingkungan-santo-matius-penginjil', 'Ketua Lingkungan'],
            ['lingkungan.santo-thomas', 'lingkungan-santo-thomas-aquinas', 'Ketua Lingkungan'],
            ['lingkungan.santo-blasius', 'lingkungan-santo-blasius', 'Ketua Lingkungan'],
            ['lingkungan.santo-benediktus', 'lingkungan-santo-benediktus', 'Ketua Lingkungan'],
            ['lingkungan.santa-maria', 'lingkungan-santa-maria', 'Ketua Lingkungan'],
            ['lingkungan.santo-yusuf', 'lingkungan-santo-yusuf', 'Ketua Lingkungan'],
            ['lingkungan.santa-magdalena', 'lingkungan-santa-maria-magdalena', 'Ketua Lingkungan'],
            ['lingkungan.santo-markus', 'lingkungan-santo-markus-penginjil', 'Ketua Lingkungan'],
            ['lingkungan.santo-valentinus', 'lingkungan-santo-valentinus', 'Ketua Lingkungan'],
            ['lingkungan.santa-katarina', 'lingkungan-santa-katarina-labore', 'Ketua Lingkungan'],
            ['lingkungan.santa-klara', 'lingkungan-santa-klara', 'Ketua Lingkungan'],
            ['lingkungan.santo-petrus', 'lingkungan-santo-petrus', 'Ketua Lingkungan'],
            ['lingkungan.santo-paulus', 'lingkungan-santo-paulus-rasul', 'Ketua Lingkungan'],
            ['lingkungan.santa-margaretha', 'lingkungan-santa-margaretha', 'Ketua Lingkungan'],
            ['lingkungan.santa-lidwina', 'lingkungan-santa-lidwina', 'Ketua Lingkungan'],
            ['lingkungan.santa-kristina', 'lingkungan-santa-kristina', 'Ketua Lingkungan'],
            ['lingkungan.santa-bernadette', 'lingkungan-santa-bernadette-soubirous', 'Ketua Lingkungan'],
            ['lingkungan.santa-theresia', 'lingkungan-santa-theresia-kanak-kanak-yesus', 'Ketua Lingkungan'],
            ['lingkungan.santo-damianus', 'lingkungan-santo-damianus', 'Ketua Lingkungan'],
            ['lingkungan.santo-fransiskus', 'lingkungan-santo-fransiskus-asisi', 'Ketua Lingkungan'],
            ['lingkungan.santo-eduardus', 'lingkungan-santo-eduardus', 'Ketua Lingkungan'],
            ['lingkungan.santo-yohanes-pemandi', 'lingkungan-santo-yohanes-pemandi', 'Ketua Lingkungan'],
            ['lingkungan.santa-anastasia', 'lingkungan-santa-anastasia', 'Ketua Lingkungan'],
            ['lingkungan.santo-theofilus', 'lingkungan-santo-theofilus', 'Ketua Lingkungan'],
            ['lingkungan.santo-yustinus', 'lingkungan-santo-yustinus', 'Ketua Lingkungan'],
            ['lingkungan.santo-albertus-agus', 'lingkungan-santo-albertus-agung', 'Ketua Lingkungan'],
            ['lingkungan.santo-ursula', 'lingkungan-santa-ursula', 'Ketua Lingkungan'],
            ['lingkungan.santo-ignatius', 'lingkungan-santo-ignatius', 'Ketua Lingkungan'],
            ['lingkungan.santo-agustinus', 'lingkungan-santo-agustinus', 'Ketua Lingkungan'],
            ['lingkungan.santo-yulius', 'lingkungan-santo-yulius', 'Ketua Lingkungan'],
            ['lingkungan.santo-laurensius', 'lingkungan-santo-laurensius', 'Ketua Lingkungan'],
            ['lingkungan.santo-yustina', 'lingkungan-santo-yustina', 'Ketua Lingkungan'],
            ['lingkungan.santa-agatha', 'lingkungan-santa-agatha', 'Ketua Lingkungan'],
            ['lingkungan.santa-lucia', 'lingkungan-santa-lucia', 'Ketua Lingkungan'],

            // Koordinator Wilayah
            ['wilayah.i', 'wilayah-i', 'Koordinator Wilayah'],
            ['wilayah.ii', 'wilayah-ii', 'Koordinator Wilayah'],
            ['wilayah.iii', 'wilayah-iii', 'Koordinator Wilayah'],
            ['wilayah.iv', 'wilayah-iv', 'Koordinator Wilayah'],
            ['wilayah.v', 'wilayah-v', 'Koordinator Wilayah'],
            ['wilayah.vi', 'wilayah-vi', 'Koordinator Wilayah'],
            ['wilayah.vii', 'wilayah-vii', 'Koordinator Wilayah'],
            ['wilayah.viii', 'wilayah-viii', 'Koordinator Wilayah'],
            ['wilayah.ix', 'wilayah-ix', 'Koordinator Wilayah'],
            ['wilayah.x', 'wilayah-x', 'Koordinator Wilayah'],
            ['wilayah.xi', 'wilayah-xi', 'Koordinator Wilayah'],

            // Sekolah & Biara
            ['sekolah.tk-smp', null, 'Perwakilan Sekolah Katolik'],
            ['sekolah.sma-smk', null, 'Perwakilan Sekolah Katolik'],
            ['sekolah.don-bosco', null, 'Perwakilan Sekolah Katolik'],
            ['biara.susteran', null, 'Perwakilan Biara'],
            ['biara.duns-scotus', null, 'Perwakilan Biara'],
            ['biara.sj-pulo-nangka', null, 'Perwakilan Biara'],
            ['biara.sj-kp-ambon', null, 'Perwakilan Biara'],
        ];

        foreach ($pivotLinks as $link) {
            $uid = $userIdMap[$link[0]] ?? null;
            $orgSlug = $link[1];
            $role = $link[2];

            if (!$uid) continue;

            if ($orgSlug) {
                $org = Organization::where('slug', $orgSlug)->first();
                if ($org) {
                    DB::table('organization_user')->insert([
                        'user_id' => $uid,
                        'organization_id' => $org->id,
                        'role' => $role,
                        'period_id' => $period2->id,
                        'created_at' => $now,
                        'updated_at' => $now,
                    ]);
                }
            }
        }

        // =============================================
        // 6. UPDATE head_id FOR WILAYAH, DPP BIDANG, DPP SEKSI/KOMUNITAS/TIM
        // =============================================
        $headLinks = [
            // Wilayah
            'wilayah.i' => 'wilayah-i',
            'wilayah.ii' => 'wilayah-ii',
            'wilayah.iii' => 'wilayah-iii',
            'wilayah.iv' => 'wilayah-iv',
            'wilayah.v' => 'wilayah-v',
            'wilayah.vi' => 'wilayah-vi',
            'wilayah.vii' => 'wilayah-vii',
            'wilayah.viii' => 'wilayah-viii',
            'wilayah.ix' => 'wilayah-ix',
            'wilayah.x' => 'wilayah-x',
            'wilayah.xi' => 'wilayah-xi',

            // DPP Koordinator Bidang
            'dpp.koor-peribadatan' => 'peribadatan',
            'dpp.koor-pewartaan' => 'pewartaan',
            'dpp.koor-persekutuan' => 'persekutuan-pendampingan',
            'dpp.koor-pelayanan' => 'pelayanan-tim-khusus',
            'dpp.koor-kesaksian' => 'kesaksian',
            'dpp.koor-pelatihan' => 'pelatihan-pengembangan-paroki',
            'dpp.koor-perencanaan' => 'perencanaan-evaluasi',
            'dpp.koor-pendampingan' => 'bagian',

            // DPP Seksi/Komunitas/Tim
            'dpp.seksi-liturgi' => 'seksi-liturgi',
            'dpp.seksi-katekese' => 'seksi-katekese',
            'dpp.seksi-kitab-suci' => 'seksi-kerasulan-kitab-suci',
            'dpp.seksi-komunikasi' => 'seksi-komunikasi-sosial',
            'dpp.seksi-keluarga' => 'seksi-kerasulan-keluarga',
            'dpp.seksi-kepemudaan' => 'seksi-kepemudaan',
            'dpp.seksi-panggilan' => 'seksi-panggilan',
            'dpp.kom-legio-mariae' => 'komunitas-kategorial-legio-mariae',
            'dpp.kom-gim' => 'komunitas-kategorial-gerakan-imam-maria',
            'dpp.kom-pdkk' => 'komunitas-kategorial-persekutuan-doa-pembaharuan-karismatik-katolik',
            'dpp.kom-kkit' => 'komunitas-kategorial-kerabat-kerja-ibu-teresa',
            'dpp.kom-meditasi' => 'komunitas-kategorial-meditasi-kitab-suci',
            'dpp.kom-marriage' => 'komunitas-kategorial-marriage-encounter',
            'dpp.kom-pwk' => 'komunitas-kategorial-pwk-st-monika',
            'dpp.kom-simeon' => 'komunitas-kategorial-paguyuban-simeon-hanna',
            'dpp.kom-adorasi' => 'komunitas-kategorial-adorasi-sakramen-mahakudus-dan-kerahiman-ilahi',
            'dpp.wanita-katolik' => 'komunitas-kategorial-wanita-katolik-republik-indonesia',
            'dpp.seksi-sosial' => 'seksi-pengembangan-sosial-ekonomi',
            'dpp.seksi-pendidikan' => 'seksi-pendidikan',
            'dpp.seksi-kesehatan' => 'seksi-kesehatan',
            'dpp.tim-asak' => 'tim-khusus-asak',
            'dpp.tim-cu' => 'tim-khusus-usaha-sejahtera-bonaventura',
            'dpp.tim-app' => 'tim-khusus-app',
            'dpp.seksi-keadilan' => 'seksi-keadilan-perdamaian',
            'dpp.seksi-hubungan' => 'seksi-hubungan-antar-agama-dan-kemasyarakatan',
            'dpp.seksi-lingkungan' => 'seksi-lingkungan-hidup',
            'dpp.seksi-penelitian' => 'seksi-penelitian-dan-pengembangan',
            'dpp.seksi-kaderisasi' => 'seksi-pelatihan-dan-kaderisasi',
            'dpp.seksi-perencanaan' => 'seksi-perencanaan-dan-evaluasi',
            'dpp.bagian-pemeliharaan' => 'bagian-pemeliharaan-komplek-gereja',
            'dpp.bagian-rumah-tangga' => 'bagian-rumah-tangga-pastoran',
            'dpp.bagian-keamanan' => 'bagian-keamanan',
            'dpp.bagian-karyawan' => 'bagian-kekaryawanan',
        ];

        foreach ($headLinks as $username => $orgSlug) {
            $uid = $userIdMap[$username] ?? null;
            $org = Organization::where('slug', $orgSlug)->first();
            if ($uid && $org) {
                $org->update(['head_id' => $uid]);
            }
        }

        // =============================================
        // 7. ALL 10 DPH COUNCILS
        // =============================================
        $period2Councils = [
            ['title' => 'Ketua Umum DP / PGDP', 'user_id' => $userIdMap['dph.ketua-umum'], 'order' => 1],
            ['title' => 'Ketua I DP / PGDP', 'user_id' => $userIdMap['dph.ketua-i'], 'order' => 2],
            ['title' => 'Wakil Ketua I DP / PGDP', 'user_id' => $userIdMap['dph.wakil-ketua-i'], 'order' => 3],
            ['title' => 'Wakil Ketua II DP / PGDP', 'user_id' => $userIdMap['dph.wakil-ketua-ii'], 'order' => 4],
            ['title' => 'Sekretaris I DP / PGDP', 'user_id' => $userIdMap['dph.sekretaris-i'], 'order' => 5],
            ['title' => 'Sekretaris II DP / PGDP', 'user_id' => $userIdMap['dph.sekretaris-ii'], 'order' => 6],
            ['title' => 'Sekretaris III DP / PGDP', 'user_id' => $userIdMap['dph.sekretaris-iii'], 'order' => 7],
            ['title' => 'Bendahara I DP / PGDP', 'user_id' => $userIdMap['dph.bendahara-i'], 'order' => 8],
            ['title' => 'Bendahara II DP / PGDP', 'user_id' => $userIdMap['dph.bendahara-ii'], 'order' => 9],
            ['title' => 'Bendahara III DP / PGDP', 'user_id' => $userIdMap['dph.bendahara-iii'], 'order' => 10],
        ];

        foreach ($period2Councils as $c) {
            Council::create([
                'title' => $c['title'],
                'user_id' => $c['user_id'],
                'order' => $c['order'],
                'period_id' => $period2->id,
            ]);
        }
    }
}
