const fs = require('fs');
const request = require("request");
const superagent= require('superagent');
const cheerio = require('cheerio');
let url = 'https://tieba.baidu.com/p/6255784076?pn=3';
superagent.get(url).end((err, res ) => {
  if (err) {
    console.log(`抓取失败 - ${err}`)
  } else {
    getImages(res)
  }
});

function getImages(res){
    let $ = cheerio.load(res.text);
    let images = [];
    $('.BDE_Image').map((k,v)=>{
        images.push($(v).attr('src'))
    })
    download(images)
}
function download(images){
    images.forEach((element,k) => {
        var readStream = request(element);
        var writeStream = fs.createWriteStream(`image/ye_3_${k}.gif`);
        readStream.pipe(writeStream);
        readStream.on('end', function() {
            console.log(`ye${k}下载成功`);
        });
        readStream.on('error', function() {
            console.log("错误信息:" + err)
        })
        writeStream.on("finish", function() {
            writeStream.end();
        });
    });
}
