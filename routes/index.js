const express = require('express');
const router = express.Router();
const app = express();
const fs = require('fs');
const path = require('path');
const marked = require('marked')

const defaultDocs = [{name: 'about', file: 'about.md'}, {name: 'cv', file: 'cv.md'}]

function prepareDocuments(docs){
  let html = {};
  docs.forEach(({ name, file }) => {
    const string = marked(fs.readFileSync(path.join(__dirname, '../md', file), 'utf8'))
    html[name] = string;
  })
  return html;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  const data = prepareDocuments(defaultDocs);
  const isDev = app.get('env') !== 'production'
  const bundle = isDev
    ? 'http://localhost:8080/dist/bundle.js' // assume webpack-dev-server if we are not in prod
    : '/dist/bundle.js'
  const styles = isDev
    ? 'http://localhost:8080/dist/styles.css'
    : '/dist/styles.css'
  res.render('index', {
    title: 'Ezekiel Kigbo | Full Stack Developer - Melbourne',
    description: 'Full Stack Developer based in Melbourne',
    environment: app.get('env'),
    data,
    bundle,
    styles    
  })
});

router.get('/cv', function(req, res, next) {
  res.render('index', {
    title: 'Ezekiel Kigbo | Full Stack Developer - Melbourne',
    environment: app.get('env')
  });
});

module.exports = router;
