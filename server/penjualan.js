const express = require('express');
const router = express.Router();
var connection = require("./database");
var middleware = require('./middleware')
var helper = require('./helper')

router.get("/penjualan/search/:searchText", middleware.authenticateToken, (req, res) => {
    const filters = req.params.searchText;
    var query = "select * from penjualan ";
    if (filters) {
        query += "where stt like '%" + 
        filters + "%'  or  pengirim_nama like '%" + 
        filters + "%' or  penerima_nama like '%" +
        filters + "%' or  asal like '%" +
        filters + "%' or  tujuan like '%" +
        filters + "%' ; ";
    }
    connection.query(
        query,
        function (err, rows) {
            if (err) {
                helper.logger.log("error", err.message)
            }
            res.send(rows);
        }
    );
});



router.get("/penjualan/date", middleware.authenticateToken, (req, res) => {
    const filters = req.query;
    var query = `select * from penjualan where month(tanggal)=${Number(filters.month)+1} and year(tanggal)=${filters.year}  order by stt DESC`;
    connection.query(
        query,[filters.month+1, filters.year],
        function (err, rows) {
            if (err) {
                helper.logger.log("error", err.message)
            }
            res.send(rows);
        }
    );
});




router.get("/penjualan", middleware.authenticateToken, (req, res) => {
    var query = "select * from penjualan order by stt DESC LIMIT 20";
    connection.query(
        query,
        function (err, rows) {
            if (err) {
                helper.logger.log("error", err.message)
            }

            res.send(rows);
        }
    );
});


router.get("/penjualan/:id", middleware.authenticateToken, (req, res) => {
    connection.query(
        "SELECT * FROM penjualan where id=?", req.params.id,
        function (err, rows) {
            res.send(rows[0]);
        }
    );
});

router.post("/penjualan", middleware.authenticateToken, (req, res) => {
    var data = req.body;
    data.tanggal = new Date(data.tanggal);
    data.created = new Date();
    connection.query("insert into penjualan SET ?",
        data, (err, rows) => {
            if (err) {
                message = 'Gagal insert data!';
                if (err.errno == 1062)
                    message = "Gagal insert data!, '" + data.stt + "'  Data sudah ada !";
                return res.status(500).json({ message: message, error: err });
            }
            res.status(201).json({ success: true, message: 'Berhasil insert data!' });
        }
    );
});


router.put("/penjualan", middleware.authenticateToken, (req, res) => {
    var data = req.body;
    data.updated = new Date();
    data.tanggal = new Date(data.tanggal);
    data.created = new Date(data.created);
    connection.query("update penjualan SET ? where id=?",
        [data, data.id], (err, rows) => {
            if (err) {
                return res.status(500).json({ message: 'Gagal insert data!', error: err });
            }
            res.status(201).json({ success: true, message: 'Berhasil insert data!' });
        }
    );
});


module.exports = router; 