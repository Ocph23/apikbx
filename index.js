const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

var connection = require("./server/database");

app.use("/", express.static("./"));

app.get("/api/penjualan", (req, res) => {
  connection.query(
    "SELECT * FROM penjualan ORDER BY id desc",
    function (err, rows) {
      res.send(rows);
    }
  );
});

app.post("/api/penjualan", (req, res) => {
  var data = req.body;
  data.tanggal = new Date(data.tanggal);
  connection.query("insert into penjualan SET ?",
    data, (err, rows)=> {
      if(err){
        return res.status(500).json({ message: 'Gagal insert data!', error: err });
      }
      res.status(201).json({ success: true, message: 'Berhasil insert data!' });
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
