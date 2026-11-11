# Arsitektur Website Portfolio — Penjelasan End to End

Dokumen ini menjelaskan cara kerja website portfolio ini dari ujung ke ujung:
apa yang terjadi saat seseorang membuka URL-nya, file apa saja yang ada dan
apa tugas masing-masing, bagaimana data mengalir dari file konten ke layar,
bagaimana proses build dan deploy berjalan, plus kelebihan dan kekurangan
stack yang dipakai. Ditulis untuk pemula — tidak ada istilah yang dipakai
tanpa dijelaskan.

> Semua yang dijelaskan di sini adalah yang benar-benar ada di project ini.
> Tidak ada fitur yang diada-adakan. Kalau ada bagian yang masih placeholder
> (misalnya kartu project), dokumen ini menyebutnya placeholder.

---

## 0. Ringkasan satu paragraf

Website ini adalah **satu halaman statis** (single page) yang dibuat dengan
**Next.js + React + TypeScript + Tailwind CSS**, dan di-hosting di **Vercel**.
Semua teks, skill, project, dan link tersimpan di **satu file data**
(`src/data/content.ts`). Saat project di-build, Next.js mengubah file React
menjadi file HTML + CSS + JavaScript biasa, lalu Vercel menyimpan file-file
itu di server-servernya di seluruh dunia (CDN/edge). Saat pengunjung membuka
URL, yang dikirim ke browsernya adalah file HTML statis itu — tidak ada
database, tidak ada server yang berjalan, tidak ada data yang diambil saat
itu juga. Karena itu situs ini cepat, murah (gratis di paket Hobby Vercel),
dan mudah dipahami.

---

## 1. Apa yang terjadi saat pengunjung membuka URL — end to end

Misalnya seseorang membuka `https://jereldavin-portfolio.vercel.app`
(nama URL persisnya ada di laporan deploy; bentuknya sama). Ini urutannya:

### 1.1. DNS — dari nama menjadi alamat server

1. Browser bertanya ke DNS: "alamat IP apa untuk
   `jereldavin-portfolio.vercel.app`?"
2. DNS menjawab dengan alamat server Vercel. Nama `*.vercel.app` memang
   dikelola Vercel, jadi tidak ada pengaturan DNS manual di sini.
3. Browser membuka koneksi HTTPS (terenkripsi) ke alamat itu.

### 1.2. Vercel Edge — server terdekat yang menjawab

4. Permintaan itu tidak sampai ke satu server pusat, melainkan ditangkap
   oleh **Vercel Edge Network** — jaringan server Vercel yang tersebar di
   banyak kota di dunia. Permintaan dilayani dari lokasi yang paling dekat
   dengan pengunjung (misalnya Singapura untuk pengunjung di Indonesia).
5. Karena halaman ini statis, Vercel tidak perlu menjalankan program apa pun
   untuk menjawab. Ia hanya mengambil file yang sudah jadi dari cache-nya
   dan mengirimkannya. Ini alasan utama situs ini cepat: tidak ada
   "menunggu server berpikir".

### 1.3. Yang diterima browser — HTML, CSS, JavaScript

6. Browser menerima tiga hal:
   - **HTML** — struktur halaman (judul, teks, daftar project) yang sudah
     jadi. HTML ini dibuat sekali saat build (lihat bagian 4), bukan dibuat
     ulang setiap ada pengunjung.
   - **CSS** — hasil kompilasi Tailwind: semua aturan tampilan (warna,
     jarak, ukuran huruf). File ini kecil karena Tailwind hanya menyertakan
     class yang benar-benar dipakai di halaman.
   - **JavaScript** — runtime kecil dari React dan Next.js (router dan
     hydration). Halaman ini tidak punya komponen interaktif (tidak ada
     `"use client"` di file mana pun), jadi JavaScript ini hanya menghidupkan
     kembali halaman yang sudah jadi (hydration) dan menangani navigasi
     antar-anchor (`#about`, `#skills`, dan seterusnya). Semua komponen
     adalah **Server Components** — mereka dirender di sisi build, bukan di
     browser.
7. Browser menampilkan halaman. Font Geist dimuat dari Google Fonts
   (diatur oleh `next/font/google`, dan dioptimasi Next.js). Gambar tidak
   ada di halaman ini selain monogram "JI" (huruf, bukan file gambar) —
   jadi tidak ada gambar yang perlu diunduh.

