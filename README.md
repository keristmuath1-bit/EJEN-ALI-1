# EJEN ALI: INTERACTIVE CINEMATIC PHYSICS WEB (KSSM BAB 1.1)

Sebuah pengalaman web sinematik interaktif berprestasi tinggi (*High-Performance Interactive Digital Film Web Experience*) untuk **Fizik Tingkatan 4 KSSM Bab 1.1: Pengukuran**.

Dibina dengan visual sinematik partikel kuantum 24fps 1080p, audio sintesis sci-fi, telemetri HUD bertaraf agensi rahsia M.A.T.A, dan penyegerakan narasi masa nyata seiring dengan video.

---

## 🚀 Ciri-Ciri Utama

1. **Peralihan Morphing Silky-Smooth (Zero Grain / Tanpa Kesan Berpasir)**:
   - Keseluruhan 6 syot video digabungkan secara lancar menggunakan teknik *alpha crossfade morphing* dengan kadar bingkai pawagam 24fps progressive.
   - Bebas daripada sebarang *dithering*, *pixelation*, atau kesan pasir.

2. **Pengoptimuman Prestasi Peranti Rendah (*Low-End Hardware Accelerated*)**:
   - Saiz video dioptimumkan ke 45 MB dengan penstriman *faststart*, membolehkan permulaan pantas tanpa masa menunggu lama.
   - Enjin tatal pintar (*Throttled RAF Seeking*) menghalang kelelahan pemprosesan (*decoder thrashing*) pada telefon pintar dan tablet bajet.

3. **Responsif Sepenuhnya (Telefon, Tablet, Desktop - Mod Menegak & Melintang)**:
   - **Telefon Mod Menegak (*Portrait*)**: Antara muka telemetri kad tunggal yang kemas dengan sasaran sentuhan mesra ibu jari (44px touch targets).
   - **Telefon Mod Melintang (*Landscape*)**: Reka bentuk padat automatik (`landscape-compact`) mengelakkan limpahan menegak.
   - **Tablet & Komputer Riba**: Susun atur bento grid 2 lajur dengan konsol radar interaktif dan simulasi daya Newton.

4. **Silibus Fizik SPM Bab 1.1**:
   - **Modul 01 • Genesis**: Pengenalan Pengukuran & 2 Syarat Kuantiti Fizik (Magnitud & Unit Piawai).
   - **Modul 02 • 7 Kuantiti Asas**: 7 kuantiti asas SI & jadual imbuhan awalan ($10^9$ hingga $10^{-9}$).
   - **Modul 03 • Kuantiti Terbitan**: Format indeks negatif piawai ($m s^{-1}, m s^{-2}$) & kalkulator simulasi Hukum Newton Kedua ($F = ma$).
   - **Modul 04 • Vektor vs Skalar**: Konsol radar leraian vektor Yoyo Blaster ($v_x = v \cos \theta, v_y = v \sin \theta$).
   - **Modul 05 • Sintesis Zarah**: 4 Persamaan kinematik/dinamik disegerakkan secara langsung dengan detik masa video.
   - **Modul 06 • Apex Reconstitution**: Terminal kuiz kelayakan 4 soalan & penjana Sijil Ejen M.A.T.A sedia cetak.

---

## 🛠️ Teknologi Yang Digunakan

- **Frontend**: React 19 + TypeScript + Vite 8
- **Styling**: TailwindCSS v4 + Glassmorphism Backdrop Filter + CSS Hardware Acceleration (`transform3d`)
- **Video & Audio Engine**: Web Video API + Web Audio Synthesizer (Zero-latency sound effects)
- **Icons**: Lucide React
- **Kesan Perayaan**: Canvas Confetti

---

## 💻 Cara Menjalankan Projek

```bash
# 1. Pasang dependensi
npm install

# 2. Jalankan pelayan pembangunan tempatan
npm run dev

# 3. Bina untuk pengeluaran (Production Build)
npm run build
```

---

## 🛡️ Hak Cipta & Inspirasi
Kandungan silibus berpandukan sukatan pelajaran Fizik Tingkatan 4 KSSM Kementerian Pendidikan Malaysia (KPM). Konsep artistik berinspirasikan dunia Ejen Ali & Akademi M.A.T.A.
