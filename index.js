// Después de recoger la letra introducida por el usuario, utilizando un 
//bucle for, iremos comparandola con las letras que tiene la palabra secreta. 
//En caso de coincidencia utilizaremos la siguiente función no nativa para 
//hacer el remplazo (esta función no nativa debe estar definida al principio del script)


//Creo un metodo o funcion no nativa y la añado con prototype a el objeto primitivo STRING, por definición ya lo tiene el javascript
String.prototype.replaceAt = function (index, character) { 
    //El método extrae caracteres, entre dos índices (posiciones), de una cadena y devuelve la subcadena.substring()
    return (`${this.substring(0, index)}${character}${this.substring(index + character.length)}`);
 
}


const palabras = ["sandia", "uva", "platano", "fresa", "manzana", "pera", "naranja"]

const palabra = palabras[Math.floor(Math.random() * palabras.length)]
// cambianos a todos los caracteres por guiones con espacio
let palabraConGuiones = palabra.replace(/./g, "_ ");


let contadorfallos = 0;

//muestra los guiones en pantalla segun la palabra que agarro del array.
document.querySelector("#one-character").innerHTML = palabraConGuiones


//agarramos la etiqueta del html (el boton)
const botonLetra = document.getElementById("button-word");

botonLetra.addEventListener("click", () => {

    //coge el valor de la letra ingresada por el usuario
    const letrasGuiones = document.querySelector("#letra").value;

    let fallos = true;


    //El estamento for-in es uno de esos pocos incomprendidos en
    //Javascript. Su papel principal es el de recorrer un objeto
    //pasando por cada una de sus propiedades para actuar sobre
    //ellas de alguna manera;


    for(const i in palabra){

        if(letrasGuiones.toLowerCase() == palabra[i]){
            //si la letra ingresada por el usuario es igual a una letra de la palabra entonces el guión se cambia por esta letra.
            palabraConGuiones = palabraConGuiones.replaceAt(i*2, letrasGuiones).toLowerCase();
            fallos = false;
        }
    }

    if(fallos == true && letrasGuiones.trim() != ""){
        contadorfallos++;
        //cambiamos el background position de la imagen
        document.querySelector(".ahorcado-img").style.backgroundPosition = -(404 * contadorfallos) + "px 0"

        //cambiamos los valores de las etiquetas en el modal de html
        if(contadorfallos == 4){
            document.querySelector("#title-modal").innerHTML = "PERDISTE!!!"
            document.querySelector("#text-modal").innerHTML = `La palabra oculta era ${palabra} `
            document.querySelector("#modal").style.display = "flex";
        }

    }else{
        //condición para verificar que la variable palabraconguiones no tenga
        //ningun guión y así saber que el usuario ganó.
        if(palabraConGuiones.indexOf("_") < 0){
            document.querySelector("#title-modal").innerHTML = "GANASTE!!!"
            document.querySelector("#text-modal").innerHTML = `La palabra oculta es ${palabra} `
            document.querySelector("#modal").style.display = "flex";
        }
    }
    

    //muestra los guiones cambiados en pantalla segun la palabra correcta ingresada por usuario.
    document.querySelector("#one-character").innerHTML = palabraConGuiones;
    //para limpiar el input de letras y que vuelva al focus, en otras palabras al inicio
    document.querySelector("#letra").value = "";
    document.querySelector("#letra").focus();
    
});