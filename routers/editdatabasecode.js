import express from "express";
import { Worker } from "worker_threads";
//import cookieParser from 'cookie-parser';
import basicAuth from "../config/basicAUth.js";
import checkRole from './checkRole.js';

const router = express.Router();

/* router.get("/", function (req, res) {
  const cookies = req.cookies;
  var datausers;
  var userToken = cookies.hamburger;

  var rolesuser = "Supervisor"; //default
  if (userToken) {
    // Cookie tidak ditemukan
    datausers = JSON.parse(cookies.hamburger);

    console.log(datausers);

    rolesuser = datausers.tipeuser;
  } else {
    datausers = [];
    console.log(datausers);
  }

  var versionall = "?v=" + Math.random();
  var czz = "/css/adminlist.css" + versionall;
  var jzz = "editdatabase/editdatabase-mainproduk";
  var diskripsi = "";
  var navatasactive = "editdatabase";

  var roles = "supervisor";

  if (rolesuser.toLowerCase() == "supervisor") {
    //navatasactive='finance-banklimbo';
    roles = "supervisor";
  }

  var menuatas='mainproduk';

  var bukawal = "awal";
  const worker = new Worker("./worker/workeradminlist.js", {
    workerData: { bukawal },
  });

  worker.on("message", (datas) => {
    //res.status(200).send(datas);
    res.status(200).render("mainproduct-editdatabase", {
      titlepage: "Database",
      diskripsi,
      czz,
      versionall,
      jzz,
      navatasactive,
      datas,
      roles,
      menuatas
    });
  });
}); */

router.get("/", function (req, res) {
  res.redirect('/editdatabase/higproduk');
})

//untuk memproses workker thread agar kode tidak berulang
function runWorker(workerFile, workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(workerFile, { workerData });
    worker.on("message", resolve);
    worker.on("error", reject);
  });
}

//save add produk 

router.post("/saveaddnewproduks", async function (req, res) {
  const cekauthoriz = await basicAuth(req.headers.authorization);
  //console.log(cekauthoriz);
  if (cekauthoriz != true || cekauthoriz != true) {
    return res.status(403).send("Unauthorized!");
  }

  var data = req.body;
  var bukawal = "saveaddnewproduks";

  //console.log(data);

  const worker = new Worker("./worker/workereditdatabase.js", {
    workerData: { bukawal, data },
  });

  worker.on("message", (datas) => {
    res.status(200).send(datas);
    res.end();
  });
});

//add produk web
router.get("/addprodukweb", function (req, res) {
  const cookies = req.cookies;
 
  var rolesuser = cookies.hamburger ? JSON.parse(cookies.hamburger).tipeuser : "Supervisor";

  var versionall = "?v=" + Math.random();
  var czz = "/css/adminlist.css" + versionall;
  var jzz = "editdatabase/editdatabase-addproduk";
  var diskripsi = "";
  var navatasactive = "adminweb-product";

  var roles = rolesuser.toLowerCase();

  var bukawal = "getdatabases";
  const worker = new Worker("./worker/workereditdatabase.js", {
    workerData: { bukawal },
  });
  worker.on("message", (datas) => {
    //res.status(200).send(datas);
    res.status(200).render("addproduk-editdatabase", {
      titlepage: "Add Database",
      diskripsi,
      czz,
      versionall,
      jzz,
      navatasactive,
      datas,
      roles
    });
  });
});

    

//Delivery Unit
//1. Menampilkan halaman delivery unit
router.get("/deliveryunit", function (req, res) {
  const cookies = req.cookies;
  var rolesuser = cookies.hamburger ? JSON.parse(cookies.hamburger).tipeuser : "Supervisor";

  const versionall = "?v=" + Math.random();
  const czz = "/css/adminlist.css" + versionall;
  const jzz = "editdatabase/editdatabase-deliveryunit";
  const navatasactive = "editdatabase";
  const menuatas = 'deliveryunit';

  res.status(200).render("deliveryunit-editdatabase", {
    titlepage: "Database Delivery Unit",
    diskripsi: "",
    czz,
    versionall,
    jzz,
    navatasactive,
    roles: rolesuser.toLowerCase(),
    menuatas
  });
});

//2. API: Ambil Data Delivery Unit
router.get("/getdeliveryunitlist", async (req, res) => {
  const bukawal = "getdeliveryunitlist";
  const worker = new Worker("./worker/workereditdatabase.js", {
    workerData: { bukawal },
  });
  worker.on("message", (datas) => {
    res.status(200).send(datas);
  });
});

