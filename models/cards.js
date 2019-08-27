class localCards {
    constructor() {
        this.results = {};
    }
    initData() {
        this.data = {
            _id: "",
            name: "",
            material: "",
            height: "",
            width: "",
            images: {
                1: {
                    side: "",
                    location: "",
                    posX: "",
                    posY: ""
                }
            },
            text: {
                1 : {
                    side: "",
                    text: "",
                    font: "",
                    size: "",
                    color: "",
                    align: ""
                }
            }
        };
    }
    getData() { return JSON.stringify(this.data); }
    setData(results) {
        try {
            this.initData();
            this.results = results;
            this.data.name     = this.results[0].name;
            this.data.material = this.results[0].material;
            this.data.height   = this.results[0].height;
            this.data.width    = this.results[0].width;
            this.data.images   = this.results[0].images;
            this.data.text     = this.results[0].text;
        } catch(e) {
            this.initData();
            throw 'Error loading model... 88998800';  // pass back to controller try/catch
        }
    }
    getImages() { return JSON.stringify(this.data.images); }
    getText() { return JSON.stringify(this.data.text); }
    getName() { return JSON.stringify(this.data.name); }
    getMaterial() { return JSON.stringify(this.data.material); }
    getHeight() { return JSON.stringify(this.data.height); }
    getWidth() { return JSON.stringify(this.data.width); }
}

tmpCards = new localCards();

module.exports = tmpCards;

