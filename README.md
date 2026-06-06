<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/brain-circuit.svg" alt="StudyCircle Logo" width="120" height="120" />
  
  # StudyCircle 🎓✨

  **Platform Koordinasi Study Group dengan AI Schedule Optimizer**

  [![React](https://img.shields.io/badge/React-19.0+-61DAFB?logo=react&logoColor=black)](#)
  [![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)](#)
  [![Vite](https://img.shields.io/badge/Vite-PWA_Ready-646CFF?logo=vite&logoColor=white)](#)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?logo=tailwind-css&logoColor=white)](#)
  [![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=nodedotjs&logoColor=white)](#)
  [![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white)](#)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql&logoColor=white)](#)
  [![Socket.io](https://img.shields.io/badge/Socket.io-Realtime-010101?logo=socketdotio&logoColor=white)](#)
  
  <br />
  <i>Tugas Mata Kuliah Pemrograman Web Lanjutan</i>
</div>

<br />

> **StudyCircle** adalah platform kolaborasi edukatif berskala *enterprise* yang dirancang untuk mengatasi hambatan koordinasi mahasiswa dalam membentuk kelompok belajar. Memanfaatkan arsitektur *event-driven* (*real-time*) dan algoritma *heuristic scoring* (AI), platform ini menyediakan ekosistem terpadu (*end-to-end*)—mulai dari pencocokan grup cerdas, optimalisasi jadwal pertemuan multi-zona waktu, hingga ruang rapat virtual terintegrasi.

---

## 👥 Tim Pengembang (Kelompok 4)

Proyek ini dirancang dan dikembangkan dengan standar industri oleh:

| Nama | NIM | Tanggung Jawab Utama |
| :--- | :--- | :--- |
| **Imam Dzaqhoir** | `H071241048` | *Fullstack Engineer & AI Integrator* - Merancang algoritma *heuristic matching* dan arsitektur *backend*. |
| **Muh. Hanif Nurmahdin** | `H071241033` | *Frontend Developer & UI/UX Designer* - Mengembangkan antarmuka *glassmorphism* modern dan responsif. |
| **Haris** | `H071241070` | *Backend Developer & Database Architect* - Mendesain skema basis data relasional (Prisma) dan optimasi *query*. |

---

## ✨ Fitur Unggulan (Core Features)

### 🤖 1. AI-Powered Matching & Schedule Optimizer
Pendekatan algoritmik untuk menyelesaikan konflik penjadwalan komunal.
- **Smart Group Recommendation**: Menggunakan *weighted heuristic scoring* untuk merekomendasikan grup belajar berdasarkan kompatibilitas **Gaya Belajar (Learning Style)** dan **Zona Waktu (Timezone)**, memaksimalkan probabilitas keaktifan grup.
- **AI Schedule Optimizer**: Menganalisis kalender historis anggota grup, irisan ketersediaan, dan preferensi zona waktu untuk mengkalkulasi dan menyarankan slot waktu diskusi paling optimal secara asinkron.

### 🎥 2. Terintegrasi Virtual Room (Jitsi WebRTC)
Kolaborasi *real-time* *frictionless* tanpa dependensi aplikasi luar.
- Ruang rapat (*video call* / *screen sharing*) dimuat langsung ke dalam sesi aplikasi menggunakan **Jitsi React SDK**.
- Pembuatan token kamar (*room hash*) yang aman secara otomatis berdasarkan entitas `Session ID`, mencegah penyusup (*unauthorized entry*).

### 🎮 3. Sistem Gamifikasi (Learn & Earn)
Membangun metrik *retention* pengguna melalui sistem *reward*.
- **EXP & Leveling Engine**: Menghitung waktu partisipasi sesi pengguna dan mengonversinya menjadi *Experience Points*.
- **Global Leaderboard**: Agregasi metrik performa (*study hours*, *attendance rate*) untuk menampilkan peringkat kompetitif.

### ⚡ 4. Real-Time Event Architecture (Socket.io)
Sistem notifikasi latensi rendah dengan koneksi *WebSocket* persisten.
- **Live Group Chat**: Pesan dikirimkan secara instan (*bi-directional*) di dalam masing-masing ruang lingkup *study group*.
- **In-App Push Notifications**: Notifikasi proaktif setiap kali terdapat aktivitas krusial (jadwal baru, undangan, perubahan status sesi).

### 📱 5. Progressive Web App (PWA) & Offline-Ready
Pengalaman setara aplikasi *native* dengan manajemen *Service Worker*.
- Dapat diinstal (A2HS) langsung dari *browser*.
- Mekanisme *caching* statis untuk mempertahankan keandalan akses pada kondisi konektivitas jaringan yang tidak stabil.

---

## 🛠️ Arsitektur & Teknologi

Repositori ini mengadopsi pola arsitektur **Monorepo-style separation** (Backend dan Frontend terpisah secara modular).

### Frontend (Client-Side)
- **Framework**: `React v19` berbasis `Vite` (Sangat optimal untuk *Fast Refresh*).
- **Language**: `TypeScript` (*Strict Mode* aktif).
- **Styling**: `Tailwind CSS v4` terkonfigurasi kustom dengan palet warna premium dan efek *glassmorphism*.
- **State Management**: `@tanstack/react-query` untuk *data fetching*, sinkronisasi, dan manajemen *cache* API.
- **Routing**: `react-router-dom` v7.

### Backend (Server-Side)
- **Runtime**: `Node.js` dengan `Express.js`.
- **Language**: `TypeScript` dengan *Object-Oriented Controller-Service-Repository pattern*.
- **Database ORM**: `Prisma Client` (Manajemen migrasi deklaratif berbasis `schema.prisma`).
- **Database Engine**: `PostgreSQL` (Relasional dengan *foreign key constraints* yang ketat).
- **Security**: Autentikasi JWT (JSON Web Tokens) tersimpan dalam *HttpOnly Cookies*, *Bcrypt* *hashing*, dan CORS terkonfigurasi.
- **Media Storage**: Integrasi API `Cloudinary` untuk penyimpanan *cloud* gambar/dokumen.

---

## 🚀 Panduan Instalasi Lokal (Developer Setup)

Berikut adalah tata cara menjalankan **StudyCircle** di lingkungan pengembangan lokal (*development environment*).

### Prasyarat (*Prerequisites*)
Pastikan mesin Anda telah menginstal utilitas berikut:
- **Node.js** (v18.x LTS atau lebih baru)
- **Git** (CLI)
- Akses ke server **PostgreSQL** lokal maupun *cloud* (seperti Neon/Supabase).
- Akun **Cloudinary** (Untuk kredensial penyimpanan gambar).

### Langkah 1: Kloning Repositori
```bash
git clone https://github.com/ShinZeleo/StudyCircle.git
cd StudyCircle
```

### Langkah 2: Konfigurasi Backend
```bash
cd backend

# Instalasi dependensi
npm install

# Buat berkas environment
cp .env.example .env
```
👉 Buka berkas `.env` dan konfigurasikan parameter berikut:
- `DATABASE_URL` = (URI koneksi PostgreSQL Anda)
- `JWT_SECRET` = (String acak rahasia untuk enkripsi token)
- `CLOUDINARY_*` = (Kredensial API dari *dashboard* Cloudinary)
- `FRONTEND_URL` = `http://localhost:5173`

```bash
# Lakukan sinkronisasi skema database
npx prisma db push

# (Opsional) Injeksi data dummy untuk keperluan testing
npx prisma db seed

# Jalankan server API di mode development
npm run dev
```
> Server API akan berjalan pada `http://localhost:3000`.

### Langkah 3: Konfigurasi Frontend
Buka *tab* terminal baru, lalu navigasi ke direktori frontend:
```bash
cd frontend

# Instalasi dependensi frontend
npm install

# Sesuaikan endpoint API (Bila diperlukan)
cp .env.example .env
```
👉 Pastikan `.env` memiliki `VITE_API_URL=http://localhost:3000/api/v1`

```bash
# Eksekusi server Vite
npm run dev
```
> Aplikasi Client akan dapat diakses secara lokal pada `http://localhost:5173`.

---

## 🗃️ Konvensi Kode (*Code Conventions*)
- Penggunaan prinsip **KISS** (Keep It Simple, Stupid) dan **DRY** (Don't Repeat Yourself).
- **Commit Message**: Mengikuti spesifikasi *Conventional Commits* (contoh: `feat: add AI matching module`, `fix: resolve JWT parsing error`).

---

<div align="center">
  <p>Didesain secara khusus untuk <b>Universitas Hasanuddin</b> <br />
  &copy; {new Date().getFullYear()} Tim Kelompok 4 - Pemrograman Web Lanjutan.</p>
</div>