//3. API: Simpan Data Delivery Unit Baru
router.post("/saveadddeliveryunit", async (req, res) => {
  const cekauthoriz = await basicAuth(req.headers.authorization);
  if (cekauthoriz != true) {
    return res.status(403).send("Unauthorized!");
  }

  var data = req.body;
  var bukawal = "saveadddeliveryunit";

  const worker = new Worker("./worker/workereditdatabase.js", {
    workerData: { bukawal, data },
  });
  worker.on("message", (datas) => {
    res.status(200).send(datas);
  });
});

//4. API: Hapus Data Delivery Unit
router.post("/deletedeliveryunit", async (req, res) => {
  const cekauthoriz = await basicAuth(req.headers.authorization);
  if (cekauthoriz != true) return res.status(403).send("Unauthorized!");

  var data = req.body;
  var bukawal = "deletedeliveryunit";

  const worker = new Worker("./worker/workereditdatabase.js", {
    workerData: { bukawal, data },
  });
  worker.on("message", (datas) => {
    res.status(200).send(datas);
  });
});

//-------
router.post("/saveaddprodukweb", async function (req, res) {
  const cekauthoriz = await basicAuth(req.headers.authorization);
  var data = req.body;
  var bukawal = "saveaddprodukweb";
  const worker = new Worker("./worker/workereditdatabase.js", {
    workerData: { bukawal, data },
  });
  worker.on("message", (datas) => {
    res.status(200).send(datas);
    res.end();
  });
});

router.get("/editprodukweb", function (req, res) {
  const cookies = req.cookies;
  var rolesuser = cookies.hamburger ? JSON.parse(cookies.hamburger).tipeuser : "Supervisor";
  var versionall = "?v=" + Math.random();
  var jzz = "editdatabase/editdatabase-editprodukweb";
  var bukawal = "getdatabases";

  const worker = new Worker("./worker/workereditdatabase.js", {
    workerData: { bukawal },
  });
  
  worker.on("message", (datas) => {
    //res.status(200).send(datas);
    res.status(200).render("addproduk-editdatabase", {
      titlepage: "Edit Database",
      diskripsi: "",
      czz: "/css/adminlist.css"+ versionall,
      versionall,
      jzz,
      navatasactive: "adminweb-product",
      datas,
      roles: rolesuser.toLowerCase()
    });
  });
});

router.get("/higproduk", function (req, res) {
  const cookies = req.cookies;
  var rolesuser = cookies.hamburger ? JSON.parse(cookies.hamburger).tipeuser : "Supervisor";
  res.status(200).render("higproduk-editdatabase", {
    titlepage: "Database",
    diskripsi: "",
    czz: "/css/adminlist.css?v=" + Math.random(),
    versionall: "?v=" + Math.random(),
    jzz: "editdatabase/editdatabase",
    navatasactive: "editdatabase",
    roles: rolesuser.toLowerCase(),
    menuatas: 'variantproduk'
  });
});

//saveadditem

router.post("/saveadditem", async function (req, res) {
  const cekauthoriz = await basicAuth(req.headers.authorization);
  //console.log(cekauthoriz);
  if (cekauthoriz != true || cekauthoriz != true) {
    return res.status(403).send("Unauthorized!");
  }

  var data = req.body;
  var bukawal = "saveadditem";

  //console.log(data);

  const worker = new Worker("./worker/workereditdatabase.js", {
    workerData: { bukawal, data },
  });

  worker.on("message", (datas) => {
    res.status(200).send(datas);
    res.end();
  });
});

router.post("/saveedititem", async function (req, res) {
  const cekauthoriz = await basicAuth(req.headers.authorization);
  //console.log(cekauthoriz);
  if (cekauthoriz != true || cekauthoriz != true) {
    return res.status(403).send("Unauthorized!");
  }

  var data = req.body;
  var bukawal = "saveedititem";

  //console.log(data);

  const worker = new Worker("./worker/workereditdatabase.js", {
    workerData: { bukawal, data },
  });

  worker.on("message", (datas) => {
    res.status(200).send(datas);
    res.end();
  });
});

//-------
router.post("/saveaddprodukweb", async function (req, res) {
  const cekauthoriz = await basicAuth(req.headers.authorization);
  var data = req.body;
  var bukawal = "saveaddprodukweb";
  const worker = new Worker("./worker/workereditdatabase.js", {
    workerData: { bukawal, data },
  });
  worker.on("message", (datas) => {
    res.status(200).send(datas);
    res.end();
  });
});

