const express = require("express")
const app = express()
const dotenv = require("dotenv")
const connectDB = require("./configs/dbConnect")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require('cors')
const routes = require("./routes")
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const { swaggerDocs } = require("./configs/swagger")
const {buildSocket } = require("./routes/Socket")

// config environment variables
dotenv.config()

// handle data types json and handle data in postman
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/socket.io', express.static(__dirname + '/node_modules/socket.io/client-dist'));

//connect to frontend 
app.use(cors())
app.use(cookieParser())

//connect to mongoose db
connectDB()
// define routes in app

// config swagger
routes(app)
app.get('/', (req, res) => {
    return res.send('Chin chao moi nguoi !')
})
app.get('/404', (req, res) => {
    return res.send('404 not found!')
})

// io.on('connection', client => {
//   buildSocket(client);
//   console.log("connected");
// });

io.on('connection', (socket) => {
    console.log('A user connected');
  
    // Handle events from the client
    socket.on('chat message', (message) => {
      console.log('Received message:', message);
  
      // Broadcast the message to all connected clients
      io.emit('chat message', message);
    });
  
    // Handle disconnect event
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

const port = process.env.PORT || 3001;
app.listen(port, () => {
    swaggerDocs(app, process.env.PORT)
    console.log("Server is running on " + port)
})