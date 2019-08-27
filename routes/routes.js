
class localRouter {
    constructor() {

        this.router = require('express').Router();

        this.controller = require('../controllers/test');
        this.router.get('/test',       this.controller.index);
        this.router.get('/test/1',     this.controller.test1);
        this.router.get('/test/:id',   this.controller.test2);

        this.controller = require('../controllers/cards');
        this.router.get('/cards',      this.controller.index);
        this.router.get('/cards/:id',  this.controller.getCard);

    }
}
tmpRouter = new localRouter();

module.exports = tmpRouter;

