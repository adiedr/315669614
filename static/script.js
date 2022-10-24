
const activePage = window.location.pathname;
var usernameError = document.getElementById('username-error');
var passwordError = document.getElementById('password-error');
var nameError = document.getElementById('name-error');
var emailError = document.getElementById('email-error');
var localhost = "http://localhost:8080/";

function validateBD(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  } 
  today = yyyy + '-' + mm + '-' + dd;
  document.getElementById("birthday").setAttribute("max", today);
};

function validateUser(){
  var user = document.getElementById('userName').value;
  if(user.length ==0){
    usernameError.innerHTML='User name is required';
    return false;
  }
  usernameError.innerHTML = '<i class="fa fa-check-circle"></i>';
  return true;
};

function validateName(){
  var name = document.getElementById('fullName').value;
  var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
  if(name.length==0){
    nameError.innerHTML='Name is required'
  }
  if(!regName.test(name)){
    nameError.innerHTML='Write full name';
    return false;
  }
  nameError.innerHTML = '<i class="fa fa-check-circle"></i>';
  return true;
};

function validatePassword(){
  var password = document.getElementById('passwordinput').value;
  if(password.length==0){
    passwordError.innerHTML = 'Password is required';
    return false;
  }
  if(password.length<6){
    passwordError.innerHTML='Password should contain at least 6 characters';
    return false;
  }
  passwordError.innerHTML='<i class="fa fa-check-circle"></i>';
  return true;
};

function validateEmail(){
  var email = document.getElementById('email').value;
  var regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if(email.length==0){
    emailError.innerHTML='Email is required';
    return false;
  }
  if(!regEmail.test(email)){
    emailError.innerHTML='Email is invalid';
    return false;
  }
  emailError.innerHTML='<i class="fa fa-check-circle"></i>';
  return true;
};

const activeNav=document.querySelectorAll('nav a').forEach(
    MyLinks =>{
        if(MyLinks.href.endsWith(`${activePage}`)){
            MyLinks.classList.add('Active');
        }
    }
);

function changeOption() {
  document.getElementById('deleteKite').classList.add('hidden');
  document.querySelectorAll("input").forEach((el)=>{
  if(el.type=='submit'){
  }else{
    el.classList.add('hidden')
  }
  });
  document.querySelectorAll("label").forEach((el)=>{
    el.classList.add('hidden')
  });
  var change =document.getElementById('changes').value;
    document.getElementById(document.getElementById('changes').value).classList.remove('hidden');
    if(change!='deleteKite')
    document.getElementById(document.getElementById('changes').value+'input').classList.remove('hidden');
};

async function changeSites(){
  var sor=localhost+"favs/"+Math.floor((Math.random()*10)+1)+".jpg";
  document.getElementById('image').src=sor;
  var selectedSite =document.getElementById('changeSites').value;
  const siteData =await fetch(localhost+'siteByName?' + new URLSearchParams({
    siteName:selectedSite
  }), { Method: 'GET' });
  const site =await siteData.json();
  const weather = await fetch(localhost+'weather?' + new URLSearchParams({
    lat:site[0].lat,
    lng:site[0].lng
  }), { Method: 'GET' });
  const weatherData = await weather.json();
  document.getElementById('siteName').innerText = weatherData.data.name;
  document.getElementById('wind').innerText=" mph " + weatherData.data.wind.speed+ " :מהירות הרוח";
  const userDetails = await fetch(localhost+'details?' + new URLSearchParams({
  }), { Method: 'GET' });
  const details = await userDetails.json();
  const userkites = await fetch(localhost+'kites?' + new URLSearchParams({
  }), { Method: 'GET' });
    const kites = await userkites.json();
    var surf =canSurf(weatherData.data.wind.speed,details[0].height,details[0].weight,kites);
  document.getElementById('details').innerText= surf;
  document.getElementById('lat').value=site[0].lat;
  document.getElementById('lng').value=site[0].lng;
};

