const express = require('express');
const router = express.Router();
const app = express();
const appRender = require('../views/appRender.jsx')

/* GET home page. */
router.get('*', function(req, res, next) {
  res.send(appRender(req.url))
});

// router.get('/cv', function(req, res, next) {
//   res.render('index', {
//     title: 'Ezekiel Kigbo | Full Stack Developer - Melbourne',
//     environment: app.get('env')
//   });
// });

/*router.get('/cover-letter', function(req, res, next) {
  res.render('cover', {
    title: 'Ezekiel Kigbo | Full Stack Developer - Melbourne',
    environment: app.get('env')
  });
});*/

module.exports = router;