router.get("/editprodukweb", function (req, res) {
  const cookies = req.cookies;
  var rolesuser = cookies.hamburger ? JSON.parse(cookies.hamburger).tipeuser : "Supervisor";
  var versionall = "?v=" + Math.random();
  var jzz = "editdatabase/editdatabase-editprodukweb";
  var bukawal = "getdatabases";

  const worker = new Worker("./worker/workereditdatabase.js", {
    workerData: { bukawal },
  });
  
  worker.on("message", (datas) => {
    //res.status(200).send(datas);
    res.status(200).render("addproduk-editdatabase", {
      titlepage: "Edit Database",
      diskripsi: "",
      czz: "/css/adminlist.css"+ versionall,
      versionall,
      jzz,
      navatasactive: "adminweb-product",
      datas,
      roles: rolesuser.toLowerCase()
    });
  });
});

router.get("/higproduk", function (req, res) {
  const cookies = req.cookies;
  var rolesuser = cookies.hamburger ? JSON.parse(cookies.hamburger).tipeuser : "Supervisor";
  res.status(200).render("higproduk-editdatabase", {
    titlepage: "Database",
    diskripsi: "",
    czz: "/css/adminlist.css?v=" + Math.random(),
    versionall: "?v=" + Math.random(),
    jzz: "editdatabase/editdatabase",
    navatasactive: "editdatabase",
    roles: rolesuser.toLowerCase(),
    menuatas: 'variantproduk'
  });
});

//saveadditem

router.post("/saveadditem", async function (req, res) {
  const cekauthoriz = await basicAuth(req.headers.authorization);
  //console.log(cekauthoriz);
  if (cekauthoriz != true || cekauthoriz != true) {
    return res.status(403).send("Unauthorized!");
  }

  var data = req.body;
  var bukawal = "saveadditem";

  //console.log(data);

  const worker = new Worker("./worker/workereditdatabase.js", {
    workerData: { bukawal, data },
  });

  worker.on("message", (datas) => {
    res.status(200).send(datas);
    res.end();
  });
});

router.post("/saveedititem", async function (req, res) {
  const cekauthoriz = await basicAuth(req.headers.authorization);
  //console.log(cekauthoriz);
  if (cekauthoriz != true || cekauthoriz != true) {
    return res.status(403).send("Unauthorized!");
  }

  var data = req.body;
  var bukawal = "saveedititem";

  //console.log(data);

  const worker = new Worker("./worker/workereditdatabase.js", {
    workerData: { bukawal, data },
  });

  worker.on("message", (datas) => {
    res.status(200).send(datas);
    res.end();
  });
});

//platform
router.get("/platform", function (req, res) {
  const cookies = req.cookies;
  var datausers;
  var userToken = cookies.hamburger;

  var rolesuser = "Supervisor"; //default
  if (userToken) {
    // Cookie tidak ditemukan
    datausers = JSON.parse(cookies.hamburger);

    console.log(datausers);

    rolesuser = datausers.tipeuser;
  } else {
    datausers = [];
    console.log(datausers);
  }

  var versionall = "?v=" + Math.random();
  var czz = "/css/adminlist.css" + versionall;
  var jzz = "editdatabase/editdatabase-platform";
  var diskripsi = "";
  var navatasactive = "editdatabase";

  var roles = rolesuser.toLowerCase();//"supervisor";

  // if (rolesuser.toLowerCase() == "supervisor") {
  //   //navatasactive='finance-banklimbo';
  //   roles = "supervisor";
  // }
  var menuatas = 'platform';
  // var bukawal = "awal";
  // const worker = new Worker("./worker/workeradminlist.js", {
  //   workerData: { bukawal },
  // });

  // worker.on("message", (datas) => {
  //   //res.status(200).send(datas);
  res.status(200).render("platform-editdatabase", {
    titlepage: "Database",
    diskripsi,
    czz,
    versionall,
    jzz,
    navatasactive,
    // datas,
    roles, menuatas
  });
  // });
});

