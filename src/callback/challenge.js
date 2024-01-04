const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest; //Lo que acabamos de instalar desde NPM
const API = 'https://api.escuelajs.co/api/v1'; //Variable que hace referencia al recurso anterior, esta en en mayusculas dado que sera un valor que no va a cambiar, es unico

function fetchData(urlApi, callback) { //Esta funcion nos permitira recibir la URL(el api que tenemos), y el callback para la solicitud de datos o errores
    let xhttp = new XMLHttpRequest(); //Este elemento nos permite controlar el flujo del llamado

    xhttp.open('GET', urlApi, true) //El primer argumento es el tipo, el segundo la URL, y el tercero para habilitarlo
    xhttp.onreadystatechange = function (event){ //Nos permite conocer cuando esta disponible la informacion a traves de los diferentes estados
        if (xhttp.readyState === 4){ //Validamos el estado, debe ser el mismo valor y tipo, por eso la triple igualdad; el estado '0' es no inicializado, el valor '1' es loading, el '2' es cuando ya se ejecuto el 'Send', el '3' es interactuando, y el '4' cuando se ha completado el llamado
            if(xhttp.status === 200){ //Validamos tipo y valor, son estados de servidor, '200' para respuesta satisfactoria
                callback(null, JSON.parse(xhttp.responseText)); //El segundo valor es para parsear los datos a JSON
            }
        } else { //Aplicamos el else para manejar un error
            const error = new Error('Error' + urlApi); //Con esto podemos ver si hay un erro con la URL, es decir, la API
            return callback(error, null);
        }
    }
    xhttp.send(); //Peticion
}

fetchData(`${API}/products`, function(error1, data1){
    if (error1) return console.error(error1);
    fetchData(`${API}/products/${data1[0].id}`, function(error2, data2){
        if (error2) return console.error(error2);
        fetchData(`${API}/categories/${data2?.category?.id}`, function(error3, data3){
            if (error3) return console.error(error3);
            console.log(data1[0]);
            console.log(data2.title);
            console.log(data3.name);
        });
    });
})