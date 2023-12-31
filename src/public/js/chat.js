// const socketClient=io()
// const nombreUsuario=document.getElementById("nombreusuario")
// const formulario=document.getElementById("formulario")
// const inputmensaje=document.getElementById("mensaje")
// const chat=document.getElementById("chat")


// let usuario=null

// if(!usuario){
//     Swal.fire({
//         title:"Bienvenido al chat",
//         text:"Ingresa tu nombre",
//         input:"text",
//         inputValidator:(value)=>{
//             if(!value){
//                 return "Necesitas ingresar tu Nombre"
//             }
//         }
//     })
//     .then(username=>{
//         usuario=username.value
//         nombreUsuario.innerHTML=usuario
//         socketClient.emit("nuevousuario",usuario)
//     })
// }

// formulario.onsubmit=(e)=>{
//     e.preventDefault()
//     const info={
//         user:usuario,
//         message:inputmensaje.value
//     }
//     console.log(info)
//     socketClient.emit("mensaje",info)
//     inputmensaje.value=" "

// }

//  socketClient.on("chat",mensaje=>{
//    const chatrender=mensaje.map(e=>{
//     return `<p><strong>${e.user}</strong>${e.message}`}).join(" ")
//    chat.innerHTML=chatrender
   
   
//  })

//  socketClient.on("broadcast",usuario=>{
//     Toastify({
//         text:`Ingreso ${usuario} al chat`,
//         duration:5000,
//         position:'right',
//         style: {
//             background: "linear-gradient(to right, #00b09b, #96c93d)",
//           }
//     }).showToast()
//  })
const message = [];

io.on("connection", (socket) => {
  console.log(`User ${socket.id} Connection`);

  //Nombre del usuario
  let userName = "";
  // Mesaje de Coneccion
  socket.on("userConnection", (data) => {
    userName = data.user;
    message.push({
      id: socket.id,
      info: "connection",
      name: data.user,
      message: `${data.user} Connectado`,
      date: new Date().toTimeString(),
    });
    io.sockets.emit("userConnection", message);
  });
  // Mensaje de Mesaje enviado
  socket.on("userMessage", (data) => {
    message.push({
      id: socket.id,
      info: "message",
      name: userName,
      message: data.message,
      date: new Date().toTimeString(),
    });
    io.sockets.emit("userMessage", message);
  });
  //Mensage Usuario escribiendo
  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});