router.post("/saveaddplatform", async function (req, res) {
  const cekauthoriz = await basicAuth(req.headers.authorization);
  //console.log(cekauthoriz);
  if (cekauthoriz != true || cekauthoriz != true) {
    return res.status(403).send("Unauthorized!");
  }

  var data = req.body;
  var bukawal = "saveaddplatform";

  //console.log(data);

  const worker = new Worker("./worker/workereditdatabase.js", {
    workerData: { bukawal, data },
  });

  worker.on("message", (datas) => {
    res.status(200).send(datas);
    res.end();
  });
});
//
//harga platform
router.get("/hargaplatform", checkRole(["admin c10", 'admin head', 'supervisor',"tim sukses"]), function (req, res) {
  const cookies = req.cookies;
  var datausers;
  var userToken = cookies.hamburger;

  var rolesuser = "Supervisor"; //default
  if (userToken) {
    // Cookie tidak ditemukan
    datausers = JSON.parse(cookies.hamburger);

    console.log(datausers);

    rolesuser = datausers.tipeuser;
  } else {
    datausers = [];
    console.log(datausers);
  }

  var versionall = "?v=" + Math.random();
  var czz = "/css/adminlist.css" + versionall;
  var jzz = "editdatabase/editdatabase-hargaplatform";
  var diskripsi = "";
  var navatasactive = "editdatabase";

  var roles = rolesuser.toLowerCase();

  var menuatas = 'hargaplatform';
  // var bukawal = "apieditdatabase";
  // const worker = new Worker("./worker/workereditdatabase.js", {
  //   workerData: { bukawal,rolesuser },
  // });

  // worker.on("message", (datas) => {
  //   //res.status(200).send(datas);
  res.status(200).render("hargaplatform-editdatabase", {
    titlepage: "Database",
    diskripsi,
    czz,
    versionall,
    jzz,
    navatasactive,
    // datas,
    roles, menuatas
  });
  // });
});

router.post("/saveaddhargaplatform", async function (req, res) {
  const cekauthoriz = await basicAuth(req.headers.authorization);
  //console.log(cekauthoriz);
  if (cekauthoriz != true || cekauthoriz != true) {
    return res.status(403).send("Unauthorized!");
  }

  var data = req.body;
  var bukawal = "saveaddhargaplatform";

  //console.log(data);

  const worker = new Worker("./worker/workereditdatabase.js", {
    workerData: { bukawal, data },
  });

  worker.on("message", (datas) => {
    res.status(200).send(datas);
    res.end();
  });
});

//color variant
router.get("/colorvariant", function (req, res) {
  const cookies = req.cookies;
  var datausers;
  var userToken = cookies.hamburger;

  var rolesuser = "Supervisor"; //default
  if (userToken) {
    // Cookie tidak ditemukan
    datausers = JSON.parse(cookies.hamburger);

    console.log(datausers);

    rolesuser = datausers.tipeuser;
  } else {
    datausers = [];
    console.log(datausers);
  }

  var versionall = "?v=" + Math.random();
  var czz = "/css/adminlist.css" + versionall;
  var jzz = "editdatabase/editdatabase-colorvariant";
  var diskripsi = "";
  var navatasactive = "editdatabase";

  var roles = rolesuser.toLowerCase();//"supervisor";

  // if (rolesuser.toLowerCase() == "supervisor") {
  //   //navatasactive='finance-banklimbo';
  //   roles = "supervisor";
  // }

  var menuatas = 'colorvariant';
  // var bukawal = "awal";
  // const worker = new Worker("./worker/workeradminlist.js", {
  //   workerData: { bukawal },
  // });

  // worker.on("message", (datas) => {
  //   //res.status(200).send(datas);
  res.status(200).render("colorvariant-editdatabase", {
    titlepage: "Database",
    diskripsi,
    czz,
    versionall,
    jzz,
    navatasactive,
    // datas,
    roles, menuatas
  });
  // });
});

router.post("/saveaddcolorvariant", async function (req, res) {
  const cekauthoriz = await basicAuth(req.headers.authorization);
  //console.log(cekauthoriz);
  if (cekauthoriz != true || cekauthoriz != true) {
    return res.status(403).send("Unauthorized!");
  }

  var data = req.body;
  var bukawal = "saveaddcolorvariant";

  //console.log(data);

  const worker = new Worker("./worker/workereditdatabase.js", {
    workerData: { bukawal, data },
  });

  worker.on("message", (datas) => {
    res.status(200).send(datas);
    res.end();
  });
});

