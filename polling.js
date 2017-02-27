const express = require('express');
const app = express();
const path = require('path');

function generateCode(){
  let code = ('' + Math.random()).slice(-8);
  return code;
}

let code = generateCode();
let previousCode = code; 

setInterval(() => {
  code = generateCode();
  //延迟2秒更新，防止网络延迟，在2秒内新旧两个code都可用
  setTimeout(() => previousCode = code, 2000);
}, 10000);

app.get('/' , function (req, res) {
  res.sendFile(path.join(__dirname, './polling.html'));
})

app.get('/qrcode', function (req, res) {
  res.send({code});
});

app.get('/check/:code', function(req, res) {
  let checkCode = req.params.code;
  let msg = '验证不通过';
  if(checkCode === code || checkCode === previousCode) 
    msg = '验证通过';
  res.send(msg);
});

app.listen(9999);