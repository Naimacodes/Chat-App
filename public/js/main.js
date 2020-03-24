const socket =  io()

//socket io allows us to emit events back and forth

socket.on('message', message => {
  console.log(message);
})