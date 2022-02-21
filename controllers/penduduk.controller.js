"use strict";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "#@$%^&*()_+";
const db = require("../db");

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

//LOGIN & REGISTER

module.exports = {
  registrasi: (req, res) => {
    const { nama_lengkap, email, password } = req.body;
    if ((!nama_lengkap, !email || !password))
      res.status(402).json({ message: "Data tidak lengkap" });

    return db.query(
      "insert into pengguna set?",
      { nama_lengkap, email, password: hashPassword(password) },
      (err, result) => {
        if (err) return res.status(500).json({ err });

        return res.json({ message: "Berhasil mendaftar" });
      }
    );
  },

  login: (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(402).json({ message: "Data tidak lengkap" });

    return db.query(
      "select * from pengguna where email = ?",
      email,
      (err, result) => {
        if (err) return res.status(500).json({ err });

        const user = result[0];
        // const p = user.password;
        // const x = bcrypt.compareSync(password, user.password);
        if (typeof user === "undefined")
          return res.status(401).json({ message: "Email tidak terdaftar" });
        if (!bcrypt.compareSync(password, user.password))
          return res.status(401).json({ message: "Kredensial salah" });

        const token = jwt.sign({ data: user }, secret);
        return res.json({ message: "Berhasil login, akses token", token });
      }
    );
  },
  logout: (req, res) => {
    
      if (req.session.loggedin === true) {
        req.session.loggedin = false;
      }
      res.json({
        message: "Telah logout",
      });
    
  },
  getUser: (req, res) => {
    const sql = "SELECT * FROM pengguna";
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.json({
        message: "get all data",
        data: result,
      });
    });
  },

  //CRUD DATA

  index: (req, res) => {
    const sql = "SELECT * FROM data_penduduk";
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.json({
        message: "get all data",
        data: result,
      });
    });
  },
  add: (req, res) => {
    let data = {
      name: req.body.name,
      address: req.body.address,
      nik: req.body.nik,
    };
    let sql = "INSERT INTO data_penduduk SET ?";
    if (data.name && data.address && data.nik) {
      db.query(sql, data, (err, result) => {
        if (err) throw err;
        res.json({
          message: "success add data",
          data: result,
        });
      });
    }
  },
  delete: (req, res) => {
    let id = req.body.id;
    let data;
    if (id) {
      let sql = "SELECT * FROM data_penduduk WHERE id = ?";
      db.query(sql, id, (err, result) => {
        if (err) {
          throw err;
        } else {
          data = result;
        }
      });
    }
    if (id) {
      let sql = "DELETE FROM data_penduduk WHERE id = ?";
      db.query(sql, id, (err) => {
        if (err) {
          throw err;
        } else {
          res.json({
            message: `success delete data, ID =  ${id}.`,
            data: data[0],
          });
        }
      });
    }
  },
  //   put: (req, res) => {
  //             const id = req.params.id
  //             let penduduk = {
  //                 name: req.body.nama,
  //                 address: req.body.alamat,
  //                 nik: req.body.nik
  //             }
  //             db.query(`update data_penduduk set ? where id = '${id}'`, penduduk, (err, results) => {
  //                 let response = null
  //                 if (err) {
  //                     response = {
  //                         message: err.message
  //                     }
  //                 } else {
  //                     res.send({
  //                         message: "Berhasil Update Data",
  //                         data: results
  //                     })
  //                 }
  //             })
  //         }

  put: (req, res) => {
    let id = req.body.id;
    // let id = req.params.id;

    let data_new = {
      name: req.body.name,
      address: req.body.address,
      nik: req.body.nik,
    };
    let data_old;

    if (id) {
      let sql = "SELECT name, address, nik FROM data_penduduk WHERE id = ?";
      db.query(sql, [id], (err, result) => {
        if (err) {
          throw err;
        } else {
          data_old = result;
        }
      });
    }
    setTimeout(update, 1);
    function update() {
      if (data_old) {
        let sql = "UPDATE data_penduduk SET ? WHERE id = ?";
        db.query(sql, [data_new, id], (err, result) => {
          if (err) {
            throw err;
          } else {
            res.json({
              message: `success update data, ID = ${id}.`,
              data_old: data_old[0],
              data_new: data_new,
            });
          }
        });
      }
    }
  },
};
