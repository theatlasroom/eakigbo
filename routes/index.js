var express = require('express');
var router = express.Router();
var app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Ezekiel Kigbo | Full Stack Developer - Melbourne',
    environment: app.get('env')
  });
});

router.get('/cv', function(req, res, next) {
  res.render('index', {
    title: 'Ezekiel Kigbo | Full Stack Developer - Melbourne',
    environment: app.get('env')
  });
});

/*router.get('/cover-letter', function(req, res, next) {
  res.render('cover', {
    title: 'Ezekiel Kigbo | Full Stack Developer - Melbourne',
    environment: app.get('env')
  });
});*/

module.exports = router;
