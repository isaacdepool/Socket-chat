var socket = io();

var params = new URLSearchParams(window.location.search);

if( !params.has('nombre') || !params.has('sala') ){
    window.location = 'index.html';
    throw new Error('El nombre y sala es necesario');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

        // Escuchar

        socket.on('connect', function(){

            socket.emit('entrarChat', usuario, function( resp ){

                console.log(resp);
            });
        });

        socket.on('disconnect', function(){
            console.log('Perdimos conexion con el servidor');
        });

        socket.on('enviarMensaje', function(res){

            console.log('Servidor: ', res);
        });

        // Enviar informacion

        socket.on('crearMensaje', (resp) =>{

            console.log('Servidor: ', resp);
        });

        // Escuhar cuando los usuarios entran y salen del chat 
        socket.on('listaPersonas', function(personas){

            console.log('lista', personas);
        });

        // Mensajes privados 
        socket.on('mensajePrivado', (data) =>{
            console.log(data);
        });
