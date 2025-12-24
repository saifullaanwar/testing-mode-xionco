self.onmessage = function (e) {
    const bigData = e.data;

    // Lakukan proses berat
    //const result = bigData.map(item => item.value * 2); // Contoh

    console.log('worker');
    //console.log('dataall:', bigData);

    //awal
    
    var fixstockproduklist=[];

    for (let i = 0; i < bigData.itemsdata.length; i++) {
        const element = bigData.itemsdata[i];
        if (element.stockprodukcode.toLowerCase()=='true') {
            
            if (element.product!='AETHER - Track Light - L Connector'&&element.product!='AETHER - Track Light - I Connector'&&element.product!='AETHER - Track Light - T Connector'&&element.product!='AETHER - Track Light - PLUS Connector'&&element.product!='AETHER - Track Light - V90 Connector') {
                fixstockproduklist.push(element);
                //dataitemadddsss.push(element);
                
            }
        }
    }
    fixstockproduklist.sort((a, b) => a.product.toLowerCase().localeCompare(b.product.toLowerCase()));


    //fixstockproduklist.sort((a, b) => a.product.toLowerCase().localeCompare(b.product.toLowerCase()));

    
    //console.log('fixstockproduklist=======',fixstockproduklist);

    //////finishing
    //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

    var formstockcalculate=bigData.formstockcalculate;
    var dataadminlist=bigData.dataadminlist;
    // Proses perhitungan total in dan out
    const summary = {};

    // Filter data yang **tidak** mengandung kata "penjualan" di `keterangan`
    const filteredData = formstockcalculate.filter(element => 
      !element.keterangan.toLowerCase().includes("-sell08989")
    );
    
    filteredData.forEach(element => {
        const key = `${element.item}_${element.tahun}`;
        if (!summary[key]) {
            summary[key] = { in: 0, out: 0 };
        }
        summary[key][element.inorout] += parseInt(element.qty);


    });

    // Menghitung total in dan out dari dataadminlist
    dataadminlist.forEach(element => {
      const key = `${element.item}_${element.tahun}`;
      if (!summary[key]) {
          summary[key] = { in: 0, out: 0 };
      }
      summary[key].out += parseInt(element.qty);// Selalu tambahkan ke total_out
    });

    var date=new Date();
    var year =date.getFullYear();

    // Tambahkan hasil ke dataitem
    const result = fixstockproduklist.map(item => {
      const key = `${item.product}_${year}`; // Tahun 2025 sesuai dengan data
      return {
          ...item,
          total_in: summary[key]?.in || 0,
          total_out: summary[key]?.out || 0
      };
    });
    /* console.log('summary');
    console.log(summary);
    console.log('result===');
    console.log(result); */
    //

    var arryastatistik=statistik(bigData);

    const hasilGabunganfix = result.map(item => {
        const statistik = arryastatistik.find(stat => stat.product === item.product);
        //item.stockproduk_refbuy=
        return {
            ...item,
            quantityAveragePerMonth: statistik ? statistik.quantityAveragePerMonth : 0 // atau null/undefined jika tidak ingin default
            ,quantityAveragePerMonth60:statistik ? statistik.quantityAveragePerMonth60 : 0,quantityAveragePerMonth70:statistik ? statistik.quantityAveragePerMonth70 : 0,
            kalkulasi_refbuy:statistik ? statistik.quantityAveragePerMonth60*2 :0
        };
    });

    self.postMessage({result:hasilGabunganfix,arryastatistik});
};

