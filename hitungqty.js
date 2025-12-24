const summary = {};

// Menghitung total in dan out dari formstockcalculate
formstockcalculate.forEach(element => {
    const key = `${element.item}_${element.tahun}`;
    if (!summary[key]) {
        summary[key] = { in: 0, out: 0 };
    }
    summary[key][element.inorout] += parseInt(element.qty);
});

// Menghitung total in dan out dari datalist
datalist.forEach(element => {
    const key = `${element.item}_${element.tahun}`;
    if (!summary[key]) {
        summary[key] = { in: 0, out: 0 };
    }
    summary[key][element.inorout] += parseInt(element.qty);
});

var date = new Date();
var year = date.getFullYear();

// Gabungkan hasil ke dalam arraysz
const result = arraysz.map(item => {
    const key = `${item.product}_${year}`;
    return {
        ...item,
        total_in: summary[key]?.in || 0,
        total_out: summary[key]?.out || 0
    };
});

///////////////////////////////////

{/* <option value="" selected disabled >Pilih item</option>
                                            <% var dataitems=datadropdown.itemsdata; %>
                                            <% for( let i = 0; i < dataitems.length; i++ ) { %>
                                                <% if (!dataitems[i].product.includes('S-')&&!dataitems[i].product.includes('IN-')&&!dataitems[i].product.includes('OUT-')) { %>
                                                    <option value="<%-dataitems[i].product%>"><%-dataitems[i].product%></option>
                                                <% } %>
                                              
                                                
                                            <% } %> */}

/////////////