const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');
const Sequelize = require('sequelize');
const methodOverride = require('method-override');
const session = require('express-session');

const socketio = require('socket.io');

const app = express();
const taskRoutes = require('./routes/tasks_routes');
const registrationsRoutes = require('./routes/registrations_routes');
const sessionsRoutes = require('./routes/sessions_routes');
const categoriessRoutes = require('./routes/categories_routes');
const findUserMiddleware = require('./middlewares/find_user');

app.use(session({
  secret:['sahjbhj1516145','asdhbkb2200221'],
  saveUninitialized:false,
  resave:false
}));
app.use(findUserMiddleware);
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(taskRoutes);
app.use(registrationsRoutes);
app.use(sessionsRoutes);
app.use(categoriessRoutes);



app.set('view engine','pug');

app.get('/',function (req,res) {
  if (!req.user) res.redirect('/sessions');
  res.render('home',{user:req.user});

})
let server = app.listen(3000,function() {
  console.log('Servidor Iniciado');
});

let io = socketio(server);
let sockets = {};
let usersCount = 0;
io.on('connection',function(socket){
  let userId = socket.request._query.loggeduser;
  if(userId) sockets[userId] = socket;

  usersCount++;
  io.emit('count_updated',{count:usersCount});

  socket.on('new_task',function(data){
    if(data.userId){
      let userSocket = socket[data.userId];
      if(!userSocket) return

      userSocket.emit('new_task',data);
    }
  });
  socket.on('disconnect',function(){
    Object.keys(sockets).forEach(userId=>{
      let s = sockets[userId];
      if(s.id == socket.id) sockets[user.id]=null;
    })
    usersCount--;
    io.emit('count_updated',{count:usersCount});
  })
});

const client = require('./realtime/client');
