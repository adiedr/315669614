const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const app = express();
const mysql = require("mysql2");
const dbConfig = require("./configs/db.config");
var sql = require('./db/db');
const path = require ('path');
const CRUD = require("./db/CRUD");
const { getWeather } = require("./services/weatherService");
app.use(express.static('static'));
var port =8080;
const weather=require('./services/weather')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
// parse requests of contenttype: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// simple route

app.get('/', (req,res)=>{
  res.redirect('Home');
}); 

app.get('/Home',async (req,res)=>{
  var query = "SELECT count(userName),siteName,lat,lng FROM SITES GROUP BY siteName,lat,lng order by 1 DESC limit 3";
  sql.query(query,async (err,mysqlres)=>{
      if(err){
          console.log("error: "+ err);
          res.status(400).send({message: "error" + err});
          return;
      }
      const a = await weather.getWeather(mysqlres[0].lat,mysqlres[0].lng);
      const b = await weather.getWeather(mysqlres[1].lat,mysqlres[1].lng);
      const c = await weather.getWeather(mysqlres[2].lat,mysqlres[2].lng);
  res.render('Home',{
    title1:mysqlres[0].siteName,
    title2:mysqlres[1].siteName,
    title3:mysqlres[2].siteName,
    wind1:a.data.wind.speed+" :מהירות הרוח",
    wind2:b.data.wind.speed+" :מהירות הרוח",
    wind3:c.data.wind.speed+" :מהירות הרוח"
  });
});
});
app.get('/signUp', (req,res)=>{
  res.render('signUp');
});
app.get('/signIn',(req,res)=>{
  res.render('signIn',{
    variable:"שלום אורח"
  });
})
app.get('/settings',(req,res)=>{
  let userName = req.cookies?.userName;
  if (userName) {
  var query = "SELECT * FROM customerskites WHERE customer='"+req.cookies.userName+"'";
  sql.query(query,(err,mysqlres)=>{
      if(err){
          console.log("error: "+ err);
          res.status(400).send({message: "error" + err});
          return;
      }
      var array = mysqlres;
    res.render('Settings',{
      variable1: "! "+userName +' שלום',
      kites:array
    });
  })
  } else {
    res.render('signIn',{
      variable:"שלום אורח"
    });
  }
})
app.get('/MySites',(req,res)=>{
  if (!req.cookies?.userName) {
    res.render('signIn',{
      variable:"שלום אורח"
    });
  }
  var query = "SELECT * FROM SITES WHERE userName='"+req.cookies.userName+"'";
  sql.query(query,(err,mysqlres)=>{
      if(err){
          console.log("error: "+ err);
          res.status(400).send({message: "error" + err});
          return;
      }
      var array = mysqlres;
      res.render('MySites',{
        variable1:" ",
        variable2:" ",
        variable3:" ",
        sites:array
      })
  })

})
app.get('/addSite',(req,res)=>{
  if (!req.cookies?.userName) {
    res.render('signIn',{
      variable:"שלום אורח"
    });
  }
  res.render('addSite');
})
app.post("/settings",CRUD.update)
app.post("/signUp",CRUD.createNewCustomer);
app.post("/deleteSite",CRUD.deleteSite);
app.post("/signIn",CRUD.signIn);
app.get('/weather',getWeather);
app.get('/internationalWeather',CRUD.internationalWeather);
app.get('/details',CRUD.userDetails);
app.get('/kites',CRUD.userKites);
app.get('/siteByName',CRUD.getSiteByName)
app.post('/addSite',CRUD.addSite)
// set port, listen for requests
app.listen(port, () => {
console.log("Server is running on port "+ port);
});