// delivery unit
router.get("/deliveryunit", function (req, res) {
  const cookies = req.cookies;
  var datausers;
  var userToken = cookies.hamburger;

  var rolesuser = "Supervisor"; //default
  if (userToken) {
    // Cookie tidak ditemukan
    datausers = JSON.parse(cookies.hamburger);

    console.log(datausers);

    rolesuser = datausers.tipeuser;
  } else {
    datausers = [];
    console.log(datausers);
  }

  var versionall = "?v=" + Math.random();
  var czz = "/css/adminlist.css" + versionall;
  var jzz = "editdatabase/editdatabase-deliveryunit";
  var diskripsi = "";
  var navatasactive = "editdatabase";

  var roles = rolesuser.toLowerCase();//"supervisor";

  // if (rolesuser.toLowerCase() == "supervisor") {
  //   //navatasactive='finance-banklimbo';
  //   roles = "supervisor";
  // }

  var menuatas = 'deliveryunit';
  // var bukawal = "awal";
  // const worker = new Worker("./worker/workeradminlist.js", {
  //   workerData: { bukawal },
  // });

  // worker.on("message", (datas) => {
  //   //res.status(200).send(datas);
  res.status(200).render("deliveryunit-editdatabase", {
    titlepage: "Database",
    diskripsi,
    czz,
    versionall,
    jzz,
    navatasactive,
    // datas,
    roles, menuatas
  });
  // });
});


//investor
router.get("/investor", function (req, res) {
  const cookies = req.cookies;
  var datausers;
  var userToken = cookies.hamburger;

  var rolesuser = "Supervisor"; //default
  if (userToken) {
    // Cookie tidak ditemukan
    datausers = JSON.parse(cookies.hamburger);

    console.log(datausers);

    rolesuser = datausers.tipeuser;
  } else {
    datausers = [];
    console.log(datausers);
  }

  var versionall = "?v=" + Math.random();
  var czz = "/css/adminlist.css" + versionall;
  var jzz = "editdatabase/editdatabase-investor";
  var diskripsi = "";
  var navatasactive = "editdatabase";

  var roles = rolesuser.toLowerCase();//"supervisor";

  // if (rolesuser.toLowerCase() == "supervisor") {
  //   //navatasactive='finance-banklimbo';
  //   roles = "supervisor";
  // }

  var menuatas = 'investor';
  // var bukawal = "awal";
  // const worker = new Worker("./worker/workeradminlist.js", {
  //   workerData: { bukawal },
  // });

  // worker.on("message", (datas) => {
  //   //res.status(200).send(datas);
  res.status(200).render("investor-editdatabase", {
    titlepage: "Database",
    diskripsi,
    czz,
    versionall,
    jzz,
    navatasactive,
    // datas,
    roles, menuatas
  });
  // });
});

router.post("/saveaddinvestor", async function (req, res) {
  const cekauthoriz = await basicAuth(req.headers.authorization);
  //console.log(cekauthoriz);
  if (cekauthoriz != true || cekauthoriz != true) {
    return res.status(403).send("Unauthorized!");
  }

  var data = req.body;
  var bukawal = "saveaddinvestor";

  //console.log(data);

  const worker = new Worker("./worker/workereditdatabase.js", {
    workerData: { bukawal, data },
  });

  worker.on("message", (datas) => {
    res.status(200).send(datas);
    res.end();
  });
});

//delete item
router.post("/deleteitem", async function (req, res) {
  const cekauthoriz = await basicAuth(req.headers.authorization);
  //console.log(cekauthoriz);
  if (cekauthoriz != true || cekauthoriz != true) {
    return res.status(403).send("Unauthorized!");
  }

  var data = req.body;
  var bukawal = "deleteitem";

  //console.log(data);

  const worker = new Worker("./worker/workereditdatabase.js", {
    workerData: { bukawal, data },
  });

  worker.on("message", (datas) => {
    res.status(200).send(datas);
    res.end();
  });
});


// itemprocurement
router.get("/itemprocurement", function (req, res) {
  const cookies = req.cookies;
  var datausers;
  var userToken = cookies.hamburger;

  var rolesuser = "Supervisor"; //default
  if (userToken) {
    // Cookie tidak ditemukan
    datausers = JSON.parse(cookies.hamburger);

    console.log(datausers);

    rolesuser = datausers.tipeuser;
  } else {
    datausers = [];
    console.log(datausers);
  }

  var versionall = "?v=" + Math.random();
  var czz = "/css/adminlist.css" + versionall;
  var jzz = "editdatabase/editdatabase-procurement";
  var diskripsi = "";
  var navatasactive = "editdatabase";

  var roles = rolesuser.toLowerCase();//"supervisor";

  // if (rolesuser.toLowerCase() == "supervisor") {
  //   //navatasactive='finance-banklimbo';
  //   roles = "supervisor";
  // }

  var menuatas = 'itemprocurement';
  // var bukawal = "awal";
  // const worker = new Worker("./worker/workeradminlist.js", {
  //   workerData: { bukawal },
  // });

  // worker.on("message", (datas) => {
  //   //res.status(200).send(datas);
  res.status(200).render("itemprocurement-editdatabase", {
    titlepage: "Database",
    diskripsi,
    czz,
    versionall,
    jzz,
    navatasactive,
    // datas,
    roles, menuatas
  });
  // });
});

