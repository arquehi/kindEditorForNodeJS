var express = require('express');
var router = express.Router();
var os = require('os');
var formidable = require('formidable');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'KindEditor For NodeJS' });
});

router.post('/uploadImg', function (req, res) {
  var form = new formidable.IncomingForm();
  form.keepExtensions = true;
  let ActionType = req.query.dir;
  if (ActionType === 'image' || ActionType === 'file' || ActionType === 'media' || ActionType === 'flash') {
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

    console.log(files.imgFile.path);
    let file_url;
    if (ActionType === 'image' || ActionType === 'file' || ActionType === 'media' || ActionType === 'flash') {
      var image = files.imgFile;
      var path = image.path;
      path = path.replace('/\\/g', '/');
      var op = os.type();
      if (op == 'Windows_NT') {
        file_url = path.substr(path.lastIndexOf("\\"), path.length);
        file_url = file_url.replace("\\", "/");
      }
      else {
        file_url = path.substr(path.lastIndexOf("/"), path.length);
      }
      switch (ActionType) {
        case 'image':
          file_url = '/Upload/Images' + file_url;//图片
          break;
        case 'file':
          file_url = '/Upload/Files' + file_url; //附件
          break;
        case 'media':
        case 'flash':
          file_url = '/Upload/Videos' + file_url;//视频
          break;
      }
    }

    console.log(file_url);
    var info = {
      "error": 0,
      "url": file_url
    };
    res.set('Content-Type', 'text/html');
    res.send(info);
  });
});

module.exports = router;