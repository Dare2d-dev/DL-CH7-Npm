const fs = require('fs')
const express = require('express');
const app = express();

const PORT = 8080;
const ruta = 'productos.txt';
const server = app.listen(PORT,()=>{
    console.log(`Server Up en Puerto: ${PORT}`);
});

let visitas = [0,0];

const productos = [
    {
        "id": 1,
        "title": "Item1",
        "price": 100,
        "thumbnail": "1"
    },
    {
        "id": 2,
        "title": "Item2",
        "price": 200,
        "thumbnail": "2"
    },
    {
        "id": 4,
        "title": "Item4",
        "price": 400,
        "thumbnail": "4"
    },
    {
        "id": 3,
        "title": "Item3",
        "price": 300,
        "thumbnail": "3"
    },
    {
        "id": 5,
        "title": "Item5",
        "price": 500,
        "thumbnail": "5"
    },
    {
        "id": 6,
        "title": "Item6",
        "price": 533,
        "thumbnail": "5"
    },
    {
        "id": 7,
        "title": "Item7",
        "price": 644,
        "thumbnail": "6"
    },
    {
        "id": 8,
        "title": "Item8",
        "price": 332,
        "thumbnail": "7"
    },
    {
        "id": 9,
        "title": "Item9",
        "price": 221,
        "thumbnail": "8"
    },
    {
        "id": 10,
        "title": "Item10",
        "price": 1621,
        "thumbnail": "9"
    }
    
];
server.on('error',error=> console.log(`Server Error: ${error}`));

app.get('/items',(req,res)=>{
    visitas[0]++;
    fs.promises.readFile(ruta, 'utf8')
            .then(contenido => {
                let productos = JSON.parse(contenido);
                res.json({
                    items: productos,
                    cantidad: productos.length
                });
            })
            .catch(err => {
                res.json({
                    msg: err
                });
            })
});

app.get('/item-random',(req,res)=>{
    visitas[1]++;
    fs.promises.readFile(ruta, 'utf8')
            .then(contenido => {
                let productos = JSON.parse(contenido);
                let i = Math.round(Math.random() * productos.length)
                res.json({
                    item: productos[i]
                });
            })
            .catch(err => {
                res.json({
                    msg: err
                });
            })
});

app.get('/visitas',(req,res)=>{
    res.json({
        "Visitas": {
            "items": visitas[0],
            "item": visitas[1]
        }
    });
});