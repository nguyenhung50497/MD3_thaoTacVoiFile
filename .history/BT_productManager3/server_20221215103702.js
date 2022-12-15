const http = require('http');
const fs = require('fs');
const qs = require('qs');


let server = http.createServer(function (req, res) {
    let dataFile = [];
    let list = fs.readFileSync('./data/data.json','utf8');
    if (list.length > 0) {
        dataFile = JSON.parse(list);
    }
    let str = '';
    dataFile.forEach((value) => {
        str += '<tr>';
        str += `<td>${value.id}</td>`
        str += `<td>${value.name}</td>`
        str += `<td>${value.price}</td>`
        str += `<td><button class="btn btn-danger" onclick="deleteProduct()">Delete</button></td>`
        str += `<td><button class="btn btn-primary" onclick="updateProduct()">Update</button></td>`
        str += '</tr>';
    });
    let methodRequest = req.method;
    if (methodRequest === 'GET') {
        fs.readFile('./templates/Product.html','utf8', (err, data) => {
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
           
                str += '<tr>';
                str += `<td>${newData.id}</td>`
                str += `<td>${newData.name}</td>`
                str += `<td>${newData.price}</td>`
                str += `<td><button class="btn btn-danger" onclick="deleteProduct(` + i + `)">Delete</button></td>`
                str += `<td><button class="btn btn-primary" onclick="updateProduct(` + i )">Update</button></td>`
                str += '</tr>';
                
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
    function deleteProduct() {

    }
    
});

server.listen('8080', function (){
    console.log('Server running localhost:8080')
})