function initMap() {
  const myLatlng = { lat: 31.771959, lng: 35.217018 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: myLatlng,
  });
  // Configure the click listener.
  map.addListener("click", async (mapsMouseEvent) => {
    const weather = await fetch(localhost+'weather?' + new URLSearchParams({
      lat: mapsMouseEvent.latLng.lat(), 
      lng: mapsMouseEvent.latLng.lng() 
    }), { Method: 'GET' });
    const weatherData = await weather.json();
    document.getElementById('location').innerHTML=`      '${weatherData.data.name}' :היעד שבחרת  `;
    document.getElementById('weather').innerHTML=`מזג האוויר:    ${weatherData.data.weather[0].description}   `
    document.getElementById('lat').value = mapsMouseEvent.latLng.lat();
    document.getElementById('lng').value = mapsMouseEvent.latLng.lng();
    document.getElementById('locationName').value=weatherData.data.name;
  });
};

function canSurf(wind,height,weight,kites){
  document.getElementById('card').classList.remove('unavailable');
  document.getElementById('card').classList.remove('available');
  document.getElementById('card').classList.remove('dangarous');
  for(i=0;i<kites.length;i++){
    var can = kites[i].kite+" :תנאי גלישה מתאימים לקייט ";
    var cant ="אין מספיק רוח היום";
    var dangerous ="יום מסוכן לגלישה";
    if(wind<3){
      document.getElementById('card').classList.add('unavailable');
      return cant;}
    if(wind<5&&kites[i].kite>0&&weight<60){
      document.getElementById('card').classList.add('available');
      return can;}
    if(wind<6&&kites[i].kite>10&&weight<90&&height<190){
      document.getElementById('card').classList.add('available');
      return can;}
    if(wind<7&&kites[i].kite>10&&weight<110&&height<210) {
      document.getElementById('card').classList.add('available');
      return can;}
    if(wind<7&&kites[i].kite>9&&weight<110&&height<210){
      document.getElementById('card').classList.add('available');
      return can;}
    if(wind<8&&kites[i].kite>8&&weight<110&&height<210) {
      document.getElementById('card').classList.add('available');
      return can;}
    if(wind<9&&kites[i].kite>10&&weight<130&&height<210) {
      document.getElementById('card').classList.add('available');
      return can;}
    if(wind<9&&kites[i].kite>11&&weight<140&&height<210) {
      document.getElementById('card').classList.add('available');
      return can;}
    if(wind<10&&kites[i].kite>8&&weight<140&&height<210) {
      document.getElementById('card').classList.add('available');
      return can;}
    if(wind<11&&kites[i].kite>8) {
      document.getElementById('card').classList.add('available');
      return can;}
    if(wind>13){
      document.getElementById('card').classList.add('dangerous');
      return dangerous;}
    }
  document.getElementById('card').classList.add('unavailable');
  return "אין קייט מתאים לתנאי הגלישה היום";
};
async function internationalWeather(){
  const internationalWeather =await fetch(localhost+'internationalWeather?' + new URLSearchParams({
  }), { Method: 'GET' });
  const sites =await internationalWeather.json();
  const weather1 = await fetch(localhost+'weather?' + new URLSearchParams({
      lat:sites[0].lat,
      lng:sites[0].lng
  }), { Method: 'GET' });
  const weatherData1 = await weather1.json();
  document.getElementById("site1").innerText=sites[0].site;
  document.getElementById("weather1").innerText="מזג אוויר:"+weatherData1.data.weather[0].description;
  document.getElementById("temp1").innerText="טמפרטורה:"+  Math.round(weatherData1.data.main.temp-273.15)+"°";
  const weather2 = await fetch(localhost+'weather?' + new URLSearchParams({
      lat:sites[1].lat,
      lng:sites[1].lng
  }), { Method: 'GET' });
  const weatherData2 = await weather2.json();
  document.getElementById("site2").innerText=sites[1].site;
  document.getElementById("weather2").innerText="מזג אוויר:"+weatherData2.data.weather[0].description;
  document.getElementById("temp2").innerText="טמפרטורה:"+  Math.round(weatherData2.data.main.temp-273.15)+"°";
  const weather3 = await fetch(localhost+'weather?' + new URLSearchParams({
      lat:sites[2].lat,
      lng:sites[2].lng
  }), { Method: 'GET' });
  const weatherData3 = await weather3.json();
  document.getElementById("site3").innerText=sites[2].site;
  document.getElementById("weather3").innerText="מזג אוויר:"+weatherData3.data.weather[0].description;
  document.getElementById("temp3").innerText="טמפרטורה:"+  Math.round(weatherData3.data.main.temp-273.15)+"°";
}
function deleteCookie(){
  document.cookie= "userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  return confirm('?האם אתה בטוח שברצונך להתנתק');
}
window.initMap = initMap;


