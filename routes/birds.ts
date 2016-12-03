import * as express from "express";

namespace Route {
    export let router: express.Router = express.Router();

    router.get("/", function(req, res) {
        res.send("Birds home page");
    });

}


export let birds = Route.router;
