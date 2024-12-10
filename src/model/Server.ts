import express, { Application } from 'express';
import cors from 'cors';
import connectDB from '../db/connection';
import errorMDBHandler from '../middlewares/errorMDBHandler';
import AuthRoutes  from '../routes/auth'
import TestRoutes from '../routes/test'

enum AvailableRoutes {
    auth = 'auth',
    test = 'test'
}

class Server {
    private app: Application;
    private PORT: number;

    private prefix: string = 'api';
    private version: string = 'v1';

    constructor(port: number) {
        this.PORT = port;
        this.app = express();
        this.middlewares();
        this.loadDB()
        this.loadRoutes();
        this.app.use(errorMDBHandler);
    }

    private middlewares(): void {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private async loadDB(): Promise<void> {
        connectDB();
    }

    private loadRoutes(): void {
        this.app.use(`/${this.prefix}/${this.version}/${AvailableRoutes.auth}`, AuthRoutes)
        this.app.use(`/${this.prefix}/${this.version}/${AvailableRoutes.test}` , TestRoutes)
    }

    public run(): void {
        this.app.listen(this.PORT, () => {
            console.log(`Server running on port ${this.PORT}`);
        });
    }
}


export default Server;
