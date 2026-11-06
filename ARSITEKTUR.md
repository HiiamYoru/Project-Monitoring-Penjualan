# Arsitektur Aplikasi

## Implementasi paket

Aplikasi statis tanpa dependensi eksternal. `index.html` memuat data dan controller secara berurutan. Perpindahan halaman memakai hash URL sehingga tetap dapat digunakan melalui `file://` tanpa konfigurasi server.

State bersama di `app.js` memuat halaman, mode data, filter, pencarian, paginasi, dan parameter simulasi. Setiap halaman dirender oleh fungsi tersendiri. Helper chart menghasilkan SVG dengan tooltip native pada titik atau batang. Geometri Indonesia tersimpan lokal dan cabang diproyeksikan dari koordinat kota.

Agregasi transaksi dilakukan di browser, memadai untuk 6.000 baris demonstrasi. `rows()` menyaring status dan dimensi, `analytics()` menghitung KPI, dan `group()` mengelompokkan kontribusi. `simulate()` memisahkan dampak utama dan konservatif.

Ekspor CSV menggunakan separator titik koma dan BOM UTF-8; karakter pembuka formula dinetralkan pada ekspor. Data sumber yang masuk HTML dilewatkan melalui `esc()` untuk menghindari interpretasi markup. Ini tidak menggantikan kontrol keamanan backend.

## Penyimpanan

| Kunci localStorage | Isi |
|---|---|
| mp-settings | Nama workspace, mode data awal, tampilan ringkas |
| mp-scenario | Skenario, intensitas, durasi yang disimpan |
| mp-plans | Penandaan rekomendasi berdasarkan mode dan nomor |

Log aktivitas berada di memori sesi dan hilang saat halaman dimuat ulang. Tidak ada data yang dikirim ke jaringan. Data mode di dropdown berlaku selama sesi; untuk menyimpan mode awal gunakan Pengaturan. localStorage bergantung pada browser dan origin, bukan akun pengguna.

## Pengembangan menuju produksi

Antarmuka tersedia sebagai dasar implementasi. Sebelum dipakai untuk operasi perusahaan, pekerjaan berikut tetap diperlukan:

1. Backend terautentikasi dengan kontrol peran dan pembatasan akses per cabang.
2. Ingesti API POS, ERP, marketplace, CRM, warehouse; validasi, deduplikasi, pelacakan sumber, dan penanganan retur yang disepakati bisnis.
3. Mart transaksi dan agregasi server agar data sensitif tidak dibundel pada frontend serta volume besar tidak dihitung di browser.
4. API KPI dan dimensi yang mengembalikan cakupan periode, waktu pembaruan, serta definisi metrik.
5. Prediksi terlatih dan diuji berdasarkan split waktu; evaluasi kebocoran data, drift, interval prediksi, dan retraining. AUC bukan metrik utama untuk prediksi revenue kontinu; gunakan MAE/RMSE/WAPE sesuai kebutuhan.
6. Counterfactual dengan asumsi kausal, data intervensi, eksperimen atau metode identifikasi yang sesuai, bukan rumus linear demonstrasi.
7. Audit log permanen, persetujuan rencana, monitoring layanan, pencadangan, dan pengujian keamanan.

Tidak ada token, endpoint produksi, atau kredensial yang disertakan. Desain ini tidak menyiratkan bahwa konektor dan AI produksi sudah tersedia.
