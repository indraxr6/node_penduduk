'use strict'
const db = require('../db');
module.exports = {
          index: (req, res) => {
                    const  sql = "SELECT * FROM data_penduduk";
                    db.query(sql, (err, result) => {
                              if (err) throw err
                              res.json({
                                        message: 'success',
                                        data: result
                              })
                    })

          },
          add: (req, res) => {
                    let data = {
                              name: req.body.name,
                              address: req.body.address,
                              nik: req.body.nik,
                    }
                    let sql = "INSERT INTO data_penduduk SET ?";
                    if(data.name && data.address && data.nik){
                              db.query(sql, data, (err, result) => {
                                        if (err) throw err
                                        res.json({
                                                  message: 'success add data',
                                                  data: result
                                        })
                              })
                    }

          },
          delete: (req, res) => {
                    let id  = req.body.id;
                    let data;
                    if(id){
                              let sql = "SELECT * FROM data_penduduk WHERE id = ?";
                              db.query(sql, id, (err, result) => {
                                        if (err) {
                                                  throw err 
                                        }else{
                                                  data = result;
                                        }
                    })
          }
          if(id){
                    let sql = "DELETE FROM data_penduduk WHERE id = ?";
                    db.query(sql, id, (err) => {
                              if (err) {
                                        throw err
                              }else {
                                        res.json({
                                                  message: `success delete data, ID =  ${id}.`,
                                                  data : data[0]
                                        })
                              }
                    })
                    }
          },
          put: (req, res) => {
                    let id = req.body.id;
                    let data_new = {
                              name: req.body.name,
                              address: req.body.address,
                              nik: req.body.nik,
                    }
                    let data_old;

                    if(id){
                              let sql = "SELECT name, address, nik FROM data_penduduk WHERE id = ?";
                              db.query(sql, [id], (err, result) => {
                                        if (err) {
                                                  throw err
                                        }else{
                                                  data_old = result;
                                        }
                              })

                    }
                    setTimeout(update, 1);
                    function update(){
                              if(data_old){
                                        let sql = "UPDATE data_penduduk SET ? WHERE id = ?";
                                        db.query(sql, [data_new, id], (err, result) => {
                                                  if (err) {
                                                            throw err
                                                  }else{
                                                            res.json({
                                                                      message: `success update data, ID = ${id}.`,
                                                                      data_old: data_old[0],
                                                                      data_new: data_new
                                                            })
                                                  }
                                        })
                              }
                    }
          }         
}