router.post("/saveaddprocurement", async function (req, res) {
  const cekauthoriz = await basicAuth(req.headers.authorization);
  //console.log(cekauthoriz);
  if (cekauthoriz != true || cekauthoriz != true) {
    return res.status(403).send("Unauthorized!");
  }

  var data = req.body;
  var bukawal = "saveaddprocurement";

  console.log(data);

  const worker = new Worker("./worker/workereditdatabase.js", {
    workerData: { bukawal, data },
  });

  worker.on("message", (datas) => {
    res.status(200).send(datas);
    res.end();
  });
});

router.post("/saveeditprocurement", async function (req, res) {
  const cekauthoriz = await basicAuth(req.headers.authorization);
  //console.log(cekauthoriz);
  if (cekauthoriz != true || cekauthoriz != true) {
    return res.status(403).send("Unauthorized!");
  }

  var data = req.body;
  var bukawal = "saveeditprocurement";

  //console.log(data);

  const worker = new Worker("./worker/workereditdatabase.js", {
    workerData: { bukawal, data },
  });

  worker.on("message", (datas) => {
    res.status(200).send(datas);
    res.end();
  });
});

// office
router.get("/office", function (req, res) {
  const cookies = req.cookies;
  var datausers;
  var userToken = cookies.hamburger;

  var rolesuser = "Supervisor"; //default
  if (userToken) {
    // Cookie tidak ditemukan
    datausers = JSON.parse(cookies.hamburger);

    console.log(datausers);

    rolesuser = datausers.tipeuser;
  } else {
    datausers = [];
    console.log(datausers);
  }

  var versionall = "?v=" + Math.random();
  var czz = "/css/adminlist.css" + versionall;
  var jzz = "editdatabase/editdatabase-office";
  var diskripsi = "";
  var navatasactive = "editdatabase";

  var roles = rolesuser.toLowerCase();//"supervisor";

  // if (rolesuser.toLowerCase() == "supervisor") {
  //   //navatasactive='finance-banklimbo';
  //   roles = "supervisor";
  // }

  var menuatas = 'office';
  // var bukawal = "awal";
  // const worker = new Worker("./worker/workeradminlist.js", {
  //   workerData: { bukawal },
  // });

  // worker.on("message", (datas) => {
  //   //res.status(200).send(datas);
  res.status(200).render("office-editdatabase", {
    titlepage: "Database",
    diskripsi,
    czz,
    versionall,
    jzz,
    navatasactive,
    // datas,
    roles, menuatas
  });
  // });
});


router.post("/saveaddoffice", async function (req, res) {
  const cekauthoriz = await basicAuth(req.headers.authorization);
  //console.log(cekauthoriz);
  if (cekauthoriz != true || cekauthoriz != true) {
    return res.status(403).send("Unauthorized!");
  }

  var data = req.body;
  var bukawal = "saveaddoffice";

  console.log(data);

  const worker = new Worker("./worker/workereditdatabase.js", {
    workerData: { bukawal, data },
  });

  worker.on("message", (datas) => {
    res.status(200).send(datas);
    res.end();
  });
});

router.post("/saveeditoffice", async function (req, res) {
  const cekauthoriz = await basicAuth(req.headers.authorization);
  //console.log(cekauthoriz);
  if (cekauthoriz != true || cekauthoriz != true) {
    return res.status(403).send("Unauthorized!");
  }

  var data = req.body;
  var bukawal = "saveeditoffice";

  //console.log(data);

  const worker = new Worker("./worker/workereditdatabase.js", {
    workerData: { bukawal, data },
  });

  worker.on("message", (datas) => {
    res.status(200).send(datas);
    res.end();
  });
});

