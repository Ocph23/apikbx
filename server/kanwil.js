const express = require('express');
const router = express.Router();
var connection = require("./database");
var middleware = require('./middleware');


router.get("/:id", middleware.authenticateToken, (req, res) => {
    connection.query(
        "SELECT * FROM kanwil where id=?", req.params.id,
        function (err, rows) {
            res.send(rows[0]);
        }
    );
});

router.post("/", middleware.authenticateToken, (req, res) => {
    const filters = req.query;
    var data = req.body;
    connection.query("insert into kanwil SET ?",
        data, (err, rows) => {
            if (err) {
                message = 'Gagal insert data!';
                if (err.errno == 1062)
                    message = "Gagal insert data!,  Data sudah ada !";
                return res.status(500).json({ message: message, error: err });
            }
            res.status(201).json({ success: true, data: rows.insertId, message: 'Berhasil insert data!' });
        }
    );
});


router.put("/:id", middleware.authenticateToken, (req, res) => {
    var data = req.body;
    delete data.regional_id;
    delete data.regional_name;
    connection.query("update kanwil SET ? where id=?",
        [data, req.params.id], (err, rows) => {
            if (err) {
                return res.status(500).json({ message: 'Gagal insert data!', error: err });
            }
            res.status(201).json({ success: true, message: 'Berhasil insert data!' });
        }
    );
});


router.delete("/:id", middleware.authenticateToken, (req, res) => {
    connection.query("delete from kanwil where id=?", req.params.id,
        (err, rows) => {
            if (err) {
                return res.status(500).json({ message: 'Gagal insert data!', error: err });
            }
            res.status(201).json({ success: true, message: 'Berhasil insert data!' });
        }
    );
});


module.exports = router; 