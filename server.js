const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const fileUpload = require('express-fileupload');

const app = express();
app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.urlencoded({ extended: false }));

app.use(fileUpload({ createParentPath: true }));

app.get('/', (req, res) => {
    res.render('index');
  });

app.get('/about', (req, res) => {
    res.render('about');
});
  
app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/info', (req, res) => {
    res.render('info', { layout: 'dark' });
});

app.get('/history', (req, res) => {
    res.render('history');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', {name: req.params.name });
});

app.post('/contact/send-message', (req, res) => {

  const { author, sender, title, message} = req.body;
  let image = req.files.image;

  image.mv('./public/' + image.name);

  if(author && sender && title && message && (image.mimetype === 'image/png' || 'image/jpg' || 'image/jpeg' || 'image/gif')) {
    res.render('contact', { isSent: true, filename: image.name });
  }
  else {
    res.render('contact', { isError: true});
  }

});

app.use((req, res) => {
    res.status(404).send('404 not found...');
})

app.listen(5000, () => {
  console.log('Server is running on port: 5000');
});