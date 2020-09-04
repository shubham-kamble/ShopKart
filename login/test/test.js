process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
var Product = require("../Product.model");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../main');
chai.use(chaiHttp);

describe('Product', () => {
    beforeEach((done) => {
        Product.remove({}, (err) => {
            done();
        });
    });

    describe('/GET api/products', () => {
        it('GET all the products', (done) => {
            chai.request(server)
                .get('/api/products')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });
    describe('/GET api/latestproducts', () => {
        it('GET latest 3 products', (done) => {
            let product = new Product({"name":"PlayStation 4","desc":"Slim 500GB, Gaming Console","price":"24990","image":"/images/ps.jpg","category":"gaming"});
            product.save((err, pro) => {});
            let product1 = new Product({"name":"PlayStation 4","desc":"Slim 500GB, Gaming Console","price":"24990","image":"/images/ps.jpg","category":"gaming"});
            product1.save((err, pro) => {});
            let product2 = new Product({"name":"PlayStation 4","desc":"Slim 500GB, Gaming Console","price":"24990","image":"/images/ps.jpg","category":"gaming"});
            product2.save((err, pro) => {});
            let product3 = new Product({"name":"PlayStation 4","desc":"Slim 500GB, Gaming Console","price":"24990","image":"/images/ps.jpg","category":"gaming"});
            product3.save((err, pro) => {});
            let product4 = new Product({"name":"PlayStation 4","desc":"Slim 500GB, Gaming Console","price":"24990","image":"/images/ps.jpg","category":"gaming"});
            product4.save((err, pro) => {});
            chai.request(server)
                .get('/api/latestproducts')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.length.should.be.eql(3);
                    done();
                });
        });
    });
    describe('/GET products/:id', () => {
        it(' GET a product by the given id', (done) => {
          let product = new Product({"name":"PlayStation 4","desc":"Slim 500GB, Gaming Console","price":"24990","image":"/images/ps.jpg","category":"gaming"});
          product.save((err, pro) => {
              chai.request(server)
              .get('/api/products/' + pro.id)
              .send(pro)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(1);
                done();
              });
          });
        });
    });
    describe('/GET product name', () => {
        it(' GET a product by the given id', (done) => {
          let product = new Product({"name":"PlayStation 4","desc":"Slim 500GB, Gaming Console","price":"24990","image":"/images/ps.jpg","category":"gaming"});
          product.save((err, pro) => {
              chai.request(server)
              .get('/api/products/' + pro.id)
              .send(pro)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body[0].name.should.be.eql('PlayStation 4');
                  res.body[0].desc.should.be.eql('Slim 500GB, Gaming Console');
                  res.body[0].price.should.be.eql('24990');
                  res.body[0].image.should.be.eql('/images/ps.jpg');
                  res.body[0].category.should.be.eql('gaming');
                done();
              });
          });
        });
    });
    describe('/GET product object', () => {
        it(' GET a product by the given id', (done) => {
          let product = new Product({"name":"PlayStation 4","desc":"Slim 500GB, Gaming Console","price":"24990","image":"/images/ps.jpg","category":"gaming"});
          product.save((err, pro) => {
              chai.request(server)
              .get('/api/products/' + pro.id)
              .send(pro)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body[0].should.have.property('name');
                done();
              });
          });
        });
    });
    describe('/GET product details', () => {
        it(' GET a product by the given id', (done) => {
          let product = new Product({"name":"PlayStation 4","desc":"Slim 500GB, Gaming Console","price":"24990","image":"/images/ps.jpg","category":"gaming"});
          product.save((err, pro) => {
              chai.request(server)
              .get('/api/products/' + pro.id)
              .send(pro)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body[0].should.have.property('name');
                  res.body[0].should.have.property('desc');
                  res.body[0].should.have.property('price');
                  res.body[0].should.have.property('image');
                  res.body[0].should.have.property('category');
                done();
              });
          });
        });
    });
    describe('/GET api/categories', () => {
        it('GET latest categories', (done) => {
            let product = new Product({"name":"PlayStation 4","desc":"Slim 500GB, Gaming Console","price":"24990","image":"/images/ps.jpg","category":"gaming"});
            product.save((err, pro) => {});
            let product1 = new Product({"name":"PlayStation 4","desc":"Slim 500GB, Gaming Console","price":"24990","image":"/images/ps.jpg","category":"gaming"});
            product1.save((err, pro) => {});
            let product2 = new Product({"name":"PlayStation 4","desc":"Slim 500GB, Gaming Console","price":"24990","image":"/images/ps.jpg","category":"gaming"});
            product2.save((err, pro) => {});
            let product3 = new Product({"name":"PlayStation 4","desc":"Slim 500GB, Gaming Console","price":"24990","image":"/images/ps.jpg","category":"gaming"});
            product3.save((err, pro) => {});
            let product4 = new Product({"name":"PlayStation 4","desc":"Slim 500GB, Gaming Console","price":"24990","image":"/images/ps.jpg","category":"gaming"});
            product4.save((err, pro) => {});
            chai.request(server)
                .get('/api/categories')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.length.should.be.eql(1);
                    done();
                });
        });
    });
    describe('/GET api/categories/:category', () => {
        it('GET products by categories', (done) => {
            let product = new Product({"name":"PlayStation 4","desc":"Slim 500GB, Gaming Console","price":"24990","image":"/images/ps.jpg","category":"gaming"});
            product.save((err, pro) => {});
            let product1 = new Product({"name":"PlayStation 4","desc":"Slim 500GB, Gaming Console","price":"24990","image":"/images/ps.jpg","category":"phone"});
            product1.save((err, pro) => {});
            let product2 = new Product({"name":"PlayStation 4","desc":"Slim 500GB, Gaming Console","price":"24990","image":"/images/ps.jpg","category":"phone"});
            product2.save((err, pro) => {});
            let product3 = new Product({"name":"PlayStation 4","desc":"Slim 500GB, Gaming Console","price":"24990","image":"/images/ps.jpg","category":"gaming"});
            product3.save((err, pro) => {});
            let product4 = new Product({"name":"PlayStation 4","desc":"Slim 500GB, Gaming Console","price":"24990","image":"/images/ps.jpg","category":"gaming"});
            product4.save((err, pro) => {});
            chai.request(server)
                .get('/api/categories/phone')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.length.should.be.eql(2);
                    done();
                });
        }); 
    });
});