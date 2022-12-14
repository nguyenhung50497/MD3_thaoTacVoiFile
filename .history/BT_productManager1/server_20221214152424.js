const http = require('http')
const fs = require('fs')

let server = http.createServer(function (req, res) {
    // đọc dữ liệu từ file data.txt
    let dataFile = '';
    let html = '';
    fs.readFile('./data/data.json','utf8', function (err, str) {
        dataFile = str.split(",")
        console.log(str);
        dataFile.forEach((value, index) => {
            html += '<tr>';
            html += `<td>${valueid}</td>`
            html += `<td>${value}</td>`
            html += `<td><button class="btn btn-danger">Delete</button></td>`
            html += '</tr>';
        });
    });

    fs.readFile('./templates/index.html','utf8', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        data = data.replace('{list-user}', html)
        res.write(data)
        res.end()
    });
})

server.listen('8080', function (){
    console.log('Server running localhost:8080')
})