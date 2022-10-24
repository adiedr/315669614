const sql = require("./db");
var path=require('path');

const createNewCustomer = (req,res)=>{
    if (!req.body) {//if the form is empty
        res.status(400).send({
        message: "Content can not be empty!"
        });
        return;
    }
    var newUser = req.body.userName;
    sql.query("SELECT * FROM customers WHERE userName=?",newUser,(err,mysqlres)=>{
        if(err){
            console.log("error: "+ err);
            res.status(400).send({message: "error in creating customer: " + err});
            return;
        }
        const newCustomer= {
            "userName":req.body.userName,
            "password":req.body.password,
            "fullName":req.body.fullName,
            "email":req.body.email,
            "birthday":req.body.birthday,
            "height":req.body.height,
            "weight":req.body.weight
        };
        sql.query("INSERT INTO customers SET ?",newCustomer,(err,mysqlres)=>{
            if(err){
                console.log("error: "+ err);
                res.status(400).send({message: "error in creating customer: " + err});
                return;
            }
            const Customer = {
            "customer":req.body.userName,
            "kite":req.body.kites
            }
            sql.query("INSERT INTO CUSTOMERSKITES SET ?",Customer,(err,mysqlres)=>{
            if(err){
                console.log("error: "+ err);
                res.status(400).send({message:err});
                return;
            }
            return;
            })
            res.render('signIn',{
                variable:"!משתמש נוצר בהצלחה"
            });
            return ;  
        })

    });
};
const signIn = (req,res)=>{
    if (!req.body) {//if the form is empty
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    var User = req.body.userName;
    sql.query("SELECT * FROM customers WHERE userName=?", User,(err,mysqlres)=>{
        if(err){
            console.log("error: "+ err);
            res.status(400).send({message: "error:" + err});
            return;
        };
        if(mysqlres.length>0){
            var password = mysqlres[0].password;
            if(password==req.body.password){
                res.cookie('userName', mysqlres[0].userName).redirect('MySites');
                return;
            }
            else{
            console.log("wrong password");
            };
        }
        else{
        console.log("wrong user name");}
    });
};

const addSite=(req,res)=>{
    if (!req.body) {//if the form is empty
        res.status(400).send({});
        return;
    }
    var site = {
        'userName':req.cookies?.userName,
        'lat':req.body.lat,
        'lng':req.body.lng,
        'siteName':req.body.locationName
    }
    sql.query("INSERT INTO SITES SET ?",site,(err,mysqlres)=>{
        if(err){
            console.log("error: "+ err);
            res.status(400).send({message: "error: " + err});
            return;
        }
        res.redirect('MySites');
        return;  
    })
};

const update=(req,res)=>{
    var x = req.body.changes;
    for (var key in req.body) {
        if (x==key) {
          item = req.body[key];
        }
    }
    if(req.body.changes=='kite'){
        var query = "INSERT INTO customerskites VALUES('"+req.cookies.userName+"',"+item+")";
    }else if(req.body.changes=='deleteKite'){
        var query = "DELETE FROM customerskites WHERE kite="+req.body.deleteKite;
    }else{
        var query = "UPDATE customers SET "+req.body.changes+"='"+item+"' WHERE userName='"+req.cookies.userName+"'";
    }
    sql.query(query,(err,mysqlres)=>{
        if(err){
            console.log("error: "+ err);
            res.status(400).send({message: "error: " + err});
            return;
        }
        return;
    })
    var query = "SELECT * FROM customerskites WHERE customer='"+req.cookies.userName+"'";
    sql.query(query,(err,mysqlres)=>{
        if(err){
            console.log("error: "+ err);
            res.status(400).send({message: "error" + err});
            return;
        }
        var array = mysqlres;
        res.render('Settings',{
            variable1:" !הפעולה התבצעה בהצלחה",
            kites:array
        });
    })
};

const getSiteByName=(req,res)=>{
    var query = "SELECT  * FROM SITES WHERE siteName='"+req.query.siteName+"' and userName='"+req.cookies?.userName+"'"+" limit 1";
    sql.query(query,(err,mysqlres)=>{
        if(err){
            console.log("error: "+ err);
            res.status(400).send({message: "error" + err});
            return;
        }
        res.status(200).json(mysqlres);
    })
};

const userDetails=(req,res)=>{
    var query = "SELECT  * FROM customers WHERE userName='"+req.cookies?.userName+"'"+" limit 1";
    sql.query(query,(err,mysqlres)=>{
        if(err){
            console.log("error: "+ err);
            res.status(400).send({message: "error" + err});
            return;
        }
        res.status(200).json(mysqlres);
    })
}
const userKites=(req,res)=>{
    var query = "SELECT  * FROM customerskites WHERE customer='"+req.cookies?.userName+"'";
    sql.query(query,(err,mysqlres)=>{
        if(err){
            console.log("error: "+ err);
            res.status(400).send({message: "error" + err});
            return;
        }
        res.status(200).json(mysqlres);
    })
};

const deleteSite=(req,res)=>{
    if (!req.body) {//if the form is empty
        res.status(400).send({
        });
        return;
    }
    var query = "DELETE FROM SITES WHERE lat="+req.body.lat+"and lng="+req.body.lng;
    sql.query(query,(err,mysqlres)=>{
        if(err){
            console.log("error: "+ err);
            res.status(400).send({message: "error" + err});
            return;
        }
        res.redirect('MySites');
        return;
    })
}
const internationalWeather=(req,res)=>{
    if (!req.body) {
        res.status(400).send({
        });
        return;
    }
    var query = "SELECT * FROM INTERNATIONALSITES ORDER BY RAND() LIMIT 3";
    sql.query(query,(err,mysqlres)=>{
        if(err){
            console.log("error: "+ err);
            res.status(400).send({message: "error" + err});
            return;
        }
        res.status(200).json(mysqlres);
    })
}
module.exports={createNewCustomer,signIn,addSite,update,getSiteByName,userDetails,userKites,deleteSite,internationalWeather};