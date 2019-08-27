
class localTest {
    constructor() {
    }
    index(req, res) {
        console.log('Testing AAAAA...');
        res.status(500).send({"success":"This is a test. AAAAA"})
    }
    test1(req, res) {
        console.log('Testing BBBBB...');
        res.status(500).send({"success":"This is a test. BBBBB"})
    }
    test2(req, res) {
        console.log('Testing CCCCC...' + req.params.id);
        res.status(500).send({"success":"This is a test. CCCC || id = " + req.params.id  })
    }
}

tmpTest = new localTest();

exports.index = tmpTest.index;
exports.test1 = tmpTest.test1;
exports.test2 = tmpTest.test2;





