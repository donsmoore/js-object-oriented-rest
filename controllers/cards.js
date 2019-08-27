
class localCard {
    constructor() {
        this.getCard = this.getCard.bind(this); // need this to use "this" in async function
        this.data    = require('../models/cards')
        this.output  = '';
    }
    index(req, res) {
        console.log('Testing CARDS...');
        res.status(200).send({"success":"This is cards testing."})
    }
    async getCard(req, res) {
        try {
            this.data.initData();
            console.log('- START --------------------------------------------------------------------------------------------');
            console.log('CARDS: NEWLY INITIALIZED EMPTY MODEL: this.data.getData(): ' + this.data.getData());
            this.dbTable      = 'cardAttributes';
            this.dbName       = req.app.locals.dbName;
            this.dbClient     = req.app.locals.dbClient.db(this.dbName);
            this.ObjectId     = req.app.locals.ObjectId;
            this.searchParam1 = req.params.id;
            this.searchObject = { _id : this.ObjectId(this.searchParam1)};
            console.log('CARDS: CONNECT TABLE: ' + this.dbTable);
            console.log('CARDS: SEARCH FOR: '  + JSON.stringify(this.searchObject));
            this.localCollection = this.dbClient.collection(this.dbTable);
            this.localCollection
                .find({"_id" : this.ObjectId(req.params.id)})
                .toArray()
                .then((response) => {res.status(200).send(this.outputIt(response))})
                .catch((response) => {res.status(500).send('{"error":"message, probably a permission error in db db user."}')})

        } catch (e) {
            console.log('Error: '+e);
            res.status(500).send({"error":"Card not found. 05968934"})
        }
    }
    static divStart() { return '<div style="height:300px; width:600px; border: 1px solid black;">'; }
    static divEnd() { return '</div>' };
    initOutput(param1 = '') { this.output = param1; }
    setOutput(param1) { this.output += param1; }
    getOutput() { return this.output; }
    outputIt(response) {
        try {
            this.data.setData(response);
            this.initOutput(localCard.divStart());
            this.setOutput(this.data.getData());
            this.setOutput(localCard.divEnd());
            console.log('CARD RESPONSE: data.getName(): ' + this.data.getName());
            console.log('CARD RESPONSE: data.getMaterial(): ' + this.data.getMaterial());
            console.log('CARD RESPONSE: data.getWidth(): ' + this.data.getWidth());
            console.log('CARD RESPONSE: data.getHeight(): ' + this.data.getHeight());
            console.log('CARD RESPONSE: data.getImages(): ' + this.data.getImages());
            console.log('CARD RESPONSE: data.getText(): ' + this.data.getText());
            console.log('CARD RESPONSE: this.getOutput: ' + this.getOutput());
        } catch(e) {
            this.initOutput('{"error":"' + e + '"}');
            console.log('CARD RESPONSE ERROR: ' + this.getOutput());
        }
        return this.getOutput();
    }
}
let tmpCard = new localCard();

module.exports = tmpCard;