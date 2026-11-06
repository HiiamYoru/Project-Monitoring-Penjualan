# Panduan Data

## Pemetaan sumber

| Lembar | Baris data | Penggunaan |
|---|---:|---|
| Toko_Cabang | 12 | Nama cabang, kota, provinsi, jenis gerai, penanggung jawab |
| Produk | 69 | Katalog, kategori, stok, harga, brand |
| Staf_Sales_Kasir_Kurir | 60 | Identitas staf, jabatan, skor kinerja, rating |
| Pelanggan | 1.500 | Segmentasi, loyalitas, nilai belanja, risiko churn |
| Transaksi | 6.000 | Revenue, kuantitas, pelanggan unik, agregasi waktu |
| Kampanye_Promo | 20 | Disertakan dalam dataset; tidak menjadi model simulasi |
| Integrasi_Data | 6 | Status, kualitas, jumlah record, waktu sinkronisasi |
| Evaluasi_Sistem | 90 | Ketersediaan, respons, kepuasan, skor sistem |
| Rekomendasi | 6 | Strategi dan dampak estimasi pada mode Excel |
| KPI_Harian | 371 | Disertakan sebagai sumber asli; KPI aplikasi dihitung dari transaksi |

## Definisi perhitungan

| Metrik | Definisi |
|---|---|
| Revenue | Jumlah total_bayar untuk status_transaksi = Selesai |
| Transaksi | Jumlah baris transaksi selesai; satu transaksi_id per baris pada lampiran |
| Produk terjual | Jumlah qty pada transaksi selesai |
| Pelanggan aktif eksekutif | Jumlah pelanggan_id unik pada transaksi terpilih |
| Pelanggan aktif analitik pelanggan | Status master Pelanggan = Aktif; tidak identik dengan pembeli periode berjalan |
| Revenue bulanan | Revenue selesai dikelompokkan berdasarkan bulan kalender, dalam miliar rupiah |
| Growth YoY | (Revenue tahun terpilih / revenue tahun sebelumnya − 1) × 100, filter lain tetap sama |
| Nilai transaksi rata-rata | Revenue / jumlah transaksi; 0 jika tidak ada transaksi |
| Produk risiko | Stok master di bawah 100 unit, ambang demonstrasi |
| Revenue sales | Transaksi selesai yang mempunyai staf_id terkait |
| Skor staf dan rating | Rata-rata nilai master, bukan hasil model dari transaksi |
| Churn tinggi | risiko_churn_persen ≥60 pada master pelanggan |
| Loyalitas | Rata-rata skor_loyalitas pada pelanggan hasil pencarian |
| Kualitas integrasi | Rata-rata sederhana kualitas seluruh sumber, tidak dibobot record |
| Total record integrasi | Jumlah total_record pada lembar integrasi; bukan jumlah baris XLSX |
| Skor sistem dan uptime | Rata-rata 90 observasi Evaluasi_Sistem |
| Kepuasan | Rata-rata skor_kepuasan_pengguna; skala 0–5 |

## Perilaku filter

Filter tahun, triwulan, kategori, cabang, dan provinsi dikombinasikan dengan logika AND. Cabang yang tidak termasuk wilayah terpilih akan menghasilkan kondisi kosong. Reset memulihkan seluruh cabang/kategori/wilayah pada tahun 2026.

Tabel produk menampilkan master katalog yang cocok kategori dan pencarian, termasuk produk dengan nol transaksi pada periode yang dipilih. Stok tidak berubah mengikuti filter tahun. Tabel cabang dan staf mengambil master lalu mengatribusikan transaksi terpilih. Analitik pelanggan menggunakan master pelanggan tanpa filter transaksi.

Bulan tanpa transaksi diberi nilai nol. Nilai nol berarti tidak ada transaksi selesai di dataset yang dipilih, bukan bukti tidak adanya penjualan di dunia nyata.

Data XLSX adalah data dummy yang mungkin memiliki ketidakselarasan antarmaster. Aplikasi mengikuti relasi ID pada transaksi, tanpa mengarang target cabang, menyesuaikan harga master ke historis, atau mengganti nilai sumber.

## Angka ilustratif

Indeks performa, indeks komponen, AUC/presisi/recall/akurasi, distribusi 33/42/25, estimasi penghematan Rp1,24 M, dan seluruh keluaran counterfactual merupakan nilai atau aturan demonstrasi. Nilai indeks tidak dihitung sebagai model prediktif.

Distribusi presentasi merepresentasikan portofolio ilustratif 24 strategi; 6 baris tabel adalah contoh pilihan, bukan pembagi persentase. Pada mode Excel, distribusi dihitung dari 6 rekomendasi sumber dan mengikuti prioritas asli.

Estimasi dampak tidak boleh dijumlahkan secara langsung karena strategi dapat tumpang tindih.
