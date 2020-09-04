process.env.NODE_ENV = 'test';
var Product = require("../Product.model");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../main');
let should = chai.should();
chai.use(chaiHttp);

describe('Product', () => {
    beforeEach((done) => {
        Product.remove({}, (err) => {
            done();
        });
    });

    describe('/POST product', () => {
        it('it should post product', (done) => {
        let product = new Product({"name":"New PS5","desc":"Slim 500GB, Gaming Console","price":"24990","image":"/images/ps.jpg","category":"gaming"});
          chai.request(server)
              .post('/api/addproduct')
              .send(product)
              .end((err, res) => {
                    should.exist(res.body);
                    res.body.should.have.property('msg');
                    res.body.msg.should.be.eql('New Order Created');
                done();
              });
        });
  
    });

    describe('/PUT/:id product', () => {
        it('it should UPDATE a product given the id', (done) => {
            let product = new Product({"name":"Playstation 4","desc":"Slim 500GB, Gaming Console","price":"24990","image":"/images/ps.jpg","category":"gaming"});
            let updatedProduct ={"name":"New PS5","desc":"Slim 500GB, Gaming Console","price":"24990","image":"/images/ps.jpg","category":"gaming"};
            product.save((err, prod) => {
                  chai.request(server)
                  .put('/api/updateproduct/' + prod.id)
                  .send(updatedProduct)
                  .end((err, res) => {
                        should.exist(res.body);
                        res.body.should.be.a('object');
                        res.body.should.have.property('msg').eql('Updated Successfully');
                    done();
                  });
            });
        });
    });

    describe('/DELETE/:id product', () => {
        it('it should DELETE a product given the id', (done) => {
            let product = new Product({"name":"Playstation 4","desc":"Slim 500GB, Gaming Console","price":"24990","image":"/images/ps.jpg","category":"gaming"});
            product.save((err, product) => {
                  chai.request(server)
                  .delete('/api/deleteproduct/' + product.id)
                  .end((err, res) => {
                        should.exist(res.body);
                        res.body.should.be.a('object');
                        res.body.should.have.property('msg').eql('deleted successfully');
                    done();
                  });
            });
        });
    });
});