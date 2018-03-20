const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();
app.set('view engine','hbs');
hbs.registerPartials(__dirname + '/views/partials');
//express middlewear : app.use takes a middlewear.
//using built in middlewear


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} :  ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log("unable to connect to server");
    }
  });
  next();
})
// app.use((req, res, next) => {
//   res.render('maintainence.hbs');
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  //res.send('Hello Express');
  res.render('home.hbs', {
    pageTitle : 'Home Page',
    welcomeMsg : 'Hello and welcome!!',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle : 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage : 'unable to handle request',
  });
});
app.listen(port, () => {
  console.log(`server has started ${port}`);
});