//vendor
router.get("/vendor", function (req, res) {
  const cookies = req.cookies;
  var datausers;
  var userToken = cookies.hamburger;

  var rolesuser = "Supervisor"; //default
  if (userToken) {
    // Cookie tidak ditemukan
    datausers = JSON.parse(cookies.hamburger);

    console.log(datausers);

    rolesuser = datausers.tipeuser;
  } else {
    datausers = [];
    console.log(datausers);
  }

  var versionall = "?v=" + Math.random();
  var czz = "/css/adminlist.css" + versionall;
  var jzz = "editdatabase/editdatabase-vendor";
  var diskripsi = "";
  var navatasactive = "editdatabase";

  var roles = rolesuser.toLowerCase();//"supervisor";

  // if (rolesuser.toLowerCase() == "supervisor") {
  //   //navatasactive='finance-banklimbo';
  //   roles = "supervisor";
  // }

  var menuatas = 'vendor';
  // var bukawal = "awal";
  // const worker = new Worker("./worker/workeradminlist.js", {
  //   workerData: { bukawal },
  // });

  // worker.on("message", (datas) => {
  //   //res.status(200).send(datas);
  res.status(200).render("vendor-editdatabase", {
    titlepage: "Database",
    diskripsi,
    czz,
    versionall,
    jzz,
    navatasactive,
    // datas,
    roles, menuatas
  });
  // });
});


router.post("/saveaddvendor", async function (req, res) {
  const cekauthoriz = await basicAuth(req.headers.authorization);
  //console.log(cekauthoriz);
  if (cekauthoriz != true || cekauthoriz != true) {
    return res.status(403).send("Unauthorized!");
  }

  var data = req.body;
  var bukawal = "saveaddvendor";

  console.log(data);

  const worker = new Worker("./worker/workereditdatabase.js", {
    workerData: { bukawal, data },
  });

  worker.on("message", (datas) => {
    res.status(200).send(datas);
    res.end();
  });
});

router.post("/saveeditvendor", async function (req, res) {
  const cekauthoriz = await basicAuth(req.headers.authorization);
  //console.log(cekauthoriz);
  if (cekauthoriz != true || cekauthoriz != true) {
    return res.status(403).send("Unauthorized!");
  }

  var data = req.body;
  var bukawal = "saveeditvendor";

  //console.log(data);

  const worker = new Worker("./worker/workereditdatabase.js", {
    workerData: { bukawal, data },
  });

  worker.on("message", (datas) => {
    res.status(200).send(datas);
    res.end();
  });


});


//coa
router.get("/coa", function (req, res) {
  const cookies = req.cookies;
  var datausers;
  var userToken = cookies.hamburger;

  var rolesuser = "Supervisor"; //default
  if (userToken) {
    // Cookie tidak ditemukan
    datausers = JSON.parse(cookies.hamburger);

    console.log(datausers);

    rolesuser = datausers.tipeuser;
  } else {
    datausers = [];
    console.log(datausers);
  }

  var versionall = "?v=" + Math.random();
  var czz = "/css/adminlist.css" + versionall;
  var jzz = "editdatabase/editdatabase-coa";
  var diskripsi = "";
  var navatasactive = "editdatabase";

  var roles = "supervisor";

  if (rolesuser.toLowerCase() == "supervisor") {
    //navatasactive='finance-banklimbo';
    roles = rolesuser.toLowerCase();//"supervisor";
  }

  var menuatas = 'coa';
  // var bukawal = "awal";
  // const worker = new Worker("./worker/workeradminlist.js", {
  //   workerData: { bukawal },
  // });

  // worker.on("message", (datas) => {
  //   //res.status(200).send(datas);
  res.status(200).render("coa-editdatabase", {
    titlepage: "Database",
    diskripsi,
    czz,
    versionall,
    jzz,
    navatasactive,
    // datas,
    roles, menuatas
  });
  // });
});


router.post("/saveaddcoa", async function (req, res) {
  const cekauthoriz = await basicAuth(req.headers.authorization);
  //console.log(cekauthoriz);
  if (cekauthoriz != true || cekauthoriz != true) {
    return res.status(403).send("Unauthorized!");
  }

  var data = req.body;
  var bukawal = "saveaddcoa";

  console.log(data);

  const worker = new Worker("./worker/workereditdatabase.js", {
    workerData: { bukawal, data },
  });

  worker.on("message", (datas) => {
    res.status(200).send(datas);
    res.end();
  });
});

