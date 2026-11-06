const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=fs.existsSync(path.join(__dirname,'../dist/index.html'))?path.join(__dirname,'../dist'):path.join(__dirname,'..');
const events={},nodes={},storage={};
const node=s=>nodes[s]||(nodes[s]={innerHTML:'',textContent:'',value:'',style:{},classList:{add(){},remove(){},toggle(){}},focus(){},setSelectionRange(){},showModal(){this.open=true},close(){this.open=false}});
const document={querySelector:node,addEventListener:(t,fn)=>events[t]=fn,body:{classList:{toggle(){},remove(){}},appendChild(){}},createElement:()=>({click(){},remove(){}})};
const win={addEventListener(){},scrollTo(){}};
const ctx={console,document,window:win,location:{hash:''},localStorage:{getItem:k=>storage[k]||null,setItem:(k,v)=>storage[k]=v},setTimeout:()=>0,clearTimeout(){},Blob,URL};vm.createContext(ctx);
for(const p of ['data/workbook.js','data/indonesia.js','app.js'])vm.runInContext(fs.readFileSync(path.join(root,p),'utf8'),ctx,{filename:p});
const run=s=>vm.runInContext(s,ctx);let checked=0;
for(const mode of ['demo','excel'])for(const page of ['beranda','executive','produk','cabang','sales','pelanggan','simulasi','integrasi','evaluasi','rekomendasi','pengaturan']){
 run(`state.mode='${mode}';state.page='${page}';render()`);const html=nodes['#main'].innerHTML;assert(html.includes('<h1>'),page+' heading');assert(!/\bNaN\b|undefined|Infinity/.test(html),page+' invalid values');checked++;
}
assert.equal(run('DB.Transaksi.length'),6000);
assert.equal(run("DB.Transaksi.filter(r=>r.status_transaksi==='Selesai').length"),3436);
run("state.year='2026';state.period='all';state.category='all';state.branch='all';state.region='all'");
const expected=run("DB.Transaksi.filter(r=>r.status_transaksi==='Selesai'&&r.tanggal.startsWith('2026')).reduce((s,r)=>s+r.total_bayar,0)");assert.equal(run('analytics().revenue'),expected);
run("state.branch='TK-001';state.period='1';state.category='Sembako';state.region='Jawa Barat'");
assert(run("rows().every(r=>r.toko_id==='TK-001'&&Number(r.tanggal.slice(5,7))<=3&&r.kategori_produk==='Sembako')"));
run("state.branch='TK-001';state.region='Kalimantan Timur';state.page='executive';render()");assert.equal(run('analytics().revenue'),0);assert(!/NaN|Infinity/.test(nodes['#main'].innerHTML));
run("state.scenario=0;state.intensity=75;state.duration=6");assert.equal(run('simulate().revenue'),15.2);assert.equal(run('simulate().customers'),45500);assert.equal(run('simulate().conversion'),12);assert.equal(run('simulate().conservative'),18.4);
run('state.intensity=50');assert(run('simulate().revenue')<15.2);run('state.duration=12');assert(run('simulate().revenue')>15.2);
run("state.mode='demo'");assert.equal(run("sum(sources(),'total_record')"),12845632);assert.equal(run("avg(sources(),'kualitas_data_persen')"),92.4);
run("state.page='pelanggan';state.search='NO_MATCH_12345';render()");assert(nodes['#main'].innerHTML.includes('Tidak ada data yang cocok'));
run("state.mode='demo';state.search='';showRec(1)");assert(nodes['#detail'].open);assert(nodes['#dialog-content'].innerHTML.includes('Optimasi Produk Fast Moving'));
events.click({target:{closest:()=>({dataset:{plan:'1'}})}});assert(JSON.parse(storage['mp-plans'])['demo-1']);
run("state.page='simulasi';state.intensity=75;state.duration=6;state.scenario=0");events.click({target:{closest:()=>({dataset:{action:'save-scenario'}})}});assert.equal(JSON.parse(storage['mp-scenario']).duration,6);
console.log(JSON.stringify({status:'LULUS',page_renders:checked,checks:['11 halaman × 2 sumber data','Rekonsiliasi transaksi selesai','Kombinasi filter','Keadaan tanpa data','4 metrik baseline simulasi','Sensitivitas parameter','Total integrasi','Pencarian kosong','Dialog rekomendasi','Penyimpanan rencana dan skenario'],revenue_2026:expected},null,2));
