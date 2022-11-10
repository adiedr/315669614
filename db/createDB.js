var SQL = require('./db');
const path = require('path');
const csv=require('csvtojson');


const CreateTables = (req,res)=> {
    var Q1 = "DROP TABLE IF EXISTS customers; CREATE TABLE customers (userName varchar(25) NOT NULL,password varchar(25) NOT NULL, fullName varchar(30) NOT NULL,email varchar(50) NOT NULL,birthday date DEFAULT NULL,height int DEFAULT NULL,weight int DEFAULT NULL,PRIMARY KEY (userName),UNIQUE KEY ak_customers (email))"
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created table');
        res.send("table created");
        return;
    })     
    var Q2 = "DROP TABLE IF EXISTS customerskites; CREATE TABLE customerskites (customer varchar(25) NOT NULL,kite int NOT NULL,PRIMARY KEY (customer,kite),CONSTRAINT customerskites_ibfk_1 FOREIGN KEY (customer) REFERENCES customers (userName))"
      SQL.query(Q2,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created table');
        res.send("table created");
        return;
    }) 
    var Q3 = "DROP TABLE IF EXISTS sites; CREATE TABLE sites (userName varchar(25) NOT NULL,lat double NOT NULL,lng double NOT NULL,siteName varchar(255) DEFAULT NULL,PRIMARY KEY (userName,lat,lng))"
        SQL.query(Q3,(err,mySQLres)=>{
      if (err) {
          console.log("error ", err);
          res.status(400).send({message: "error in creating table"});
          return;
      }
      console.log('created table');
      res.send("table created");
      return;
  }) 
  var Q4 = "DROP TABLE IF EXISTS internationalsites; CREATE TABLE internationalsites (site varchar(25) NOT NULL,lat double NOT NULL,lng double NOT NULL,PRIMARY KEY (site,lat,lng))"
    SQL.query(Q4,(err,mySQLres)=>{
if (err) {
    console.log("error ", err);
    res.status(400).send({message: "error in creating table"});
    return;
}
console.log('created table');
res.send("table created");
return;
}) 
}


const InsertData = (req,res)=>{
    var Q1 = "INSERT INTO customers SET ?";
    var csvFilePath= path.join(__dirname, "customers.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "userName": element.userName,
            "password": element.password,
            "fullName": element.fullName,
            "email": element.email,
            "birthday": element.birthday,
            "height": element.height,
            "weight": element.weight,
        }
        SQL.query(Q1, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    })

    var Q2 = "INSERT INTO customerskites SET ?";
    csvFilePath= path.join(__dirname, "customerskites.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "customer": element.customer,
            "kite": element.kite
        }
        SQL.query(Q2, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    })

    var Q3 = "INSERT INTO sites SET ?";
    csvFilePath= path.join(__dirname, "sites.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "userName": element.userName,
            "lat": element.lat,
            "lng": element.lng,
            "siteName": element.siteName
        }
        SQL.query(Q3, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    })
 
    var Q4 = "INSERT INTO internationalsites SET ?";
    csvFilePath= path.join(__dirname, "internationalsites.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "site": element.userName,
            "lat": element.lat,
            "lng": element.lng
        }
        SQL.query(Q4, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    })
    res.send("data read");
};
 
const ShowCustomersTable = (req,res)=>{
    var Q3 = "SELECT * FROM customers";
    SQL.query(Q3, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table");
        res.send(mySQLres);
        return;
    })};

    const ShowCustomerskitesTable = (req,res)=>{
        var Q3 = "SELECT * FROM customerskites";
        SQL.query(Q3, (err, mySQLres)=>{
            if (err) {
                console.log("error in showing table ", err);
                res.send("error in showing table ");
                return;
            }
            console.log("showing table");
            res.send(mySQLres);
            return;
        })};

        const ShowSitesTable = (req,res)=>{
            var Q3 = "SELECT * FROM sites";
            SQL.query(Q3, (err, mySQLres)=>{
                if (err) {
                    console.log("error in showing table ", err);
                    res.send("error in showing table ");
                    return;
                }
                console.log("showing table");
                res.send(mySQLres);
                return;
            })};

            const ShowInternationalsitesTable = (req,res)=>{
                var Q3 = "SELECT * FROM internationalsites";
                SQL.query(Q3, (err, mySQLres)=>{
                    if (err) {
                        console.log("error in showing table ", err);
                        res.send("error in showing table ");
                        return;
                    }
                    console.log("showing table");
                    res.send(mySQLres);
                    return;
                })};

                const DropTables = (req, res)=>{
                                       var Q2 = "DROP TABLE customerskites";
                    SQL.query(Q2, (err, mySQLres)=>{
                        if (err) {
                            console.log("error in droping table ", err);
                            res.status(400).send({message: "error om dropping table" + err});
                            return;
                        }
                        return;
                    })

                    var Q1 = "DROP TABLE customers";
                    SQL.query(Q1, (err, mySQLres)=>{
                        if (err) {
                            console.log("error in droping table ", err);
                            res.status(400).send({message: "error om dropping table" + err});
                            return;
                        }
                        return;
                    })

                    var Q3 = "DROP TABLE sites";
                    SQL.query(Q3, (err, mySQLres)=>{
                        if (err) {
                            console.log("error in droping table ", err);
                            res.status(400).send({message: "error om dropping table" + err});
                            return;
                        }
                        return;
                    })

                    var Q4 = "DROP TABLE internationalsites";
                    SQL.query(Q4, (err, mySQLres)=>{
                        if (err) {
                            console.log("error in droping table ", err);
                            res.status(400).send({message: "error om dropping table" + err});
                            return;
                        }
                        console.log("tables dropped");
                        res.send("tables dropped");
                        return;
                    })
                }

                module.exports = {CreateTables, InsertData, ShowCustomersTable,ShowCustomerskitesTable,ShowInternationalsitesTable,ShowSitesTable, DropTables};
            
                