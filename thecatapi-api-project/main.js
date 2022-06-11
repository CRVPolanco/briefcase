//Conseguimos las APIS necesarias para hacer el fetch, esta es de la api de michis randoms
const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=48989bc4-938c-409c-9b36-4888a501f83a';
//y esta es de favorites.
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites';
//Creamos una const API dinámica que sea una función. para que cuando al momento de pasarle al id este lo reciba, es decir, utilizando los template literals (``) o también podemos hacer es concatenar strings. 
const API_URL_DELETE_FAVORITES = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload'
//generamos en el html una etiqueta la cual servira de ancla para dar un texto si ocurre un error en la petición a la api
const spanError = document.getElementById('errorGenMichies');

//Generamos una función asíncrona que se encargará de hacer las peticiones a la API
async function loadRandomMichis() {
  //Generamos dos variables, una que hará la peticion a la API y otra que se encargue de traducir lo obtenido de la api a JSON.
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();
  console.log('Random');
  console.log(data);
//Ponemos condicional de que si el estatus de la peticion de la api es diferente a 200, en la etiqueta mencionada anteriormente que servira para dar el error de status muestre el error code y mensaje
    if(res.status !== 200){
        spanError.innerHTML = "Error code: " + res.status + data.message;
        //Sino, buscaremos localizaremos las etiquetas en HTML que haremos la manipulación del DOM. 
    }else{
        //Conseguimos los ID de las imagenes y botones.
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const btn1 = document.getElementById('buttonRandom1');
        const btn2 = document.getElementById('buttonRandom2');
        
        //Ya teniendo los ID de de las imagenes, hacemos el proceso para que se muestre en el HTML.
        img1.src = data[0].url;
        img2.src = data[1].url; 

        //En este caso, a los botones que conseguimos su ID, les crearemos el atributo onclick que hara que de forma dinamica al darle click al boton llame a la funcion que guardará el ID de los michis que consideremos favoritos.
        btn1.onclick = () => saveFavouritesMichis(data[0].id);
        btn2.onclick = () => saveFavouritesMichis(data[1].id);

    }
}
//Lo mismo que la de arriba pero esta vez es para mostrar a los michis favoritos.
async function loadFavoritesMichis() {
    //Peticion y transformacion a JSON
      const res = await fetch(API_URL_FAVORITES, {
          method: 'GET',
          headers: {
              'x-api-key': '48989bc4-938c-409c-9b36-4888a501f83a'
          }
      });
      const data = await res.json();
      console.log('Favoritos')
      console.log(data);
    //Si estatus es diferente de OK, salta error.
  if(res.status !== 200){
      spanError.innerHTML = "Error code: " + res.status + data.message;
  }else{
      //Conseguimos el ID de la seccion en HTML que haremos de forma dinamica que los michis que sean nuestros favoritos los coloquemos allí 
      //Aquí hacemos un borrado de todos los elementos que hay en favoritos, ya que al borrar algun michi o agregar se repite la función y crea duplicados de los existentes, por lo que hacemos una nueva inserción de datos, es decir, borramos lo que está dentro actualmente y al llamar la función ya sea de borrar o guardar se recargue automáticamente sin crear duplicados.
      const section = document.getElementById('favoritesMichis');
      section.innerHTML = "";
      const h2 = document.createElement('h2');
      const h2Text = document.createTextNode('Michis favoritos');
      h2.appendChild(h2Text);
      section.appendChild(h2);
      
      //En esta parte hacemos recorrido al array de objetos que contendrán nuestros michis favoritos.
      data.forEach(michi=>{
          //document.createElement('typeNeeded'): se encarga de crear de forma dinámica nuevas etiquetas en el HTML.
          //document.createTextNode('Text'): se encarga de crear un texto que podriamos colocar dentro de la etiqueta en cuestion.
        const article = document.createElement('article');
        const img = document.createElement('img');
        const button = document.createElement('button');
        const btn = document.createTextNode('Sacar al michi de favoritos');
        
        //aquí le creamos una propiedad a la etiqueta img creada que hará que el michi que obtengamos del fetch a la API se muestre.
        img.src = michi.image.url;
        //creamos un width a todas las imagenes que se creen a partir de ahora
        img.width = 200;
        //appendChild(LoQueQueremosPegar): hace que se coloque dentro de una etiqueta. ejemplo supongamos que al momento de crear otra etiqueta img la queremos colocar dentro del article hacemos es article (usamos el article porque es lo que usaremos de padre para que la etiqueta en cuestión se coloque dentro de ella) article.appendChild(img), con eso listo hace que la imagen se coloque dentro de la etiqueta article, pasó de <artcile></artcile><img> a <article><img></article>, lo mismo con lo demás, ojo que tener cuidado que lo que coloquemos antes del appendchild es lo que servirá de container o padre. 
        button.appendChild(btn);
        button.onclick = () => deleteFavourites(michi.id);
        article.appendChild(img);
        article.appendChild(button);
        section.appendChild(article);
      })
  }
}
//Esta es la función que hará las peticiones de forma POST para guardar nuestros michis favoritos, (AMO LOS GATOS <3);
const saveFavouritesMichis = async (id) =>{
    //Viene la salsa:
    //Hacemos la peticion a la API, colocamos la url necesaria, y ya que haremos un POST y no un GET, modificamos el estado por defecto.
    //si se deja sin más nada la propiedad fetch solamente utilizando el URL necesitado, se tomará automáticamente como una solicitud de tipo GET, esta vez será POST, por lo que pasaremos un objeto.
    //El method: es el que dice que tipo de solicitud será la petición.
    //headers: Es aquel que le dice al backend como estamos enviando la información desde nuestro body. Es decir, el tipo de contenido que enviamos en el body, ya sea formato de información y el backend la interprete y nos la envíe a nosotros para usarla.
    //body: Es donde enviamos la información al backend.
    //Body es como necesitamos nosotros la información y el headers es la información de como queremos que nos la pasen.
    //Dentro del body utilizamos el JSON.stringify({image_id: xx}) para que cuando hagamos la peticion de tipo POST al backend este lo transforme a cadena de texto y así no generar conflictos con el backend ya que el backend puede ser de distintos lenguajes de programación y no necesariamente JavaScript. Por lo que, así con el JSON.stringify({}) no generaremos un error, y el image_id es lo que necesitaremos de esta API para que el identificador pueda guardar sin problemas el michi requerido.
    const res = await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': '48989bc4-938c-409c-9b36-4888a501f83a'
        },
        body: JSON.stringify({
            image_id: id,
        }),
    });
    //Y esto es lo mismo de siempre.
    console.log('save');
    console.log(res);
    const data = await res.json();
    if(res.status !== 200){
        spanError.innerHTML = "Error code: " + res.status + data.message;
    }else{
                //Aquí agregamos algo nuevo y es:
        //Si el michi fue guardado sin problemas, recargue nuevamente la seccion de favoritos.
        console.log('Michi guardado satisfactoriamente.');
        loadFavoritesMichis();
    }
}
//Tener en cuenta que en esta API al momento de solicitar un DELETE, no requiere un header ni body, pudo ser que los dueños decidieron crear un endpoint (ejemplo/id/) en vez de requerir que utilizemos el header ni body, no pasa en todas.
const deleteFavourites = async (id) =>{
    const response = await fetch(API_URL_DELETE_FAVORITES(id), {
        method: 'DELETE',
        headers:{
            'x-api-key': '48989bc4-938c-409c-9b36-4888a501f83a'
        }
    });
    const data = await response.json();
    if(response.status !== 200){
        spanError.innerHTML = "Error code: " + response.status + data.message;
    }else{
        //Aquí agregamos algo nuevo y es:
        //Si el michi fue borrado sin problemas, recargue nuevamente la seccion de favoritos.
        console.log('Michi borrado satisfactoriamente.');
        loadFavoritesMichis();
    }
}
//Luego de hacer click al boton de subir michis hará esto la función
const uploadMichiPhoto = async () =>{
    //Primero obtenemos el ID del formulario que nos interesa
    const form = document.getElementById('uploading-form');
    //Luego crearemos una instancia del prototipo FormData y le pasamos como argumento el formulario que nos interesa.
    const formData = new FormData(form);

    console.log(formData.get('file'));
    //Hacemos una peticion a la API de tipo POST, y le colocamos en el headers la API Key
    const response = await fetch(API_URL_UPLOAD, {
        method: 'POST',
        headers: {
            //En este caso, al seleccionar el tipo de información que le estaremos solicitando al backend, que es el Content-Type colocamos el multipart/form-data que es el que sube los formularios al backend, pero para este caso utilizando el prototipo FormData, ya el fetch reconoce que estamos intentando pasar en el body un formulario proveniente del prototipo FormData, por lo tanto no es necesario utilizar o señalar el tipo de Content-Type ya que este lo hace automáticamente, el reconocimiento de los otros datos faltantes en el Content-Type
            // 'Content-Type': 'multipart/form-data',
            'x-api-key': '48989bc4-938c-409c-9b36-4888a501f83a',
        },
        //Y pasamos la instancia que creamos en el body para que el backend reconozca que es una instancia del prototipo FormData.
        body: formData,
    });
    //El boundary que va en el content-type de los headers es en pocas palabras un separador como el anpersant en los query parameters de una URL
 //Ojo al caso, para hacer estas subidas no es necesario usar el prototipo FormData sino que éste lo hace más fácil.
}

//aquí llamamos a las funciones para que carguen automáticamente al abrir el navegador con este proyecto.
loadRandomMichis();
loadFavoritesMichis();