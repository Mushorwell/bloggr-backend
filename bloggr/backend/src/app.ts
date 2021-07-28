import config from 'config';
import express from 'express';
import connect from './db/connect';
import routes from './routes';
import log from './logger';
import { deserializeUser } from './middleware';
import demo from './Data/demo.data';

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(deserializeUser);

app.use(express.json());

app.listen( port, host,():void =>{
    log.info(`Timezones by location application is running at http://${host}:${port}.`);
    connect();
    routes(app);
});


