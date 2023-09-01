const express = require('express');
const router = express.Router();
var connection = require("./database");

var middleware = require('./middleware');

router.get("/bypenjualan/:id", middleware.authenticateToken, (req, res) => {
    connection.query(
        "SELECT * FROM penjualan where id=?", req.params.id,
        function (err, rows) {
            var penjualan = rows[0];
            connection.query(
                "SELECT * FROM tracking where penjualanid=?", penjualan.id,
                function (err, rows) {
                    if (!err) {
                        penjualan.tracking = rows;
                        res.send(penjualan);
                    } else {
                        return res.status(500).json({ message: "Maaf terjadi kesalahan !, coba ulangi lagi", error: err });
                    }
                }
            );
        }
    );
});


router.get("/:id", middleware.authenticateToken, (req, res) => {
    connection.query(
        "SELECT * FROM tracking where id=?", req.params.id,
        function (err, rows) {
            res.send(rows[0]);
        }
    );
});

router.post("/",  middleware.authenticateToken,(req, res) => {
    const filters = req.query;
    var data = req.body;

    data.tanggal = new Date(data.tanggal);
    data.created = new Date();
    connection.query("insert into tracking SET ?",
        data, (err, rows) => {
            if (err) {
                message = 'Gagal insert data!';
                if (err.errno == 1062)
                    message = "Gagal insert data!,  Data sudah ada !";
                return res.status(500).json({ message: message, error: err });
            }
            res.status(201).json({ success: true, message: 'Berhasil insert data!' });
        }
    );
});


router.put("/",  middleware.authenticateToken,(req, res) => {
    var data = req.body;
    data.updated = new Date();
    data.tanggal = new Date(data.tanggal);
    data.created = new Date(data.created);
    connection.query("update tracking SET ? where id=?",
        [data, data.id], (err, rows) => {
            if (err) {
                return res.status(500).json({ message: 'Gagal insert data!', error: err });
            }
            res.status(201).json({ success: true, message: 'Berhasil insert data!' });
        }
    );
});



router.delete("/:id", middleware.authenticateToken, (req, res) => {
    connection.query("delete from tracking where id=?", req.params.id,
        (err, rows) => {
            if (err) {
                return res.status(500).json({ message: 'Gagal insert data!', error: err });
            }
            res.status(201).json({ success: true, message: 'Berhasil insert data!' });
        }
    );
});


module.exports = router; 