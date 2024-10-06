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
    "casa": [
    { "titulo": "Casa Palmares", 
    "descripcion": "lsidfosdbnfobasdof",
    "precio": "1200",
    "img":"assets/download_image_1717276249391.png"
    },
    { "titulo": "Casa Dalvian", 
    "descripcion": "lsidfosdbnfobasdof",
    "precio": "300.000",
    "img":"assets/download_image_1717276319265.png"
    }
    ],
    "departamento":[
    { "titulo": "Casa en Rosario", 
    "descripcion": "lsidfosdbnfobasdof",
    "precio": "1.500",
    "img":"assets/FACHADAS-DE-CASAS-PEQUENAS5-1.jpg"
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
