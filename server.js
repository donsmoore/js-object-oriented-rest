let config = require('./config');

class localApp {
    constructor() {
    }
    initListen() {
        this.listenError = null;
        this.expressPort = 8080;
        this.expressApp = require('express')();
        this.expressApp.use('/', require('./routes/routes').router);
        this.expressApp
            .listen(this.expressPort, () => {
                this.listenError = false;
                console.log('SUCCESS: Listening on port: ' + this.expressPort)
            })
            .on('error', function (e) {
                let errorMsg = 'ERROR: Port ' + this.expressPort + ' is in use... 893498394'
                this.listenError = true;
                console.log(errorMsg);
            }
            .bind(this))
    }
    initDb() {
        if (this.listenError === true) {
            console.log('ERROR: MongoDB not connected.');
        } else {
            this.dbMode = 'PROD';
            this.dbName = config.MONGO_DATA || 'cardConfig';
            this.dbMongoClient = require('mongodb');
            this.ObjectId = require('mongodb').ObjectId;
            this.dbUri = this.getConnectionString();
            this.dbMongoClient.connect(this.dbUri, {useNewUrlParser: true, useUnifiedTopology: true})
                .then(dbClient => {
                    console.log('SUCCESS: MongoDB connect: ' + this.dbName);
                    this.expressApp.locals.dbClient = dbClient;
                    this.expressApp.locals.dbName = this.dbName;
                    this.expressApp.locals.ObjectId = require('mongodb').ObjectId;
                    this.expressApp.locals.isValid = require('mongodb').isValid;
                    this.expressApp.locals.collection = this.expressApp.locals.dbClient.db(this.dbName)
                })
                .catch(error => console.error('ERROR: ' + error));
            process.on('SIGINT', () => {
                this.expressApp.locals.dbClient.close();
                console.log('MongoDB closed.');
                process.exit();
            });
        }
    }
    getConnectionString() {
        this.dbName = config.MONGO_DATA || 'cardConfig';
        this.dbUser = config.MONGO_USER || 'username';
        this.dbPass = config.MONGO_PASS || 'password';
        this.dbHost = config.MONGO_HOST || 'cluster0-w5rjh.gcp.mongodb.net';
        this.dbConn = config.MONGO_CONN || 'mongodb+srv';
        this.dbOpts  = '?retryWrites=true'; // improves write reliability, only works on sharded systems not single local instances
        this.dbOpts += '&w=majority';       // Write concern describes the level of acknowledgment requested from MongoDB for write operations
        this.dbUri = this.dbConn + '://';
        if (this.dbMode === 'PROD') { this.dbUri += this.dbUser + ':' + this.dbPass + '@' + this.dbHost + '/' + this.dbOpts; }
        if (this.dbMode === 'DEV')  { this.dbUri += this.dbHost; }
        console.log('MODE: ' + this.dbMode);
        console.log('CONN: ' + this.dbConn);
        console.log('HOST: ' + this.dbHost);
        return this.dbUri;
    }
}

module.exports = localApp;
