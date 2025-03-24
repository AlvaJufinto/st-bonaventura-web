import Header from "./Header";

const STEPS = [
  {
    title: "Pemeriksaan Batin (Examination of Conscience)",
    points: [
      "Apakah saya telah melanggar perintah Allah dan ajaran Gereja?",
      "Apakah saya telah menyakiti orang lain dengan perkataan atau perbuatan?",
      "Apakah saya sudah menjalankan kewajiban saya sebagai seorang Katolik?",
    ],
  },
  {
    title: "Membuka Pengakuan Dosa",
    points: [
      "Setelah pastor memberi salam, umat memulai dengan tanda salib: 'Dalam nama Bapa, dan Putra, dan Roh Kudus. Amin.'",
      "Lalu umat berkata: 'Bapa, saya mengaku dosa. Sudah (sebutkan waktu) sejak pengakuan terakhir saya.'",
      "Jika ini adalah pertama kalinya mengaku dosa, bisa dikatakan: 'Ini adalah pengakuan dosa pertama saya.'",
      "Ucapkan: 'Bapa, dari saat terakhir saya menerima Sakramen Tobat sampai saat ini, saya sadari telah melakukan dosa-dosa dan oleh karena itu pada saat ini di hadapan Bapa saya mau mengaku kepada Allah Bapa Yang Mahakuasa dan kepada seluruh umat Allah yang kudus, bahwa saya telah berdosa dengan pikiran dan perkataan, dengan perbuatan dan kelalaian, khususnya bahwa saya telah berdosa: ……(sebutkan dosa anda dengan jujur).'",
    ],
  },
  {
    title:
      "Ucapkan: 'Saya sungguh menyesal atas semua dosa saya itu, dan dengan hormat saya meminta pengampunan serta penitensi yang berguna bagi saya.'",
  },
  {
    title:
      "Dengarkan nasihat imam dan penitensi yang diberikannya atas dosa kita.",
  },
  {
    title: "Ucapkan Doa Tobat (Act of Contrition)",
    points: [
      "Allah Yang Maharahim, aku menyesal atas dosa-dosaku. Sungguh patut Engkau hukum, terutama karena aku telah tidak setia kepada Engkau Yang Mahapengasih dan Mahabaik bagiku.Aku benci akan segala dosaku, dan berjanji dengan pertolongan rahmat-Mu hendak memperbaiki hidupku dan tidak akan berbuat dosa lagi. Allah Yang Mahamurah, ampunilah aku orang berdosa ini. Amin.",
    ],
  },
  {
    title: "Penerimaan Absolusi",
    points: [
      "Membuat tanda salib saat Imam memberikan absolusi (pengampunan).",
      "Mengucapkan terima kasih dan keluar dari ruang pengakuan.",
      "Melakukan apa yang menjadi penitensi yang telah diberikan imam dan berdoa 'Syukur Atas Pengampunan' (PS 27).",
    ],
  },
];

export default function Reconciliation() {
  return (
    <Header>
      <h1 className="text-2xl text-b200 font-bold">Tata Cara Sakramen Tobat</h1>

      <ul className="mt-5 px-5 list-decimal">
        {STEPS.map((step, i) => (
          <>
            <li key={i} className="text-md font-secondary mt-5">
              {step.title}
            </li>
            {step.points && (
              <ul className="px-5 list-disc">
                {step.points.map((point, i) => (
                  <li key={i} className="text-md font-secondary">
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </>
        ))}
      </ul>
    </Header>
  );
}