router.post("/saveeditcoa", async function (req, res) {
  const cekauthoriz = await basicAuth(req.headers.authorization);
  //console.log(cekauthoriz);
  if (cekauthoriz != true || cekauthoriz != true) {
    return res.status(403).send("Unauthorized!");
  }

  var data = req.body;
  var bukawal = "saveeditcoa";

  //console.log(data);

  const worker = new Worker("./worker/workereditdatabase.js", {
    workerData: { bukawal, data },
  });

  worker.on("message", (datas) => {
    res.status(200).send(datas);
    res.end();
  });
});


//pendingpayment
router.get("/pendingpayment", function (req, res) {
  const cookies = req.cookies;
  var datausers;
  var userToken = cookies.hamburger;

  var rolesuser = "Supervisor"; //default
  if (userToken) {
    // Cookie tidak ditemukan
    datausers = JSON.parse(cookies.hamburger);

    console.log(datausers);

    rolesuser = datausers.tipeuser;
  } else {
    datausers = [];
    console.log(datausers);
  }

  var versionall = "?v=" + Math.random();
  var czz = "/css/adminlist.css" + versionall;
  var jzz = "editdatabase/editdatabase-pendingpayment";
  var diskripsi = "";
  var navatasactive = "editdatabase";

  var roles = rolesuser.toLowerCase();//""supervisor";

  // if (rolesuser.toLowerCase() == "supervisor") {
  //   //navatasactive='finance-banklimbo';
  //   roles = "supervisor";
  // }

  var menuatas = 'pendingpayment';
  // var bukawal = "awal";
  // const worker = new Worker("./worker/workeradminlist.js", {
  //   workerData: { bukawal },
  // });

  // worker.on("message", (datas) => {
  //   //res.status(200).send(datas);
  res.status(200).render("pendingpayment-editdatabase", {
    titlepage: "Database",
    diskripsi,
    czz,
    versionall,
    jzz,
    navatasactive,
    // datas,
    roles, menuatas
  });
  // });
});


router.post("/saveaddpendingpayment", async function (req, res) {
  const cekauthoriz = await basicAuth(req.headers.authorization);
  //console.log(cekauthoriz);
  if (cekauthoriz != true || cekauthoriz != true) {
    return res.status(403).send("Unauthorized!");
  }

  var data = req.body;
  var bukawal = "saveaddpendingpayment";

  console.log(data);

  const worker = new Worker("./worker/workereditdatabase.js", {
    workerData: { bukawal, data },
  });

  worker.on("message", (datas) => {
    res.status(200).send(datas);
    res.end();
  });
});

router.post("/saveeditpendingpayment", async function (req, res) {
  const cekauthoriz = await basicAuth(req.headers.authorization);
  //console.log(cekauthoriz);
  if (cekauthoriz != true || cekauthoriz != true) {
    return res.status(403).send("Unauthorized!");
  }

  var data = req.body;
  var bukawal = "saveeditpendingpayment";

  //console.log(data);

  const worker = new Worker("./worker/workereditdatabase.js", {
    workerData: { bukawal, data },
  });

  worker.on("message", (datas) => {
    res.status(200).send(datas);
    res.end();
  });
});

//riwayat
router.get("/logedit", function (req, res) {
  const cookies = req.cookies;
  var datausers;
  var userToken = cookies.hamburger;

  var rolesuser = "Supervisor"; //default
  if (userToken) {
    // Cookie tidak ditemukan
    datausers = JSON.parse(cookies.hamburger);

    console.log(datausers);

    rolesuser = datausers.tipeuser;
  } else {
    datausers = [];
    console.log(datausers);
  }

  var versionall = "?v=" + Math.random();
  var czz = "/css/adminlist.css" + versionall;
  var jzz = "editdatabase/editdatabase-logedit";
  var diskripsi = "";
  var navatasactive = "editdatabase";

  var roles = rolesuser.toLowerCase();//""supervisor";

  // if (rolesuser.toLowerCase() == "supervisor") {
  //   //navatasactive='finance-banklimbo';
  //   roles = "supervisor";
  // }

  var menuatas = 'logedit';
  // var bukawal = "awal";
  // const worker = new Worker("./worker/workeradminlist.js", {
  //   workerData: { bukawal },
  // });

  // worker.on("message", (datas) => {
  //   //res.status(200).send(datas);
  res.status(200).render("logedit-editdatabase", {
    titlepage: "Database",
    diskripsi,
    czz,
    versionall,
    jzz,
    navatasactive,
    // datas,
    roles, menuatas
  });
  // });
});

export default router;