function statistik(bigData) {
    var array=bigData.dataadminlist
    // Inisialisasi daftar nama bulan
    const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    //pembagi Average mulai april 2025 hingga bulan saat ini 
    const bulanAwal = new Date(2025, 3); // April 2025, ingat: bulan 0 = Januari
    const bulanSekarang = new Date(); // tanggal sekarang

    const tahunSelisih = bulanSekarang.getFullYear() - bulanAwal.getFullYear();
    const bulanSelisih = bulanSekarang.getMonth() - bulanAwal.getMonth();

    const pembagiAverage = tahunSelisih * 12 + bulanSelisih + 1; // +1 agar termasuk bulan awal

    const mulaiTanggal = new Date('2025-04-01');
    const hariIni = new Date();

    // Hitung selisih waktu dalam milidetik
    const selisihWaktu = hariIni - mulaiTanggal;

    // Ubah ke jumlah hari
    const jumlahHari = Math.floor(selisihWaktu / (1000 * 60 * 60 * 24));
    console.log("Jumlah bulan pembagi average:", jumlahHari);

    // Dapatkan tahun saat ini
    const currentYear = new Date().getFullYear();

    // Inisialisasi properti bulan pada setiap item di dataitem
    var dataitem=bigData.itemsdata;
    dataitem.forEach(item => {
        months.forEach(month => {
            item[month.toLowerCase()] = 0; //Inisialisasi total penjualan per bulan, Menggunakan nama bulan dalam huruf kecil sebagai kunci
            item[`detail_${month.toLowerCase()}`] = []; // Inisialisasi array detail transaksi per bulan
            item[`totalomsetselesai_${month.toLowerCase()}`] = 0; // Inisialisasi total penjualan per bulan (status "Selesai")

        });
    });
    //console.log('dataitem - awal',dataitem);

    /*  */
    // Loop melalui dataadminlist untuk menghitung total penjualan per bulan
    const mulaiApril2025 = new Date('2025-04-01').getTime(); // Timestamp awal April 2025

    const adminlistFiltered = array.filter(item => item.orderdate_mili >= mulaiApril2025);
    adminlistFiltered.forEach(adminEntry => {
        // Pastikan tahun transaksi sama dengan tahun saat ini
        /* if (parseInt(adminEntry.tahun) === currentYear){
            
        } */
        const itemNameAdmin = adminEntry.item;
        // Pastikan orderdate_mili diubah menjadi angka sebelum digunakan
        const orderDateMili = parseInt(adminEntry.orderdate_mili);
        
        const finalprice=parseInt(adminEntry.finalprice);


        // Konversi milidetik ke objek Date untuk mendapatkan bulan
        const date = new Date(orderDateMili);
        const monthName = months[date.getMonth()]; // getMonth() mengembalikan 0-11
        const dayOfMonth = date.getDate(); // Mendapatkan tanggal (hari dalam bulan)

        // Hitung total penjualan setelah diskon
        const calculatedPrice = finalprice;//(price * qty) - diskonAmount;

        // Temukan produk yang sesuai di dataitem dan tambahkan penjualan
        const matchedItem = dataitem.find(itemData =>
            itemData.product.toLowerCase() === itemNameAdmin.toLowerCase()
        );

        if (matchedItem) {
            

            // Jika status "Selesai", tambahkan ke total penjualan selesai per bulan
            if (adminEntry.status === "Selesai") {
                matchedItem[`totalomsetselesai_${monthName.toLowerCase()}`] += calculatedPrice;
            }
            /* console.log('adminEntry.history');
            console.log(adminEntry.history);
            var history0=JSON.parse(adminEntry.history);
            var statushistory=history0.filter(item => item.details?.status === "Selesai"&&item.tindakan==="Approved Force Sent"||item.details?.status === "Selesai"&&item.tindakan==="Produk diterima konsumen"||item.details?.status === "Selesai"&&item.tindakan==="Selesai proses kirim C5");//
            console.log('statushistory');
            console.log(statushistory); */

            if (adminEntry.status.toLowerCase() != "dibatalkan"&&adminEntry.status.toLowerCase() != "pending"){
                // Tambahkan total penjualan ke bulan yang sesuai
                matchedItem[monthName.toLowerCase()] += calculatedPrice;
                // Tambahkan detail transaksi ke properti detail_[bulan]
                matchedItem[`detail_${monthName.toLowerCase()}`].push({
                    tanggal: dayOfMonth,
                    orderdate_mili: adminEntry.orderdate_mili,
                    item: adminEntry.item,
                    qty: adminEntry.qty,
                    finalprice: adminEntry.finalprice,
                    platform: adminEntry.platform,
                    status:adminEntry.status,
                    id_transaksi:adminEntry.id_transaksi,
                    //tglinputmili_selesai:statushistory[0].details.tglinputmili
                });
            }
            
        }
        
    });
    //console.log('dataitem === io',dataitem);

    // Hitung totalomset untuk setiap item di dataitem
    dataitem.forEach(item => {
        let yearlyTotalAllStatus = 0;
        let yearlyTotalCompletedStatus = 0;
        let quantity = 0;
        var pembagiBulannoNol_tot=0;
        var pembagiBulannoNol=0;

        months.forEach(month => {
            const monthKey = month.toLowerCase();
            yearlyTotalAllStatus += item[monthKey];
            yearlyTotalCompletedStatus += item[`totalomsetselesai_${monthKey}`];

             if (item[monthKey]!=0) {
                pembagiBulannoNol_tot+=1;
            }else{pembagiBulannoNol_tot+=0;}

            if (item[`quantity_${monthKey}`]!=0) {
                pembagiBulannoNol+=1;
            }else{pembagiBulannoNol+=0;}

            // Hitung total quantity per bulan dari detail transaksi
            const qtyPerMonth = item[`detail_${monthKey}`].reduce((sum, trx) => sum + parseInt(trx.qty || 0), 0);
            item[`quantity_${monthKey}`] = qtyPerMonth;
            quantity += qtyPerMonth;

            // Urutkan array detail_[bulan] berdasarkan properti 'tanggal'
            item[`detail_${monthKey}`].sort((a, b) => a.tanggal - b.tanggal);
        });

        item.totalomset = yearlyTotalAllStatus; // Total omset untuk semua status
        item.totalomsetselesai = yearlyTotalCompletedStatus; // Total omset hanya untuk status "Selesai"
        item.totalomsetaverage = yearlyTotalAllStatus / pembagiBulannoNol_tot; //pembagiAverage dibagi total bulan = 12
        item.quantityTotal = quantity; //total quantity dalam setahun = 12 bulan
        item.quantityAverage = parseFloat((quantity / pembagiBulannoNol).toFixed(2)); //pembagiAverage Average Quantity (float, 2 decimals)

    });

    //cek & hitung rata2 penjualan untuk conektor L T I V90
    const connectorMap = {
        "AETHER - Track Light - L Connector": {
            bodyPlain: 1,
            body90: 0,
            leg: 2
        },
        "AETHER - Track Light - I Connector": {
            bodyPlain: 1,
            body90: 0,
            leg: 2
        },
        "AETHER - Track Light - T Connector": {
            bodyPlain: 1,
            body90: 0,
            leg: 3
        },
        "AETHER - Track Light - PLUS Connector": {
            bodyPlain: 1,
            body90: 0,
            leg: 4
        },
        "AETHER - Track Light - V90 Connector": {
            bodyPlain: 0,
            body90: 1,
            leg: 2
        }
    };

    let totalBodyPlain = 0;
    let totalBody90 = 0;
    let totalLeg = 0;

    for (const item of dataitem) {
        const config = connectorMap[item.product];
        if (!config) continue; // Skip produk lain yang tidak termasuk konektor

        const qty = item.quantityTotal;
        totalBodyPlain += qty * config.bodyPlain;
        totalBody90 += qty * config.body90;
        totalLeg += qty * config.leg;
    }

    var konektors=[{product:"AETHER - Track Light - Leg Connector",quantityTotal:totalLeg},{product:"AETHER - Track Light - Body Plain Connector",quantityTotal:totalBodyPlain},{product:"AETHER - Track Light - Body 90 Connector",quantityTotal:totalBody90}];
    
    konektors.forEach(konektor => {
        const item = dataitem.find(d => d.product === konektor.product);
        if (item) {
            item.quantityTotal = konektor.quantityTotal;
        }
    });

    ///AVG qty perbulan (dibagi 30 hari)
    dataitem.forEach(item => {
        var bagi=item.quantityTotal / jumlahHari;
        item.quantityAveragePerMonth = bagi;
        item.quantityAveragePerMonth60 = bagi*60;
        item.quantityAveragePerMonth70 = bagi*70;
    });
    //dataitem=[...dataitem,...konektors];

    return dataitem;
}