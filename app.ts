import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";
import * as cookieParser from "cookie-parser";
import {root} from "./routes/root";
import {birds} from "./routes/birds";

export class ServerApp {

    private _App: express.Express;
    public _Router: express.Router;
    constructor() {

        this._App = express();
        this._Router = express.Router();
        this._App.set("views", __dirname + "/views");
        this._App.set("view engine", "pug");
        // app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
        this._App.use(express.static(path.join(__dirname, "public")));
        this._App.use(bodyParser.json());
        this._App.use(bodyParser.urlencoded({ extended: false }));
        this._App.use(cookieParser());

        // Routes Handlers
        this._App.use("/", root);
        this._App.use("/birds", birds);

        // Handle 404
        this._App.use((req, res) => {
            res.status(400);
            res.render("error", { title: "404: File Not Found" });
        });

        // Handle 500
        this._App.use((error: express.ErrorRequestHandler, req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status(500);
            res.render("error", { title: "500: Internal Server Error", error: error });
        });
    }

    public startServer() {
        this._App.listen(5000);
        console.log("Server is running on port 5000");
    }


}