### 1.4. Navigasi di dalam halaman

8. Menu di atas (About, Skills, Projects, Education, Contact) adalah link
   anchor biasa (`href="#about"` dan seterusnya). Klik menu hanya
   menggeser halaman ke bagian itu — tidak ada permintaan baru ke server.
   Tombol "GitHub" membuka `https://github.com/Jereldavin` di tab baru.

---

## 2. Struktur project, file demi file

```
portfolio/
├── package.json            — daftar dependency + perintah npm
├── package-lock.json       — versi persis setiap dependency (hasil install)
├── next.config.ts          — konfigurasi Next.js
├── tsconfig.json           — konfigurasi TypeScript
├── eslint.config.mjs       — aturan lint (pemeriksaan gaya/kesalahan kode)
├── next-env.d.ts           — file yang dibuat otomatis oleh Next.js (jangan edit)
├── README.md               — README bawaan create-next-app
├── AGENTS.md               — catatan bawaan Next.js 16 untuk AI agent
├── ARCHITECTURE.md         — dokumen ini
├── public/
│   └── (kosong, siap diisi) — taruh foto di sini, mis. public/photo.jpg
├── src/
│   ├── app/
│   │   ├── layout.tsx      — kerangka HTML: <html>, font, metadata, <body>
│   │   ├── page.tsx        — halaman utama: merangkai semua section
│   │   ├── globals.css     — design system: warna, font, animasi, hover
│   │   └── favicon.ico     — ikon kecil di tab browser
│   ├── components/
│   │   ├── Nav.tsx         — bar navigasi atas (tetap di atas saat scroll)
│   │   ├── Hero.tsx        — layar pertama: nama, jabatan, tagline, foto/monogram
│   │   ├── About.tsx       — bagian About + diagram alur pipeline
│   │   ├── Skills.tsx      — tiga grup skill (Data Engineering, AI & ML, Tools)
│   │   ├── Projects.tsx    — grid 6 kartu project (saat ini placeholder)
│   │   ├── Education.tsx   — timeline pendidikan/pengalaman
│   │   └── Contact.tsx     — kartu kontak (GitHub, email, LinkedIn) + footer
│   └── data/
│       └── content.ts      — ★ SATU-SATUNYA file yang perlu diedit untuk isi
```

### 2.1. File konfigurasi (jarang disentuh)

- **`package.json`** — identitas project (`"name": "portfolio"`) dan empat
  perintah: `dev` (jalan lokal), `build` (build produksi), `start`
  (jalankan hasil build), `lint` (cek kesalahan). Dependency utama:
  `next` 16.4.5, `react` 19.3.0, `react-dom` 19.3.0. DevDependency:
  `tailwindcss` 4, `@tailwindcss/turbopack`, `typescript` 5, `eslint` 9.
- **`next.config.ts`** — konfigurasi Next.js. Isinya hanya dua pengaturan
  bawaan dari `create-next-app`: `cacheComponents: true` dan
  `partialPrefetching: true` (fitur Next.js 16 untuk prerender sebagian
  halaman — untuk halaman statis seperti ini efeknya praktis nol, tapi
  dibiarkan apa adanya karena itu default scaffold). Tidak ada
  `output: "export"` — project memakai build Next.js standar, dan Vercel
  yang menjalankannya.
- **`tsconfig.json`** — pengaturan TypeScript (`strict: true`, alias
  `"@/*"` menunjuk ke `./src/*`, jadi `import ... from "@/data/content"`
  artinya `src/data/content.ts`).
- **`eslint.config.mjs`** — aturan lint bawaan Next.js.
- **`next-env.d.ts`** — dibuat otomatis oleh Next.js saat build/dev; jangan
  diedit manual.
- **`AGENTS.md`** — file bawaan Next.js 16 yang mengingatkan AI agent bahwa
  versi ini punya breaking changes dan menyuruh membaca panduan di
  `node_modules/next/dist/docs/` sebelum menulis kode.

### 2.2. `src/app/` — kerangka dan halaman

- **`layout.tsx`** — membungkus semua halaman. Tugasnya: membuat tag
  `<html lang="en">`, memuat font Geist dan Geist Mono lewat
  `next/font/google`, menyuntikkan `globals.css`, dan mengisi metadata
  (judul tab, deskripsi, Open Graph). Ada juga dua meta dari skill desain:
  `page-type` dan `site-kind` bernilai `software`. `layout.tsx` tidak
  menampilkan konten apa pun — konten ada di `page.tsx`.
