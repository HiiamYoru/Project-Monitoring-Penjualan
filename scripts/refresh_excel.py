"""Konversi XLSX ke data aplikasi tanpa dependensi pihak ketiga."""
import json
import posixpath
import sys
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

NS = {'s': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
REL = '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id'
REQUIRED = {'Toko_Cabang', 'Produk', 'Staf_Sales_Kasir_Kurir', 'Pelanggan', 'Transaksi', 'Kampanye_Promo', 'Integrasi_Data', 'Evaluasi_Sistem', 'Rekomendasi', 'KPI_Harian'}

def col_index(ref):
    n = 0
    for c in ref:
        if c.isalpha(): n = n * 26 + ord(c.upper()) - 64
    return n - 1

def read_workbook(filename):
    data = {}
    with zipfile.ZipFile(filename) as z:
        shared = []
        if 'xl/sharedStrings.xml' in z.namelist():
            shared = [''.join(t.text or '' for t in r.iter('{'+NS['s']+'}t')) for r in ET.fromstring(z.read('xl/sharedStrings.xml'))]
        rels = {r.attrib['Id']: r.attrib['Target'] for r in ET.fromstring(z.read('xl/_rels/workbook.xml.rels'))}
        for sheet in ET.fromstring(z.read('xl/workbook.xml')).findall('s:sheets/s:sheet', NS):
            target = rels[sheet.attrib[REL]]
            target = target.lstrip('/') if target.startswith('/') else posixpath.normpath(posixpath.join('xl', target))
            rows = []
            for row in ET.fromstring(z.read(target)).findall('s:sheetData/s:row', NS):
                values = []
                for cell in row.findall('s:c', NS):
                    i = col_index(cell.attrib['r'])
                    while len(values) <= i: values.append(None)
                    kind = cell.attrib.get('t')
                    v = cell.find('s:v', NS)
                    text = v.text if v is not None else None
                    if kind == 's': value = shared[int(text)] if text else None
                    elif kind == 'inlineStr': value = ''.join(t.text or '' for t in cell.findall('.//s:t', NS))
                    elif kind == 'b': value = text == '1'
                    elif kind in ('str', 'e'): value = text
                    elif text is None: value = None
                    else:
                        number = float(text)
                        value = int(number) if number.is_integer() else number
                    values[i] = value
                if any(v is not None for v in values): rows.append(values)
            if rows:
                headers = rows[0]
                data[sheet.attrib['name']] = [{str(k): r[i] if i < len(r) else None for i,k in enumerate(headers) if k is not None} for r in rows[1:]]
    missing = REQUIRED - data.keys()
    if missing: raise ValueError('Lembar wajib tidak ditemukan: ' + ', '.join(sorted(missing)))
    for row in data['Transaksi']:
        if not isinstance(row.get('tanggal'), str):
            raise ValueError('Tanggal transaksi harus teks YYYY-MM-DD, sesuai template asli.')
    return data

if __name__ == '__main__':
    if len(sys.argv) != 2: raise SystemExit('Penggunaan: python scripts/refresh_excel.py sumber/Data_Dummy_Monitoring_Penjualan_Mart.xlsx')
    data = read_workbook(sys.argv[1])
    root = Path(__file__).resolve().parents[1]
    if (root / 'dist' / 'index.html').exists(): root = root / 'dist'
    output = root / 'data' / 'workbook.js'
    output.write_text('window.WORKBOOK=' + json.dumps(data, ensure_ascii=False, separators=(',', ':')) + ';', encoding='utf-8')
    print(f'Selesai: {len(data)} lembar dikonversi ke {output}')
