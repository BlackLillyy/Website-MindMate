# MindMate 🌿
### Student Mental Health Monitoring Web Application

MindMate adalah aplikasi berbasis web yang dirancang untuk membantu mahasiswa memantau kondisi kesejahteraan mental, mengenali perubahan suasana hati, serta mengelola aktivitas akademik secara lebih terstruktur.

Melalui berbagai fitur yang saling terintegrasi, MindMate menyediakan ruang bagi mahasiswa untuk melakukan refleksi diri, memantau perjalanan suasana hati, dan memperoleh informasi seputar kesehatan mental.

> **Note:** MindMate merupakan proyek pengembangan aplikasi berbasis web. Fitur pemantauan dan peringatan di dalamnya ditujukan sebagai alat refleksi awal, bukan sebagai alat diagnosis atau pengganti konsultasi profesional.

---

## ✨ Features

### 1. Dashboard
Halaman utama yang menampilkan ringkasan aktivitas dan kondisi pengguna, termasuk akses cepat ke berbagai fitur MindMate.

### 2. Self-Assessment
Fitur penilaian mandiri untuk membantu pengguna merefleksikan kondisi dan perasaan yang sedang dialami.

### 3. Mood Tracker
Fitur pencatatan suasana hati harian yang memungkinkan pengguna menyimpan mood dan catatan pribadi.

### 4. Academic Workload
Fitur pengelolaan tugas akademik yang mencakup:
- Menambahkan tugas.
- Mengatur mata kuliah dan deadline.
- Menentukan prioritas tugas.
- Memantau status penyelesaian tugas.

### 5. Stress Radar
Fitur visualisasi indikator aktivitas yang diambil dari catatan mood dan tugas akademik pengguna.

### 6. Mental Health Journey
Fitur yang menyajikan rangkuman perjalanan suasana hati dan progres akademik pengguna dalam periode tertentu.

### 7. Early Warning
Fitur pengingat berbasis aturan sederhana untuk membantu pengguna memperhatikan pola mood dan beban tugas yang tercatat.

### 8. Articles & Tips
Halaman informasi yang menyediakan artikel seputar kesehatan mental, kehidupan akademik, self-care, dan produktivitas.

### 9. Counseling Service
Halaman informasi layanan konseling yang dilengkapi formulir permintaan layanan sebagai bagian dari prototipe.

### 10. Profile
Fitur untuk melihat dan memperbarui informasi profil pengguna, seperti nama dan email.

### 11. Settings
Fitur pengaturan preferensi pengguna, termasuk pilihan tampilan dark mode.

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Struktur halaman web |
| CSS3 | Styling dan layout antarmuka |
| JavaScript | Interaksi dan pengelolaan data |
| Bootstrap | Framework pendukung antarmuka |
| Chart.js | Visualisasi data |
| Local Storage | Penyimpanan data pada browser |

---

## 📁 Project Structure

```text
MindMate/
│
├── css/
│   ├── assessment.css
│   ├── mood-tracker.css
│   ├── workload.css
│   ├── stress-radar.css
│   ├── mental-health-journey.css
│   ├── early-warning.css
│   ├── articles.css
│   ├── counseling.css
│   ├── settings.css
│   └── profile.css
│
├── js/
│   ├── assessment.js
│   ├── mood-tracker.js
│   ├── workload.js
│   ├── stress-radar.js
│   ├── mental-health-journey.js
│   ├── early-warning.js
│   ├── articles.js
│   ├── counseling.js
│   ├── settings.js
│   └── profile.js
│
├── pages/
│   ├── assessment.html
│   ├── mood-tracker.html
│   ├── workload.html
│   ├── stress-radar.html
│   ├── journey.html
│   ├── early-warning.html
│   ├── articles.html
│   ├── counseling.html
│   ├── settings.html
│   └── profile.html
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## 🚀 Getting Started

1. Clone atau unduh repository MindMate.
2. Buka folder proyek menggunakan Visual Studio Code.
3. Jalankan file `index.html` menggunakan ekstensi **Live Server**.
4. Aplikasi akan terbuka di browser.

---

## 💾 Data Storage

Pada tahap pengembangan saat ini, MindMate menggunakan **Browser Local Storage** untuk menyimpan beberapa data pengguna.

Data yang disimpan meliputi:
- Mood history.
- Academic tasks.
- Counseling requests.
- Informasi profil pengguna.
- Preferensi pengguna, termasuk pengaturan tampilan.

Data tersimpan secara lokal pada browser yang digunakan. Data tidak otomatis tersinkronisasi antarperangkat atau antarbrowser.

---

## ⚠️ Project Limitations

MindMate masih berada dalam tahap pengembangan prototipe. Beberapa keterbatasannya adalah:

- Belum menggunakan sistem autentikasi pengguna.
- Belum terintegrasi dengan database.
- Data masih disimpan menggunakan Local Storage.
- Formulir konseling belum terhubung dengan penyedia layanan konseling.
- Indikator Stress Radar dan Early Warning menggunakan aturan sederhana, bukan instrumen pengukuran klinis.
- Hasil Self-Assessment tidak dimaksudkan untuk memberikan diagnosis psikologis.
- Pengaturan preferensi dan profil masih bersifat lokal pada browser.

---

## 🔮 Future Development

Rencana pengembangan MindMate selanjutnya meliputi:

- Implementasi sistem registrasi dan login.
- Integrasi database menggunakan MySQL.
- Pengembangan backend menggunakan PHP.
- Penyempurnaan pengelolaan profil dan preferensi pengguna.
- Pengembangan admin dashboard.
- Integrasi layanan konseling.
- Peningkatan keamanan dan privasi data pengguna.

---

## 👩‍💻 Developer

**Alhayu Navisa Nuha**  
Informatics Engineering Student

---

## 📄 License

This project is developed for educational and academic purposes.