- **`page.tsx`** — komponen `Home()`. Isinya hanya merangkai komponen:
  `<Nav />`, `<main>` berisi `<Hero />`, `<About />`, `<Skills />`,
  `<Projects />`, `<Education />`, `<Contact />`. Tidak ada logika di sini;
  kalau mau mengubah urutan section, ubah urutan baris di file ini.
- **`globals.css`** — design system dalam satu file:
  - `@import "tailwindcss"` — memuat Tailwind v4.
  - Blok `@theme` — token desain: warna (`paper` #0a0a0a, `surface`
    abu-abu gelap #171717, `ink` #f5f4f0, `muted` #a3a29c, `line` #2a2a28, `accent`
    hijau terang #2fbf71), dan font (Geist Sans dan Geist Mono). Class
    Tailwind seperti `bg-paper`, `text-ink`, `border-line`, `bg-accent`
    lahir dari token ini.
  - Animasi `enter` — hero masuk sekali saat halaman dimuat
    (`data-enter` dengan jeda 0 / 0,08 / 0,16 / 0,24 detik). Tidak ada
    animasi saat scroll: itu sengaja, sesuai aturan skill desain.
  - Micro-interaction hover: kartu terangkat 2px (`.card-link`), tombol
    naik 1px saat hover dan kembali saat ditekan (`.btn`), link navigasi
    menggaris-bawahi secara animasi (`.nav-link`).
  - `.placeholder-frame` — latar titik-titik untuk frame foto placeholder.
  - `prefers-reduced-motion` — kalau pengguna mematikan animasi di sistem,
    semua animasi dimatikan.

### 2.3. `src/components/` — satu file per section

Setiap komponen adalah **Server Component** (tidak ada `"use client"`):
dirender sekali saat build menjadi HTML, dan tidak membawa JavaScript
interaktif sendiri.

- **`Nav.tsx`** — bar atas yang tetap terlihat saat scroll (`fixed`).
  Isi: monogram "JI" + nama (link ke `#top`), link-link section dari
  `content.ts`, dan tombol GitHub (warna accent). Di layar kecil, link
  section disembunyikan (hanya nama + GitHub) — sengaja, supaya bar tetap
  rapi di HP.
- **`Hero.tsx`** — layar pertama, tinggi satu layar penuh (`min-h-screen`).
  Isi: lokasi (Jakarta, Indonesia), nama besar, jabatan
  ("Data & AI"), tagline, dua tombol (View projects →
  `#projects`, dan GitHub). Di kanan ada **slot foto**: kalau
  `profile.photo` di `content.ts` masih kosong, tampil monogram "JI" dan
  teks "Add your photo in src/data/content.ts"; kalau sudah diisi
  (misalnya `"/photo.jpg"`), tampil foto 320×400 dengan komponen
  `next/image`.
- **`About.tsx`** — dua paragraf dari `content.ts`, plus diagram alur
  pipeline (Sources → Ingest → Transform → Store → Serve) sebagai daftar
  bernomor vertikal dengan garis penghubung. Diagram ini murni HTML/CSS —
  bukan gambar.
- **`Skills.tsx`** — tiga kartu grup skill dari `content.ts`. Setiap skill
  jadi chip; skill yang sedang dipelajari (LLMs, RAG) membawa label kecil
  "learning". Grup "AI & ML" membawa badge "Learning".
- **`Projects.tsx`** — grid 3 kolom (2 di tablet, 1 di HP) berisi 6 kartu
  dari `content.ts`. Setiap kartu: frame foto placeholder (latar
  titik-titik + teks "Add your project photo"), badge "Coming soon",
  judul, deskripsi, tag teknologi, dan catatan "Add this project in
  src/data/content.ts". Kalau suatu project sudah punya `link`, kartunya
  berubah menjadi link yang bisa diklik (membuka di tab baru).
- **`Education.tsx`** — daftar timeline dari `content.ts`: kolom kiri
  periode ("Present", "Add a date"), kolom kanan judul, tempat, deskripsi.
  Entri placeholder membawa badge "Placeholder".
- **`Contact.tsx`** — tiga kartu: GitHub (link asli, bisa diklik), Email
  dan LinkedIn (placeholder, masing-masing berlabel "Placeholder" dan
  catatan file mana yang harus diedit). Di bawahnya ada footer: copyright
  2026, "Built with Next.js & Tailwind CSS", dan link GitHub.

### 2.4. `src/data/content.ts` — satu-satunya file isi

Semua konten situs tinggal di sini: `profile` (nama, jabatan, tagline,
foto, inisial, lokasi), `about` (paragraf + langkah pipeline), `skillGroups`
(tiga grup skill), `projects` (6 placeholder), `timeline` (2 entri),
`contact` (GitHub asli; email dan LinkedIn placeholder), dan `nav`
(daftar link menu). Komponen tidak menyimpan teks sendiri — mereka hanya
membaca dari file ini. Karena itu, mengubah isi situs = mengedit file ini
saja. Bagian atas file ini berisi komentar cara menambah foto dan project.

### 2.5. `public/` — file statis

Saat ini kosong (selain `favicon.ico` di `src/app/`). Foto yang ditambahkan
nanti ditaruh di sini, misalnya `public/photo.jpg`, lalu dirujuk sebagai
`"/photo.jpg"` di `content.ts`. File di `public/` disajikan apa adanya
oleh Vercel di URL root (`/photo.jpg`).

---

## 3. Aliran data: dari file konten ke layar

Tidak ada database dan tidak ada API. Alirannya lurus satu arah:

```
src/data/content.ts            (satu sumber kebenaran: semua teks & data)
        │
        ▼  di-import oleh komponen
src/components/*.tsx           (Nav, Hero, About, Skills, Projects, ...)
        │
        ▼  dirangkai oleh
src/app/page.tsx               (Home: Nav + main + semua section)
        │
        ▼  dibungkus oleh
src/app/layout.tsx             (html, font, metadata, globals.css)
        │
        ▼  saat `next build`
.next/ (hasil build)           HTML + CSS + JS per halaman, sudah jadi
        │
        ▼  saat deploy ke Vercel
Vercel Edge / CDN              file statis disalin ke server di banyak kota
        │
        ▼  saat pengunjung membuka URL
Browser                        menerima HTML jadi, menampilkan halaman
```

Contoh konkret — satu kartu project:

1. Kamu menulis objek project di `projects` dalam `content.ts` (judul,
   deskripsi, tags, link).
2. `Projects.tsx` mengimpor `projects` dari `@/data/content` dan melakukan
   `projects.map(...)` — satu kartu per objek.
3. Saat `next build`, Next.js menjalankan komponen itu dan menghasilkan
   HTML final untuk keenam kartu.
4. HTML itu disimpan di Vercel dan dikirim apa adanya ke setiap pengunjung.

Artinya: **tidak ada yang dihitung saat pengunjung membuka halaman.**
Semua sudah dihitung di langkah 3. Ini yang disebut **Static Site
Generation (SSG)** — halaman di-generate sekali saat build.

### Kenapa tidak ada state, API, atau database?

Karena situs ini tidak membutuhkannya. Tidak ada form, tidak ada login,
tidak ada komentar, tidak ada konten yang berubah per pengunjung. Menambah
database untuk situs seperti ini hanya menambah biaya, kerumitan, dan
permukaan serangan — tanpa manfaat. Kalau suatu hari butuh form kontak
atau blog, barulah ditambahkan (dan dokumen ini harus diperbarui).

---

## 4. Pipeline build dan deploy

### 4.1. Menjalankan lokal (development)

```bash
cd ~/workspace/portfolio
npm install        # sekali saja, atau setiap package.json berubah
npm run dev        # jalan di http://localhost:3000
```

`next dev` menjalankan server pengembangan dengan **Turbopack**: setiap
kamu menyimpan file, browser me-refresh otomatis (Fast Refresh). Ini
tempat mengedit dan melihat hasilnya secara langsung.

### 4.2. Build produksi (lokal)

```bash
npm run build
```

Yang terjadi di balik perintah ini:

1. **TypeScript check** — `tsc` memeriksa semua file `.ts`/`.tsx`.
   Kalau ada tipe yang salah, build gagal di sini.
2. **Lint** — ESLint memeriksa gaya dan kesalahan umum.
3. **Compile** — Turbopack mengubah TSX + Tailwind menjadi JavaScript dan
   CSS produksi (di-minify, dan Tailwind hanya menyertakan class yang
   dipakai).
4. **Collect page data & prerender** — Next.js menjalankan `page.tsx`
   sekali dan menulis HTML final untuk `/` (dan `/_not-found`) ke folder
   `.next/`. Di output build ini terlihat sebagai `○ /` — artinya
   "Static, prerendered as static content".

Hasil build yang terakhir dijalankan di mesin ini: **Compiled successfully**,
halaman `/` berstatus Static. Folder `.next/` dan `node_modules/` tidak
ikut di-deploy — Vercel membangun ulang dari source.

### 4.3. Deploy ke Vercel (cara yang dipakai di sini)

Deploy dilakukan **tanpa Git** (integrasi GitHub belum dipasang di akun
Vercel ini), lewat API Vercel:

1. **Buat project baru** — `create_project` dengan nama
   `jereldavin-portfolio`, framework `nextjs`, di dalam tim yang sama
   dengan project `pawstay` (team `team_5ieAhLMohTJ3El4JPiKMFjoy`).
2. **Kirim file source** — `create_deployment` dengan seluruh file source
   (package.json, next.config.ts, tsconfig.json, src/, public/, dan
   lain-lain; **tanpa** `node_modules/`, `.next/`, dan
   `package-lock.json`) di-inline dalam request, plus `projectSettings`
   (`framework: nextjs`, `buildCommand: next build`,
   `installCommand: npm install`) dan `target: production`.
3. **Vercel membangun** — di server Vercel: `npm install` (mengunduh
   dependency), lalu `npm run build` (langkah yang sama seperti 4.2).
   Build berjalan asinkron; statusnya dicek lewat `get_deployment` dan
   log-nya lewat `list_deployment_events`.
4. **Publish** — kalau build sukses, Vercel menyalin hasil build ke Edge
   Network dan memberikan URL, misalnya
   `https://jereldavin-portfolio.vercel.app`. URL dicek dengan `curl`:
   harus mengembalikan HTTP 200 dan HTML-nya mengandung nama
   "Jereldavin Igvander".

### 4.4. Bagaimana edit sampai ke situs live?

```
Edit src/data/content.ts  →  simpan
        │
        ▼  (deploy ulang: kirim file terbaru lewat create_deployment)
Vercel: npm install → npm run build → HTML baru
        │
        ▼
Edge Network: file lama diganti file baru (cache diperbarui)
        │
        ▼
Pengunjung berikutnya melihat versi baru
```

Penting: **mengedit file di laptop/VM saja tidak mengubah situs live.**
Situs live hanya berubah setelah deploy ulang. Ini berbeda dengan Git-based
deploy (kalau nanti repo GitHub dihubungkan ke Vercel, setiap `git push`
akan men-deploy otomatis — tapi itu belum diatur di sini).

---

## 5. Kelebihan dan kekurangan tiap pilihan stack

Jujur, bukan promosi. Setiap pilihan punya harga.

### 5.1. Next.js (App Router)

**Kelebihan:**
- **Static generation bawaan** — halaman seperti ini jadi HTML statis
  otomatis; tidak perlu mengatur static site generator terpisah.
- **Routing berbasis file** — menambah halaman = menambah file di `src/app/`.
  Tidak ada router yang dikonfigurasi manual.
- **Optimasi bawaan** — font (`next/font`), gambar (`next/image`),
  dan kompilasi sudah diatur.
- **Standar industri** — skill yang dicari pemberi kerja; project ini
  sekaligus jadi bahan belajar yang relevan dengan tujuanmu menjadi AI
  Engineer (banyak tool AI modern memakai Next.js).

**Kekurangan:**
- **Terlalu besar untuk satu halaman statis.** HTML + CSS + JS murni
  (tanpa framework) bisa melakukan hal yang sama dengan file sepersepuluh
  ukurannya dan tanpa build step. Next.js di sini dipilih karena
  kamu mau belajar React/Next.js — bukan karena situs ini membutuhkannya.
- **Build step wajib.** Tidak bisa sekadar membuka file HTML di browser;
  harus `npm install` + `npm run build` dulu. Kalau Node rusak atau
  dependency berubah, build bisa gagal.
- **Abstraksi yang bergerak cepat.** Next.js 16 (versi di sini) punya
  breaking changes dari versi lama (lihat `AGENTS.md` di project) —
  tutorial lama belum tentu cocok.

### 5.2. React

**Kelebihan:**
- **Komponen** — satu section = satu file; mudah dibaca, diubah, dan
  dipakai ulang. Data mengalir lewat props/import biasa.
- **Ekosistem besar** — hampir semua masalah React sudah pernah dijawab
  orang lain.

**Kekurangan:**
- **JavaScript wajib untuk hal sederhana.** Halaman ini sebenarnya bisa
  ditulis sebagai HTML biasa tanpa JavaScript sama sekali; React menambah
  runtime JS (kecil, tapi ada) hanya untuk merender konten statis.
- **Kurva belajar** — JSX, props, hooks, Server vs Client Components
  adalah konsep yang harus dipelajari sebelum bisa mengubah situs dengan
  percaya diri.

### 5.3. TypeScript

**Kelebihan:**
- **Menangkap kesalahan sebelum jalan** — salah ketik nama field di
  `content.ts` langsung ketahuan saat build, bukan saat pengunjung membuka
  situs. Tipe `Project`, `SkillGroup`, dan `TimelineEntry` di `content.ts`
  adalah contohnya: kalau kamu mengisi project tanpa `title`, build gagal
  dengan pesan yang jelas.
- **Autocompletion** — editor memberi saran field yang tersedia saat
  mengedit `content.ts`.

**Kekurangan:**
- **Lebih banyak yang harus ditulis** — tipe, interface, dan anotasi.
  Untuk situs sekecil ini, JavaScript biasa sudah cukup; TypeScript di
  sini adalah investasi belajar, bukan kebutuhan.

### 5.4. Tailwind CSS v4

**Kelebihan:**
- **Cepat menulis tampilan** — `flex`, `px-6`, `text-lg` langsung di
  markup, tanpa pindah-pindah file CSS.
- **Hasil akhir kecil** — Tailwind hanya menyertakan class yang dipakai.
- **Design token di satu tempat** — warna dan font didefinisikan sekali
  di `@theme` dalam `globals.css`; ganti satu baris, seluruh situs ikut.

**Kekurangan:**
- **Markup jadi ramai** — class yang panjang membuat JSX lebih sulit
  dibaca sepintas dibanding CSS biasa.
- **Perlu hafal nama class** — `py-24 sm:py-32` dan sejenisnya adalah
  kosakata yang harus dihafal; pemula sering bolak-balik membuka
  dokumentasi.

### 5.5. Vercel

**Kelebihan:**
- **Gratis untuk project pribadi** (paket Hobby) — hosting, HTTPS, dan
  CDN sudah termasuk, tanpa kartu.
- **Nol konfigurasi untuk Next.js** — Vercel dibuat oleh pembuat Next.js,
  jadi build dan deploy-nya langsung cocok.
- **Edge Network** — situs disajikan dari server terdekat pengunjung.

**Kekurangan:**
- **Vendor lock-in (ringan).** Project ini memakai fitur standar Next.js
  saja, jadi pindah ke host lain (misalnya Netlify atau Cloudflare Pages)
  masih mungkin — tapi konfigurasi deploy-nya harus ditulis ulang.
- **Deploy tanpa Git di sini masih manual.** Setiap perubahan butuh deploy
  ulang lewat API (lihat 4.3). Menghubungkan repo GitHub akan membuat
  deploy otomatis setiap push — tapi itu butuh instalasi integrasi GitHub
  di dashboard Vercel, yang belum dilakukan.
- **Batas paket gratis.** Paket Hobby cukup untuk portfolio, tapi ada
  batas bandwidth dan build yang kalau terlampaui akan diminta upgrade.
  Untuk situs statis sekecil ini, batas itu praktis tidak akan tersentuh.

### 5.6. Satu file konten (`content.ts`)

**Kelebihan:**
- **Satu tempat untuk semua isi** — tidak perlu mencari-cari di komponen.
- **Aman dari kesalahan tampilan** — mengedit teks tidak bisa merusak
  layout (selama tipenya benar).

**Kekurangan:**
- **Tidak scalable untuk banyak konten.** Kalau project-mu jadi 50 buah
  atau ada blog, satu file akan membengkak; saat itu barulah pindah ke
  CMS atau file Markdown per project.

---

## 6. Cara mereplikasi dari nol — langkah demi langkah

Ikuti urutan ini untuk membuat salinan yang sama persis dari folder kosong
sampai live di Vercel. Perintah diuji di Node 24.

### 6.1. Prasyarat

```bash
node --version   # butuh Node 20+ (di sini Node 24)
npm --version
```

### 6.2. Scaffold project

```bash
npx --yes create-next-app@latest portfolio \
  --typescript --tailwind --eslint --app --src-dir \
  --import-alias "@/*" --use-npm
cd portfolio
```

Ini membuat project Next.js + TypeScript + Tailwind + App Router dengan
folder `src/`. (Versi yang terpasang di sini: Next.js 16.4.5, React 19.3,
Tailwind v4.)

### 6.3. Ganti isi dengan file-file situs ini

Salin dari project ini (atau tulis ulang mengikuti strukturnya):

- `src/data/content.ts` — semua isi (satu-satunya file konten).
- `src/app/layout.tsx` — metadata + font.
- `src/app/page.tsx` — rangkai semua section.
- `src/app/globals.css` — design system (token warna/font, animasi, hover).
- `src/components/*.tsx` — Nav, Hero, About, Skills, Projects,
  Education, Contact.

### 6.4. Jalankan lokal

```bash
npm install
npm run dev
# buka http://localhost:3000
```

Ubah `src/data/content.ts`, simpan, dan lihat perubahan langsung di
browser (Fast Refresh).

### 6.5. Build dan cek

```bash
npm run build
# harus berakhir "Compiled successfully" dan route "/" berstatus Static (○)
```

Kalau gagal, baca pesan error-nya: biasanya salah ketik nama field di
`content.ts` atau import yang salah jalan. Perbaiki, build lagi.

### 6.6. Deploy ke Vercel (tanpa Git)

Cara ini memakai Vercel MCP/CLI yang sudah terhubung ke akunmu
(`tostoogaming@gmail.com`). Langkahnya:

1. Buat project baru bernama `jereldavin-portfolio` (framework `nextjs`).
2. Deploy file source (tanpa `node_modules/`, `.next/`,
   `package-lock.json`) dengan `buildCommand: next build` dan
   `installCommand: npm install`, target `production`.
3. Tunggu build selesai, lalu cek URL hasil deploy.

Alternatif yang lebih umum (kalau nanti kamu menghubungkan GitHub):
push project ke repo GitHub, lalu di dashboard Vercel pilih
"Add New Project" → import repo → Deploy. Setiap `git push` setelah itu
akan men-deploy otomatis.

### 6.7. Verifikasi situs live

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://jereldavin-portfolio.vercel.app
# harus 200
curl -s https://jereldavin-portfolio.vercel.app | grep -o "Jereldavin Igvander" | head -1
# harus menemukan namamu di HTML
```

### 6.8. Menambah project, foto, atau deskripsi (setelah live)

1. **Foto:** simpan fotomu sebagai `public/photo.jpg`, lalu di
   `src/data/content.ts` ubah `photo: ""` menjadi `photo: "/photo.jpg"`.
2. **Project:** di `content.ts`, salin satu objek placeholder di array
   `projects`, isi `title`, `description`, `tags`, dan `link` (URL repo
   atau demo), lalu ubah `placeholder: true` menjadi `false`. Hapus
   placeholder yang tidak dipakai.
3. **Deskripsi/teks lain:** edit string di `content.ts` langsung.
4. **Cek lokal:** `npm run dev`, buka `http://localhost:3000`.
5. **Deploy ulang** (langkah 6.6) — situs live berubah hanya setelah
   deploy ulang.

---

## 7. Yang TIDAK ada di situs ini (supaya tidak dicari-cari)

- Tidak ada database, API route, atau form (tidak ada `src/app/api/`).
- Tidak ada autentikasi/login.
- Tidak ada analytics atau pelacak pengunjung.
- Tidak ada gambar/foto asli (hanya monogram "JI" dan frame placeholder).
- Tidak ada animasi saat scroll, tidak ada carousel, tidak ada mode gelap.
- Tidak ada halaman selain `/` (satu halaman, enam section).
- Tidak ada JavaScript interaktif buatan sendiri — tidak ada `"use client"`,
  tidak ada `useState`/`useEffect` di file mana pun. Satu-satunya
  JavaScript yang dikirim adalah runtime React/Next.js.
