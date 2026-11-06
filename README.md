# MONITORING PENJUALAN

Sistem Monitoring, Analisis, Prediksi, dan Rekomendasi Strategis untuk Meningkatkan Performa Penjualan.

Prototipe interaktif Sales Intelligence Dashboard dengan 11 halaman, data Excel lampiran, grafik SVG, peta Indonesia, dan simulasi strategi. Seluruh aset tersedia lokal; tidak membutuhkan CDN, koneksi internet, npm, atau proses build untuk digunakan.

## Mulai dalam satu langkah

Ekstrak ZIP, kemudian buka **index.html** di Chrome, Edge, Firefox, atau Safari. Pastikan folder `data`, `app.js`, dan `styles.css` tetap berada di sebelah `index.html`.

Jika browser membatasi penyimpanan pada alamat file lokal, jalankan `python start_server.py` atau `py start_server.py` dari folder hasil ekstraksi, kemudian buka `http://127.0.0.1:8080`. Hentikan dengan Ctrl+C. Server hanya mendengarkan perangkat lokal.

## Alur presentasi yang disarankan

1. **Beranda:** tampilkan enam kartu modul, ringkasan harian, dan indeks performa 12 bulan.
2. **Dashboard Eksekutif:** jelaskan KPI, tren revenue, empat indeks kinerja, peta cabang, dan rekomendasi prioritas.
3. **Pilih Data Excel** di kanan atas. Gunakan filter tahun, triwulan, kategori, cabang, dan wilayah untuk menelusuri data lampiran. Pemilihan filter otomatis menggunakan data Excel.
4. **Penjualan Produk / Performa Cabang / Performa Sales / Analitik Pelanggan:** periksa tabel, cari data, pindah halaman, dan ekspor CSV.
5. **Simulasi Counterfactual:** pilih skenario A–D; ubah intensitas dan durasi, lalu lihat perubahan metrik dan grafik. Simpan di browser atau ekspor JSON.
6. **Rekomendasi Strategi:** filter prioritas, buka detail, lalu tandai rekomendasi sebagai rencana lokal.
7. **Integrasi Data:** jalankan simulasi sinkronisasi untuk menampilkan alur ekstraksi, pembersihan, transformasi, dan pemuatan.
8. **Evaluasi Sistem:** tampilkan metrik model, kepuasan, kestabilan sistem, serta aktivitas lokal.
9. **Pengaturan:** ganti nama workspace, sumber data awal, dan kepadatan tabel.

## Sumber data dan interpretasi angka

**Data Presentasi** memuat angka brief, termasuk revenue Rp12,8 M, pertumbuhan 18,5%, 38.722 pelanggan, 125.632 unit, dan indeks 82,6. Angka ini merupakan ilustrasi presentasi. Ringkasan “Hari Ini” menggunakan tanggal demonstrasi 6 September 2026, bukan tanggal perangkat.

**Data Excel** membaca salinan data dari `Data_Dummy_Monitoring_Penjualan_Mart.xlsx`. File asli ada di `sumber/`; data yang dimuat aplikasi berada pada `data/workbook.js`. Aplikasi tidak membaca ulang XLSX otomatis setiap kali dibuka.

Halaman produk, cabang, sales, dan pelanggan selalu menggunakan Excel serta menampilkan keterangan sumber. Simulasi menggunakan baseline presentasi tetap. Indeks performa, metrik klasifikasi, dan potensi dampak portofolio masih berupa ilustrasi walaupun mode Excel dipilih; panel terkait diberi label.

Snapshot terdiri atas 6.000 transaksi, 69 produk, 12 cabang, 60 staf, dan 1.500 pelanggan. Rentang transaksi adalah 1 September 2025–6 September 2026. Revenue hanya menjumlahkan `total_bayar` transaksi **Selesai**; transaksi dibatalkan, diretur, dan diproses dikecualikan. Hasil rekonsiliasi seluruh tahun 2026: **Rp626.775.590**. Nilai tersebut memang berbeda dengan Rp12,8 M pada mode presentasi.

Pertumbuhan tahun-ke-tahun dapat tidak representatif karena tahun 2025 hanya memiliki data September–Desember dan 2026 sampai awal September. Nilai tahun tanpa pembanding ditampilkan sebagai “—”.

## Simulasi: dua angka yang berbeda dalam brief

