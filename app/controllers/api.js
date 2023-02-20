
import config  from "../config/db.config.js";
import mysql from "mysql"
import bcrypt from 'bcrypt'
import moment from "moment";


const db = mysql.createConnection(config)

export const get = async (req,res,next) => { 
    
    const q = 'Select * From customer'
    db.query(q,(err,result)=>{

        if(err){
            return res.json(err)
        }else{
            return res.json(result)
        }

    })}


export const post = async (req,res,next) => { 
    const q = "insert into customer (`Email`, `Password`, `EncryptedPassword`,`Number`, `Date`,`CNIC` ) values (?)"
    
    //var EncryptedPassword;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.Password, salt, function(err, hash) {

            const pattern = /^[A-Za-z._]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/
            if(!pattern.test(req.body.Email))
             {
                return res.send('Email formate is not correct');
             }

            
         const EncryptedPassword = hash;            
          const values = [
            req.body.Email, 
            req.body.Password,
            EncryptedPassword,
            req.body.Number,
            moment(req.body.Date, "YYYY-MM-DD", true).isValid() ? req.body.Date : moment(req.body.Date).format('YYYY-MM-DD'),
            req.body.CNIC,
        ]
    
    db.query(q,[values], (err,result) =>{
        if(err){
            return res.json(err)
        }else{
            return res.json("Customer has been created ")
        }
    })

            console.log(moment(req.body.Date, "YYYY-MM-DD", true).isValid())
            console.log(values)            
        });
    });
}

export const Delete = async (req,res,next) => { 
    console.log("inside delete")
    const id = req.params.id;
    const q = 'delete from customer where id = ?'
    
    db.query(q,[id], (err,result) =>{
        if(err){
            return res.json(err)
        }else{
            return res.json(" customer has been deleted ")
        }
    })
}

export const update = async (req,res,next) => { 
    
    const id = req.params.id;
    const q = 'update customer set `email` = ?, `password` = ? , `encryptedpassword` = ? , `number`=?, `date`=?, `cnic` = ? where id = ?'
    
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.Password, salt, function(err, hash) {

            const pattern = /^[A-Za-z._]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/
            if(!pattern.test(req.body.Email))
             {
                return res.send('Email formate is not correct');
             }

         const EncryptedPassword = hash;            
          const values = [
            req.body.Email, 
            req.body.Password,
            EncryptedPassword,
            req.body.Number,
            moment(req.body.Date, "YYYY-MM-DD", true).isValid() ? req.body.Date : moment(req.body.Date).format('YYYY-MM-DD'),
            req.body.CNIC,
        ]
    
    db.query(q,[...values, id], (err,result) =>{
        if(err){
            return res.json(err)
        }else{
            return res.json(" Customer has been updated ")
        }
    })
    console.log(moment(req.body.Date, "YYYY-MM-DD", true).isValid())
    console.log(values)            
   });

  });
}