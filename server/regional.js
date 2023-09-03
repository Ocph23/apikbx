const express = require('express');
const router = express.Router();
var connection = require("./database");
var middleware = require('./middleware');
const helper = require('./helper');


router.get("/", (req, res) => {
    connection.query(
        "SELECT * FROM regional",
        function (err, rows) {
            if (err)
                return res.status(400).json({ message: err.message, error: err });
            res.send(rows);

        }
    );
});

router.get("/withkanwil", (req, res) => {
    connection.query(
        "SELECT regional.id as regional_id, regional.name as regional_name, kanwil.* FROM regional left join kanwil on regional.id = kanwil.regionalid;",
        function (err, rows) {
            if (!err && rows.length > 0) {
                const result = helper.groupBy('regional_name', rows);
                return res.send(result);
            } else
                return res.status(400).json({ message: "Data tidak ditemukan ", error: err });
        }
    );
});

router.get("/:id", middleware.authenticateToken, (req, res) => {
    connection.query(
        "SELECT regional.id as regional_id, regional.name as regional_name, kanwil.* FROM regional left join kanwil on regional.id = kanwil.regionalid where regional.id=?;", req.params.id,
        function (err, rows) {
            if (!err && rows.length > 0) {
                const result = helper.groupBy('regional_name', rows);
                return res.send(result[0]);

            } else
                return res.status(400).json({ message: "Data tidak ditemukan ", error: err });
        }
    );
});

router.post("/", middleware.authenticateToken, (req, res) => {
    const filters = req.query;
    var data = req.body;
    connection.query("insert into regional SET ?",
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


router.put("/", middleware.authenticateToken, (req, res) => {
    var data = req.body;
    connection.query("update regional SET ? where id=?",
        [data, data.id], (err, rows) => {
            if (err) {
                return res.status(500).json({ message: 'Gagal insert data!', error: err });
            }
            res.status(201).json({ success: true, message: 'Berhasil insert data!' });
        }
    );
});


router.delete("/:id", middleware.authenticateToken, (req, res) => {
    connection.query("delete from regional where id=?", req.params.id,
        (err, rows) => {
            if (err) {
                return res.status(500).json({ message: 'Gagal insert data!', error: err });
            }
            res.status(201).json({ success: true, message: 'Berhasil insert data!' });
        }
    );
});


module.exports = router; 