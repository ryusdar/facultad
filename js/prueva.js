let listado = document.getElementById('listado');
/*
const producto = {
    titutlo: 'Auriculares',
    descripcion: 'ANBVOISADBVIOSDFNVOSIDKNVOSNFV',
    precio: '20000',
    img: 'img/monitor.jpg'
};
*/


const jsonString = `{
    "departamento": [
    { "titulo": "Casa Palmares", 
    "descripcion": "lsidfosdbnfobasdof",
    "precio": "20000",
    "img":"img/Auriculares.jpg"
    },
    { "titulo": "Casa Dalvian", 
    "descripcion": "lsidfosdbnfobasdof",
    "precio": "150000",
    "img":"img/monitor.jpg"
    }
    ],
    "casa":[
    { "titulo": "Casa en Rosario", 
    "descripcion": "lsidfosdbnfobasdof",
    "precio": "8000",
    "img":"img/Teclado.jpg"
    }
    ]

  }`;

console.log(jsonString);
// Parsear la cadena JSON a un objeto JavaScript
const data = JSON.parse(jsonString);
console.log(data);

// Acceder al array de productos
const productos = data.productos;

/* Iterar sobre el array de personas
    productos.forEach(producto => {

    listado.innerHTML += `
    <div class="tarjeta">
    <img src="${producto.img}" alt="">
    <h2>${producto.titulo}</h2>
    <p>${producto.descripcion}</p>
    <p>${producto.precio}</p>
    </div>`;
    });
*/

//acceder al json mediante 

(() => {
    const xhr = new XMLHttpRequest(),
        $lista = document.getElementById('listado'),
        $fragmento = document.createDocumentFragment();

    //console.log(xhr);

    xhr.addEventListener("readystatechange", (e) => {
        if (xhr.readyState !== 4) return;

        console.log(xhr);
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log('exito');
            console.log(xhr.responseText);
            let json = JSON.parse(xhr.responseText);

            let producto = json.productos;
            producto.forEach((el) => {
                $lista.innerHTML += `
                <div class="tarjeta">
                <img src="${el.img}" alt="">
                <h2>${el.titulo}</h2>
                <p>${el.descripcion}</p>
                <p>${el.precio}</p>
                </div>`;
            });
        } else {
            
            $lista.innerHTML += `
                <div class="tarjeta">
                <img src="" alt="">
                <h2>${xhr.statusText} ${xhr.status}</h2>
                <p>Error</p>
                <p>Error</p>
                </div>`;
        }
    });

    xhr.open("GET", 'datos.json');

    xhr.send();
})();
