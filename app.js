const express = require('express');
const ejs = require('ejs');
const app = express();
const path = require('path');
const exp = require('constants');
const mongoose=require('mongoose');
//photo modelini export ile aldık
const Photo=require('./models/Photo');

//DB CONNECTION
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db');

//TEMPLATE ENGINE
app.set('view engine', 'ejs');
//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));//post ile veri çekerken urldeki datayı okumak için
app.use(express.json());//post ile veri çekerken urldeki datayı json formatına dönüştürmek için

//ROUT
app.get('/', async(req, res) => {
  const photos=await Photo.find({});
  res.render('index',{
    photos
  });
});
app.get('/about', (req, res) => {
  //res.sendFile(path.resolve(__dirname,'temp/index.html'));
  res.render('about');
});
app.get('/add', (req, res) => {
  //res.sendFile(path.resolve(__dirname,'temp/index.html'));
  res.render('add');
});
//POST İŞLEMLERİ
app.post('/photos', async (req, res) => {
  await Photo.create(req.body);
  res.redirect('/');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu port ${port} den baslatildi`);
});
