
class localWrapper {
    constructor() { this.init() }
    init() {
        let server = require('./server');
        let localServer = new server();
        localServer.initListen()
        localServer.initDb();
    }
}

new localWrapper();
