const async = require('async')

let youtubeUploader

async.series([
    function(callback) {
        // do some stuff ...
        callback(null, 'one');
    },
    function(callback) {
        // do some more stuff ...
        callback(null, 'two');
    }
],
// optional callback
function(err, results) {
    // results is now equal to ['one', 'two']
});

const loadDotEnv = callback => {
  require('dotenv').load(__dirname+'/.zoom-to-youtube')
  callback()
}

const loadPythonPath = callback => {
  // process.env.PYTHONPATH=$(which python)
  const async = require('async')
  const exec = require('child_process').exec;

  exec('which python', (error, stdout, stderr) => {
    process.env.PYTHONPATH = stdout
    callback()
  })
}

const loadYoutubeUploader = callback => {
  youtubeUploader = require('youtube-uploader')
  youtubeUploader.configure(
    {
     accessToken: process.env.ACCESS_TOKEN,  // string
      clientId: process.env.CLIENT_ID,  // string
      clientSecret: process.env.CLIENT_SECRET,  // string
      // expiresIn: EXPIRES_IN,  // string (default: '3600')
      // idToken: ID_TOKEN,  // string
      // refreshToken: REFRESH_TOKEN,  // string
      // tokenType: TOKEN_TYPE  // string (default: 'Bearer')
    },
    callback
  );
}

const uploadYoutubeVideo = callback => {
  // youtubeUploader.upload({
  //   path: VIDEO_PATH,  // string
  //   title: TITLE,  // string
  //   description: DESCRIPTION,  // string
  //   keywords: KEYWORDS,  // array of string
  //   category: CATEGORY_ID,  // string (refer to https://developers.google.com/youtube/v3/docs/videoCategories/list)
  //   privacy: PRIVACY  // 'public', 'private', or 'unlisted'
  // }, function (err, videoId) {
  //   // ...
  // });
}



async.series([
  loadDotEnv,
  loadPythonPath,
  loadYoutubeUploader,
  uploadYoutubeVideo,
  (x) => {
    console.log('xx', x)
  }
],
function(error, results) {
  console.warn(error.message)
  console.error(error)
})



