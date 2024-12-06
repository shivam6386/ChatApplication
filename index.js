const express = require('express');
const http =require('http');
const socketio=require('socket.io');
const connectDB =require('./config/database-config');
const Chat=require('./model/chat');
const app = express();

const server=http.createServer(app);
const io=socketio(server);



const port = 3000
// Connect to MongoDB
connectDB();

io.on('connection',(socket)=>  {
    console.log("User Connected",socket.id);
 
  
    //Code for connecting user can connect to particular room 
    socket.on('join_room',(data)=>{
     console.log("joining a room",data.roomid);
      
      socket.join(data.roomid);
    
      
    });
   //message is rcvd in backend
   

    socket.on("msg_send", async (data)=>{
      console.log(data);
      const chat = await Chat.create({
        roomId:data.roomid,
        user:data.username,
        content:data.msg
      });
      io.to(data.roomid).emit('msg_rcvd',data); // when message is rcvd on backend than  message is only going to pop up to those socket which are connected to particular socket.
    });

});


app.set('view engine','ejs');
app.use('/',express.static(__dirname+ '/public'));

app.get('/chat/:roomid',async (req,res)=>{
  const chats = await Chat.find({
    roomId: req.params.roomid
}).select('content user');
console.log(chats);
  res.render('index',{
    name:'shivam',
    id:req.params.roomid,
    chats: chats
  });
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
 
})