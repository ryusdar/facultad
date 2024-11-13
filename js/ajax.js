window.onload = function() {
    GetProductos();
}
function GetProductos() {
    const xhr = new XMLHttpRequest(),
        $lista = document.getElementById('listado');

    console.log(xhr);
    xhr.addEventListener('readystatechange', (e) => {
        if (xhr.readyState !== 4) return;

        if (xhr.status >= 200 && xhr.status < 300) {
            console.log('conectado');

            //Parseo el texto plano del JSON
            let json = JSON.parse(xhr.responseText);

            //Primer bucle toma cada llave de los productos
            for (var p in json) {
                $lista.innerHTML += `
                <h1>${p}</h1>`;
                
                //Segundo forEach ingresa a cada una de las llaves y toma todos los productos internos
                json[p].forEach((el) => {
                    $lista.innerHTML += `
                    <div class="tarjeta">
                    <img src="${el.img}" alt="">
                    <h2>${el.titulo}</h2>
                    <p>${el.descripcion}</p>
                    <p>${el.precio}</p>
                    <a href="${el['ver_mas']}" >Ver más</a>
                    </div>`;
                });
            }


        } else {
            $lista.innerHTML = `
            <div class="tarjeta">
            <img src="" alt="">
            <h2>Error no se encontraron datos</h2>
            <p>${xhr.status}</p>
            <p>${xhr.statusText}</p>
            </div>`;
        }
    });

    xhr.open("GET", '../data/datos.json');

    xhr.send();
}
function BuscarProductos() {
    var desde = parseInt(document.getElementById('desde').value);//Parseamos a entero el valor tomado desde el input
    var hasta = parseInt(document.getElementById('hasta').value);//Ya que los valores que se toman por defecto son string
    var cat = document.getElementById('categoria').value;

    if (hasta == "") {
        hasta = 9999999999999 //En caso de que el usuario no cargue ningun valor declaramos el mayor numero posible
    }
    if (desde == "") {
        desde = 0 //En caso de que el usuario no cargue ningun valor declaramos el menor numero posible
    }

    const xhr = new XMLHttpRequest(),
        $lista = document.getElementById('listado');

    console.log(xhr);
    xhr.addEventListener('readystatechange', (e) => {
        if (xhr.readyState !== 4) return;

        if (xhr.status >= 200 && xhr.status < 300) {
            console.log('conectado');

            //Parseo el texto plano del JSON
            let json = JSON.parse(xhr.responseText);

            $lista.innerHTML = ``;

            if (cat == "") { //En caso de que el usuario no coloque la categoria 
                //El codigo va a imprimir todas las categorias disponibles
                //Primer bucle toma cada llave de los productos
                for (const p in json) {
                    //Segundo forEach ingresa a cada una de las llaves y toma todos los productos internos

                    $lista.innerHTML += `
                    <h1>${p}</h1>`;
                    json[p].forEach((el) => {
                        if (desde <= el.precio || hasta >= el.precio) {
                            console.log(el.precio)
                            $lista.innerHTML += `
                            <div class="tarjeta">
                            <img src="${el.img}" alt="">
                            <h2>${el.titulo}</h2>
                            <p>${el.descripcion}</p>
                            <p>${el.precio}</p>
                             <a href="${el['ver_mas']}" >Ver más</a>
                            </div>`;
                        } else {
                        }
                    });
                }

            } else { //Dado lo contrario imprimira solamente la categoria seleccionada
                $lista.innerHTML += `
                <h1>${cat}</h1>`;
                json[cat].forEach((el) => {
                    if (desde <= el.precio || hasta >= el.precio) {
                        console.log(el.precio)
                        $lista.innerHTML += `
                        <div class="tarjeta">
                        <img src="${el.img}" alt="">
                        <h2>${el.titulo}</h2>
                        <p>${el.descripcion}</p>
                        <p>${el.precio}</p>
                         <a href="${el['ver_mas']}" >Ver más</a>
                        </div>`;
                    } else {
                    }
                });
            }
        } else {
            $lista.innerHTML = `
            <div class="tarjeta">
            <img src="" alt="">
            <h2>Error no se encontraron datos</h2>
            <p>${xhr.status}</p>
            <p>${xhr.statusText}</p>
            </div>`;
        }
    });
// Añade eventos de escucha a los inputs de precio y categoría
document.getElementById('desde').addEventListener('input', verificarCampos);
document.getElementById('hasta').addEventListener('input', verificarCampos);
document.getElementById('categoria').addEventListener('input', verificarCampos);

function verificarCampos() {
    var desde = document.getElementById('desde').value;
    var hasta = document.getElementById('hasta').value;
    var cat = document.getElementById('categoria').value;

    // Si todos los campos están vacíos, se reinicia la lista sin repetir
    if (desde === '' && hasta === '' && cat === '') {
        GetProductos(); // Llama a la función que carga todos los productos
    }
}

function GetProductos() {
    const xhr = new XMLHttpRequest(),
        $lista = document.getElementById('listado');

    // Limpia el contenido del contenedor antes de cargar nuevos productos
    $lista.innerHTML = '';

    xhr.addEventListener('readystatechange', (e) => {
        if (xhr.readyState !== 4) return;

        if (xhr.status >= 200 && xhr.status < 300) {
            console.log('conectado');
            let json = JSON.parse(xhr.responseText);

            for (var p in json) {
                $lista.innerHTML += `<h1>${p}</h1>`;
                json[p].forEach((el) => {
                    $lista.innerHTML += `
                    <div class="tarjeta">
                        <img src="${el.img}" alt="">
                        <h2>${el.titulo}</h2>
                        <p>${el.descripcion}</p>
                        <p>${el.precio}</p>
                        ${el.ver_mas ? `<a href="${el.ver_mas}">Ver más</a>` : ''}
                    </div>`;
                });
            }
        } else {
            $lista.innerHTML = `
            <div class="tarjeta">
                <img src="" alt="">
                <h2>Error no se encontraron datos</h2>
                <p>${xhr.status}</p>
                <p>${xhr.statusText}</p>
            </div>`;
        }
    });

    xhr.open("GET", '../data/datos.json');
    xhr.send();
}


    xhr.open("GET", '../data/datos.json');

    xhr.send();
}