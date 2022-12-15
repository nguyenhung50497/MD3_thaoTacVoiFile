const http = require('http');
const fs = require('fs');
const qs = require('qs');



let server = http.createServer(function (req, res) {
    
    let dataFile = [];
    let list = fs.readFileSync('./data/data.json','utf8');
    if (list.length > 0) {
        dataFile = JSON.parse(list);
    }

    let methodRequest = req.method;
    if (methodRequest === 'GET') {
        fs.readFile('./templates/Product.html','utf8', (err, data) => {
            displayProduct(dataFile);
            res.writeHead(200, {'Content-Type': 'text/html'});
            data = data.replace('{list-product}', str)
            res.write(data);
            return res.end()
        })
    } else {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            let newData = qs.parse(data);
            dataFile.push(newData);
            let json = JSON.stringify(dataFile);
            fs.writeFileSync('./data/data.json', json, 'utf8', (err) => {
                if (err) {
                    console.log('err');
                }
                res.end();
            })
           
            displayProduct(dataFile); 
            let html = fs.readFileSync('./templates/Product.html','utf8')
            res.writeHead(200, {'Content-Type': 'text/html'});
            html = html.replace('{list-product}', str)
            res.write(html);
            res.end();
            
        })
        req.on('error', () => {
            console.log('error')
        })
    }
    function deleteProduct(index) {
        dataFile.splice(index, 1);
        let json = JSON.stringify(dataFile);
        fs.writeFileSync('./data/data.json', json, 'utf8', (err) => {
            if (err) {
                 console.log('err');
            }
            res.end();
        })
        displayProduct(dataFile);
        let html = fs.readFileSync('./templates/Product.html','utf8')
        res.writeHead(200, {'Content-Type': 'text/html'});
        html = html.replace('{list-product}', str)
        res.write(html);
        res.end();
    }
    
});

server.listen('8080', function (){
    console.log('Server running localhost:8080')
})