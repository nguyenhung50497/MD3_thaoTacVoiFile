const http = require('http')
const fs = require('fs')

let server = http.createServer(function (req, res) {

    let methodRequest = req.method;

    if (methodRequest === 'GET') {
        fs.readFile('./templates/create.html','utf8', (err, data) => {
            res.setHeader('Content-Type', 'text/html')
            res.write(data);
            return res.end()
        })
    }
})

server.listen('8080', function (){
    console.log('Serve running port 8080')
})