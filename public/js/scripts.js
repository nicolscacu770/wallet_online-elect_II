console.log('Se ejecuto el script de public')

document.getElementById('btnSend').addEventListener('click', () =>{
    console.log('BOTON ENVIAR')
    const id = Math.floor(Math.random() * 201);
    const name = document.getElementById('name').value;
    const descripcion = document.getElementById('descripcion').value;
    const tipo = document.getElementById('tipo').value;
    const valor = document.getElementById('valor').value;

    console.log(name, descripcion, tipo, valor);
    const xhr = new XMLHttpRequest()
    xhr.open("post", "http://localhost:3001/api/movimientos", true)
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4 && xhr.status == 200){
            console.log(xhr.responseText);
        }else {
            console.error('Error al hacer la solicitud: ' + xhr.status);
        }
    }
    xhr.setRequestHeader('content-type', 'application/json')
    const data = {
        id: id,
        name: name,
        description: descripcion,
        type: tipo,
        value: valor
    }
    const dataJson = JSON.stringify(data);
    xhr.send(dataJson);
    console.log(dataJson);
    window.modal.close();
})