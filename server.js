const fs = require('fs');
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const router = require('express').Router();
const shortid = require('shortid');
let noteObj = require('./db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
// app.use('/api/public/notes.html');
// app.use('/public/index.html');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });
app.get('/api/notes', (req, res) => {
    res.json(noteObj);
});
app.post('/api/notes',(req, res) => {
  console.log(req.body);
  const newPost = {
    id: shortid.generate(),
    title: req.body.title,
    text: req.body.text
  }
  console.log(newPost);
  noteObj.push(newPost);
  fs.writeFile('./db/db.json',JSON.stringify(noteObj),(err) =>{
    if (err) {
      throw err;
    }
    res.json(noteObj);
  })
})
app.delete('/api/notes/:id',(req,res) => {
   console.log(req.params);
    noteObj = noteObj.filter((notesX) => notesX.id !==req.params.id );
   console.log(noteObj);
   fs.writeFile('./db/db.json',JSON.stringify(noteObj), (err) =>{
     if (err) {
       throw err;
     }
     res.status(200).json(noteObj);
   })
})
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });
  module.exports = router;
