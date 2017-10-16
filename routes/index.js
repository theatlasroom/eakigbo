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
  const isProduction = process.env.NODE_ENV && process.env.NODE_ENV === 'production'
  console.log('isProduction', isProduction);
  const bundle = !isProduction
    ? 'http://localhost:8081/dist/bundle.js' // assume webpack-dev-server if we are not in prod
    : '/static/dist/bundle.js'
    const styles = !isProduction
    ? 'http://localhost:8081/dist/styles.css'
    : '/static/dist/styles.css'
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
