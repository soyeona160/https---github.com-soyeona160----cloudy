// node_modules에 있는 express 관련 파일 가져옴
const express = require('express')

// express 함수 반환값을 변수에 저장
const app = express()

// 8080 포트로 서버 오픈

app.listen(8080, function(){
    console.log('server start on 8080')
})

app.get('http://127.0.0.1:5500/main.html', function(req, res){
    res.send('hello world')
})


let formData = new FormData();
images.forEach((image) => {
  formData.append("files", image);
});

const response = await fetch("/post/post", {
  method: "POST",
  body: formData,
}).then((res) => res.json());

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "src/client/public/");
    },
    filename: function (req, file, callback) {
      const ext = path.extname(file.originalname);
      callback(null, `${path.basename(file.originalname, ext)}-${Date.now()}${ext}`);
    },
  });
  const upload = multer({ storage: storage }).array("files");

  router.post(
    "/post",
    upload,
    async (req, res) => {
      const values = req.files.map((item) => `public/${item.filename}`);
  
      return await new Promise((resolve, reject) => {
        connection.query(`INSERT INTO images (src) VALUES ?`, [values], (err, rows) => {
          if (err) reject(Error(err));
          resolve(rows);
        });
      });
    });