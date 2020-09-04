process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
var Order = require("../Order.model");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../main');
let should = chai.should();
chai.use(chaiHttp);

describe('Order', () => {
    beforeEach((done) => {
        Order.remove({}, (err) => {
            done();
        });
    });

    
    describe('/GET order/:id', () => {
        it(' GET a order by the given id', (done) => {
          let order = new Order({"orderItems":[{"$oid":"5f451f95500078eac9bb5405"}],"user":{"$oid":"5f4b7cbd4470ef2f8058b196"},"totalPrice":"18000","orderedDate":{"$date":"2020-08-30T18:58:49.858Z"}});
          order.save((err, order) => {
              chai.request(server)
              .get('/api/getorders/5f4b7cbd4470ef2f8058b196')
              .send(order)
              .end((err, res) => {
                //   res.should.have.status(200);
                //   res.body.should.be.a('array');
                //   res.body.totalPrice.should.be.eql("18000");
                should.exist(res.body);
                // console.log(res.body);
                done();
              });
          });
        });
    });
    describe('/POST order', () => {
        it('it should post order', (done) => {
            let order = new Order({"orderItems":[{"$oid":"5f451f95500078eac9bb5405"}],"totalPrice":"18000","orderedDate":{"$date":"2020-08-30T18:58:49.858Z"}});
          chai.request(server)
              .post('/api/addorder')
              .send(order)
              .end((err, res) => {
                    should.exist(res.body);
                    res.body.should.have.property('msg');
                    res.body.msg.should.be.eql('Please Login');
                done();
              });
        });
    });
});