
let baseURL = 'https://web-unicen.herokuapp.com/api/groups/';
let groupID = '32PERALTAREGINA';
let collectionID = 'comidas';
let todasLasComidas;

//'https://web-unicen.herokuapp.com/api/groups/32PERALTAREGINA/comidas'


getData();



function getData(){

  fetch(baseURL + groupID + "/" + collectionID, {
    method: "GET",
    mode: 'cors',
  }).then(function(r){
    if(!r.ok){
      console.log("error")
    }
    return r.json()
  })
  .then(function(json) {
    console.log(json);
    todasLasComidas = json.comidas;
    let contenedor = document.querySelector("#result");
    contenedor.innerHTML = ''

    for (let data of json.comidas) { 

        contenedor.insertRow().innerHTML += `<td>${data.thing.comida}</td>
        <td>${data.thing.precioefe}</td><td>${data.thing.preciotar}</td>
        <td><button  id="borrar-${data._id}">Borrar</button></td>
        <td><button  id="editar-${data._id}">Editar</button></td> `;

      	document.getElementById(`borrar-${data._id}`).addEventListener('click', deleteId); 
        document.getElementById(`editar-${data._id}`).addEventListener('click', EditData); 
        
    }
    

  })
  .catch(function(e){
    console.log(e)
  })

}



function sendData(){
 
  let comida = document.querySelector("#comida-post").value
  let precioefe = document.querySelector("#precioefe-post").value;
  let preciotar = document.querySelector("#preciotar-post").value;

  let data = {
    "thing": {
      "comida": comida,
      "precioefe": precioefe,
      "preciotar" : preciotar
    }
  };

    fetch(baseURL + groupID + "/" + collectionID, {
      "method": "POST",
      "mode": 'cors',
      "headers": { "Content-Type": "application/json" },
      "body": JSON.stringify(data)
    }).then(function(r){
      if(!r.ok){
        console.log("error")
      }
      return r.json()
    })
    .then(function() {
    
      getData();
      
    })
    .catch(function(e){
      console.log(e)
    })

}

document.querySelector("#button-post").addEventListener('click', sendData);



function deleteId(event){

  let borrarId = event.target.id.split("-");
   
      fetch(baseURL + groupID + "/" + collectionID + "/" + borrarId[1], {
        method: "DELETE",
        mode: 'cors',
      }).then(function(r){
        if(!r.ok){
          console.log("error")
        }
        return r.json()
      })
      .then(function(json) {
       
            getData();  

      })
      .catch(function(e){
        console.log(e)
      })
    
}

    
function EditData(event){

    let editarId = event.target.id.split("-");
    let comida = document.querySelector("#comida").value;
    let precioefe = document.querySelector("#precioefe").value;
    let preciotar = document.querySelector("#preciotar").value;
      
      let data = {
        "thing": {
          "comida": comida,
          "precioefe": precioefe,
          "preciotar" : preciotar
        }
      };
      
        fetch(baseURL + groupID + "/" + collectionID + "/" + editarId[1], {
          "method": "PUT",
          "mode": 'cors',
          "headers": { "Content-Type": "application/json" },
          "body": JSON.stringify(data)
        }).then(function(r){
          if(!r.ok){
            console.log("Error")
          }
          return r.json()
        })
        .then(function(json) {
          let contenedor = document.querySelector("#result");
          contenedor.innerHTML = ''
         
          contenedor.insertRow().innerHTML += `<td>${data.thing.comida}</td>
          <td>${data.thing.precioefe}</td><td>${data.thing.preciotar}</td>`;
         
          getData();
          
        })
        .catch(function(e){
          console.log(e)
        })
      
      }
      


function sendDataX3(){

  sendData();
  sendData();
  sendData();

}

document.querySelector("#button-postx3").addEventListener('click', sendDataX3);




function filtroData(){

  event.preventDefault();

  let precioEfectivo = document.querySelector("#filtrar").value; 
  let comidasFiltradas =  todasLasComidas;
  let filtrados = comidasFiltradas.filter(comida => parseInt(comida.thing.precioefe) <= parseInt(precioEfectivo));

  let tabla =  document.querySelector("#result");
  tabla.innerHTML = '';

      for(data of filtrados){
              tabla.insertRow().innerHTML += `<td>${data.thing.comida}</td>
              <td>${data.thing.precioefe}</td><td>${data.thing.preciotar}</td>`;
      }
}


document.querySelector("#btn-buscar").addEventListener('click', filtroData);







