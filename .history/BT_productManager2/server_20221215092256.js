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
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            let newData = JSON.stringify(qs.parse(data));
            let list = fs.readFileSync('./data/data.json','utf8')
            list

            fs.writeFileSync('./data/data.json', newData, 'utf8', (err) => {
                if (err) {
                    console.log('err');
                }
                res.end();
            })
            let dataFile;
            let str = '';
            
                dataFile = JSON.parse(list);
                console.log(dataFile);
                // dataFile.forEach((value) => {
                //     html += '<tr>';
                //     html += `<td>${dataFile.id}</td>`
                //     html += `<td>${dataFile.name}</td>`
                //     html += `<td>${dataFile.price}</td>`
                //     html += `<td><button class="btn btn-danger">Delete</button></td>`
                //     html += `<td><button class="btn btn-primary">Update</button></td>`
                //     html += '</tr>';
                // });
                

            let html = fs.readFileSync('./templates/addProduct.html','utf8')
                res.writeHead(200, {'Content-Type': 'text/html'});
                html = html.replace('{list-product}', str)
                res.write(html);
                res.end();
            
        })
        req.on('error', () => {
            console.log('error')
        })
    }

    
})

server.listen('8080', function (){
    console.log('Server running localhost:8080')
})