require('dotenv').config();
const express = require('express');
const router = express.Router();
const app = express();
const fs = require('fs');
const path = require('path');
const marked = require('marked')

const defaultDocs = [{name: 'about', file: 'about.md'}, {name: 'cv', file: 'cv.md'}]

function parseDocuments(docs){
  let html = {};
  docs.forEach(({ name, file }) => {
    const string = marked(fs.readFileSync(path.join(__dirname, '../md', file), 'utf8'))
    html[name] = string;
  })
  return html;
}

function renderOptions(){
  const data = parseDocuments(defaultDocs);
  const bundle = '/static/dist/main.js'
  const styles = '/static/dist/styles.css'
  return {
    headline: 'Ezekiel Kigbo',
    title: 'Ezekiel Kigbo | Full Stack Developer - Melbourne',
    description: 'Full Stack Developer based in Melbourne',
    environment: app.get('env'),
    data,
    bundle,
    styles
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  const renderOpts = renderOptions();
  res.render('index', renderOpts)
});

router.get('/cv', function(req, res, next) {
  const renderOpts = renderOptions();
  res.render('cv', Object.assign({}, renderOpts, { headline: 'Ezekiel Kigbo / CV' }));
});

module.exports = router;
