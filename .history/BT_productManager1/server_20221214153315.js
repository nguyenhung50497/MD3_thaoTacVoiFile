const http = require('http')
const fs = require('fs')

let server = http.createServer(function (req, res) {
    // đọc dữ liệu từ file data.txt
    let dataFile = '';
    let html = '';
    fs.readFile('./data/data.json','utf8', function (err, str) {
        dataFile = JSON.parse(str)
        console.log(dataFile);
        dataFile.forEach((value) => {
            html += '<tr>';
            html += `<td>${value.id}</td>`
            html += `<td>${value.name}</td>`
            html += `<td>${value.price}</td>`
            html += `<td><button class="btn btn-danger">Delete</button></td>`
            html += `<td><button class="btn btn-primary">Update</button></td>`
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