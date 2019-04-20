var express = require('express');
var router = express.Router();
var formidable = require('formidable');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'KindEditor For NodeJS' });
});

router.post('/uploadImg', function(req, res, next) {
  var form = new formidable.IncomingForm();
  form.keepExtensions = true;
  let ActionType = req.query.dir;
  if (ActionType === 'image' || ActionType === 'file' || ActionType === 'media'|| ActionType === 'flash') {
    switch (ActionType) {
      case 'image':
        form.uploadDir = __dirname + '/../public/Upload/Images';//图片
        break;
      case 'file':
        form.uploadDir = __dirname + '/../public/Upload/Files'; //附件
        break;
      case 'media':
      case 'flash':
        form.uploadDir = __dirname + '/../public/Upload/Videos';//视频
        break;
    }
  }

  form.parse(req, function (err, fields, files) {
    if (err) {
      throw err;
    }

    let file_url;
    if (ActionType === 'image' || ActionType === 'file' || ActionType === 'media'|| ActionType === 'flash') {
      var image = files.imgFile;
      var path = image.path;
      path = path.replace('/\\/g', '/');
      switch (ActionType) {
        case 'image':
          file_url = '/Upload/Images' + path.substr(path.lastIndexOf('/'), path.length);//图片
              break;
        case 'file':
          file_url = '/Upload/Files' + path.substr(path.lastIndexOf('/'), path.length); //附件
              break;
        case 'media':
        case 'flash':
          file_url = '/Upload/Videos'+ path.substr(path.lastIndexOf('/'), path.length);//视频
              break;
      }
    }

    var info = {
      "error": 0,
      "url": file_url
    };
    res.send(info);
  });
});

module.exports = router;
