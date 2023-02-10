require('dotenv').config();
const exp = require('constants');
const path = require('path');
const cookieParser = require('cookie-parser');

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const cors = require('cors');

const PORT = 3000;
const DB_KEY = process.env.DB_KEY;

const apiRouter = require('./routes/api.js');
const loginRouter = require('./routes/login.js');
const signupRouter = require('./routes/signup.js');

const dbController = require('./controllers/dbController.js');
const aiController = require('./controllers/aiController.js');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: '*',
    methods: '*',
    headers: '*',
    credentials: true,
  })
);

app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/api', apiRouter);

app.patch('/profile', dbController.patchUser, (req, res) => {
  // console.log(res.locals);
  res.status(201);
});

app.use('/', (req, res) => res.status(404).send('404: Page not found'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught an unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };

  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// WEBSOCKETS
io.on('connection', (socket) => {
  console.log('user connected');
  // message handling
  socket.on('send-message', async (body) => {
    // console.log(body);

    const data = await dbController.sendMessageFromSocket(body);
    // console.log(data);
    body.message;

    io.emit('receive-message', data);
  });

  socket.on('cast-a-vote', async (body) => {
    body.message;

    io.emit('current-players', data);
  });

  // Generate ai messages
  const startAiEmit = async (socket) => {
    const emitAiMessage = (socket, aiUserId) => {
      setTimeout(async () => {
        console.log('generating a new AI message...');
        const aiMessage = await aiController.getAiMessage();
        const messageObject = await dbController.sendAiMessageFromSocket(
          aiMessage,
          aiUserId
        );

        socket.emit('receive-message', messageObject);

        emitAiMessage(socket, aiUserId);
      }, Math.random() * 10000 + 40000);
    };

    const aiUserId = await aiController.getAiUser();
    emitAiMessage(socket, aiUserId);
  };

  startAiEmit(socket);
});

server.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
