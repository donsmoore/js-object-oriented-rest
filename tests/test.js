
import chai from 'chai';
import chaiHttp from 'chai-http';
import localApp from '../app';

chai.use(chaiHttp);
chai.should();

chai.use(chaiHttp);
chai.should();
describe("Test", () => {
    describe("GET /test", () => {
        it("should get test response", (done) => {
            chai.request(localApp)
                .get('test/')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});

