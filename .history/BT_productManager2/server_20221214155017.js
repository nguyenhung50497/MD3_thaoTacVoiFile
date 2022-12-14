const http = require('http');
const fs = require('fs');
const qs = require('qs');

let server = http.createServer(function (req, res) {
    let methodRequest = req.method;

    if (methodRequest === 'GET') {
        fs.readFile('./templates/addProduct.html','utf8', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end()
        })
    } else {
        // xu ly submit
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            let name = qs.parse(data).name;
            // ghi dữ liệu vào file data.txt
            fs.writeFile('./data/data.json', name, err => {
                if (err) {
                    console.log('err')
                    return;
                }
                return res.end(() => {

                })
            })
        })
        req.on('error', () => {
            console.log('error')
        })
    }

    
})

server.listen('8080', function (){
    console.log('Server running localhost:8080')
})