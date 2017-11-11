import * as express from 'express';
import * as cors from 'cors';
import { Routers } from './routes';
import * as mongodb from 'mongoose';
import { createFakeHotels } from './service/fakeHotels'

let mongoose = mongodb;
const nuPort:number = 5060;
mongoose.Promise = global.Promise;
let app = express();
app.use(express.static('public'));
app.set('view engine', 'jade');
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});
app.use("/", Routers(express.Router()));
mongoose.connect('mongodb://aechavarria:Autonoma18@ds117311.mlab.com:17311/pruebas', { useMongoClient: true });
let db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error:'));
db.once("open", () => {
    createFakeHotels();
});
app.listen(nuPort, () => {
    console.log(`running in http://localhost:${nuPort}/`);
});