Pada skenario A, intensitas 75%, dan durasi 6 bulan:

- Revenue Rp12 M menjadi Rp15,2 M: **kenaikan 26,7%**.
- Pelanggan 38.000 menjadi 45.500.
- Konversi 8% menjadi 12%: **kenaikan 4 poin persentase**.
- Narasi konservatif: potensi revenue **18,4%** dalam 6 bulan.

Estimasi konservatif menggunakan asumsi terpisah, bukan hasil perhitungan Rp12 M → Rp15,2 M dan bukan interval kepercayaan statistik. Aplikasi menjelaskan perbedaan ini secara terbuka. Perubahan parameter mengikuti rumus linear: dampak dasar × (intensitas / 75) × (durasi / 6).

## Cakupan implementasi

Sudah tersedia: antarmuka responsif, navigasi 11 halaman, pengolahan data lokal, filter, tabel, ekspor, peta, simulasi parameter, dialog, pengaturan lokal, dan log aktivitas sesi.

Belum tersedia: backend produksi, autentikasi, otorisasi multiuser, database server, koneksi API POS/ERP/CRM, streaming data waktu nyata, model AI terlatih, validasi kausal, dan audit log permanen. Tombol sinkronisasi merupakan demonstrasi lokal dan tidak mengubah sistem eksternal. Rekomendasi tidak dijalankan otomatis.

Untuk produksi, desain ini dapat menjadi dasar frontend; integrasi, keamanan, pipeline data, dan model perlu dikembangkan serta divalidasi sesuai sistem perusahaan. Semua data dan kode frontend dapat dilihat oleh orang yang memiliki paket ini. Jangan mengganti data dummy dengan data rahasia untuk distribusi publik.

## Struktur paket

- `index.html`: entry point aplikasi.
- `styles.css`: token warna, layout, komponen, responsivitas, dan gaya cetak.
- `app.js`: navigasi, agregasi, grafik, filter, interaksi, simulasi, dan ekspor.
- `data/workbook.js`: data lampiran dalam format objek JavaScript.
- `data/indonesia.js`: batas geografis Indonesia.
- `sumber/Data_Dummy_Monitoring_Penjualan_Mart.xlsx`: lampiran data asli.
- `PANDUAN_DATA.md`: definisi metrik dan pemetaan lembar.
- `ARSITEKTUR.md`: struktur teknis dan batas integrasi.
- `scripts/refresh_excel.py`: konversi ulang XLSX dengan Python standar.
- `tests/check.cjs`: pemeriksaan fungsi, angka, dan interaksi inti tanpa dependensi.
- `start_server.py`: server lokal opsional.

## Memperbarui data

Pertahankan nama lembar dan kolom asli. Jalankan:

```bash
python scripts/refresh_excel.py sumber/Data_Dummy_Monitoring_Penjualan_Mart.xlsx
```

Lalu muat ulang browser. Script mengganti `data/workbook.js`, bukan XLSX sumber. Hasil formula Excel harus sudah dihitung dan disimpan oleh Excel sebelum dikonversi. Format kolom tanggal yang diharapkan adalah teks `YYYY-MM-DD`, sesuai lampiran asli. Penambahan kota baru juga memerlukan koordinat pada `coords` dalam `app.js` untuk peta.

## Pemeriksaan yang telah dilakukan

Pemeriksaan sintaks JavaScript dan uji Node berhasil: 22 render halaman (11 halaman × 2 mode), rekonsiliasi revenue, filter gabungan, kondisi tanpa data, perubahan parameter simulasi, jumlah record integrasi, pencarian kosong, dialog, dan penyimpanan lokal. Pemeriksaan ini bukan uji visual lintas browser atau uji koneksi produksi.

Ulangi dengan `node tests/check.cjs` (Node.js 18+). Aplikasi sendiri tidak memerlukan Node.js.

## Atribusi

Komposisi disesuaikan dari gambar referensi pengguna. Ikon antarmuka dan grafik disusun sebagai SVG lokal. Batas wilayah Indonesia berasal dari world.geo.json / Natural Earth, disimpan sebagai aset lokal: https://github.com/johan/world.geo.json/blob/master/countries/IDN.geo.json. Data Natural Earth berada pada domain publik: https://www.naturalearthdata.com/about/terms-of-use/. Peta menyajikan lokasi cabang dan bukan acuan batas wilayah resmi.
