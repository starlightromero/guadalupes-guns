const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const Gun = require('../models/gun')

const mocha = require('mocha')
const describe = mocha.describe
const after = mocha.after
const it = mocha.it

const { expect } = chai
chai.use(chaiHttp)

const ar15 = {
  model: 'AR-15',
  firingMode: 'Semi-automatic',
  caliber: '.223 Rem',
  picUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Stag2wi_.jpg',
  picUrlSq: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Stag2wi_.jpg',
  description: 'A lightweight semi-automatic rifle',
  price: 999.99,
}

const mossberg = {
  model: 'Mossberg 500',
  firingMode: 'Single-shot',
  caliber: '12 gauge',
  picUrl:
    'https://www.sportsmansoutdoorsuperstore.com/prodimages/25692-DEFAULT-l.jpg',
  picUrlSq:
    'https://www.sportsmansoutdoorsuperstore.com/prodimages/25692-DEFAULT-l.jpg',
  description: 'A pump action shotgun manufactured by O.F. Mossberg & Sons.',
  price: 559.99,
}

describe('Guns', function () {
  this.timeout(5000)

  after(function (done) {
    Gun.deleteMany({
      $or: [{ model: 'AR-15' }, { model: 'Mossberg 500' }],
    }).exec(function (err, guns) {
      if (err) {
        done(err)
      }
      done()
    })
  })

  // TEST INDEX
  it('should index ALL guns on / GET', function (done) {
    chai
      .request(server)
      .get('/')
      .end(function (err, res) {
        if (err) {
          done(err)
        }
        expect(res).to.have.status(200)
        expect(res.text).to.include('html')
        done()
      })
  })
  
  it('should list ALL pets on /pets GET', function(done) {
    chai
      .request(server)
      .get('/')
      .set('content-type', 'application/json')
      .end(function(err, res){
        if (err) {
          done(err)
        }
        expect(res).to.have.status(200)
        expect(res).to.be('json')
        expect(res.body).to.be.a('object')
        done();
      });
  });

  // TEST NEW
  it('should display new form on /guns/new GET', function (done) {
    chai
      .request(server)
      .get('/guns/new')
      .end(function (err, res) {
        if (err) {
          done(err)
        }
        expect(res).to.have.status(200)
        expect(res.text).to.include('html')
        done()
      })
  })

  // TEST CREATE
  it('should create a SINGLE gun on /guns POST', function (done) {
    chai
      .request(server)
      .post('/guns')
      .send(ar15)
      .end(function (err, res) {
        if (err) {
          done(err)
        }
        expect(res).to.have.status(200)
        expect(res.text).to.include('html')
        done()
      })
  })

  // TEST SHOW
  it('should show a SINGLE gun on /guns/<id> GET', function (done) {
    const gun = new Gun(ar15)
    gun.save(function (err, data) {
      if (err) {
        done(err)
      }
      chai
        .request(server)
        .get(`/guns/${data._id}`)
        .end(function (err, res) {
          if (err) {
            done(err)
          }
          expect(res).to.have.status(200)
          expect(res.text).to.include('html')
          done()
        })
    })
  })

  // TEST EDIT
  it('should edit a SINGLE gun on /guns/<id>/edit GET', function (done) {
    const gun = new Gun(ar15)
    gun.save(function (err, data) {
      if (err) {
        done(err)
      }
      chai
        .request(server)
        .get(`/guns/${data._id}/edit`)
        .end(function (err, res) {
          if (err) {
            done(err)
          }
          expect(res).to.have.status(200)
          expect(res.text).to.include('html')
          done()
        })
    })
  })

  // TEST UPDATE
  it('should update a SINGLE gun on /guns/<id> PATCH', function (done) {
    const gun = new Gun(ar15)
    gun.save(function (err, data) {
      if (err) {
        done(err)
      }
      chai
        .request(server)
        .patch(`/guns/${data._id}?_method=PATCH`)
        .send(mossberg)
        .end(function (err, res) {
          if (err) {
            done(err)
          }
          expect(res).to.have.status(200)
          expect(res.text).to.include('html')
          done()
        })
    })
  })

  // TEST DELETE
  it('should delete a SINGLE gun on /guns/<id> DELETE', function (done) {
    const gun = new Gun(mossberg)
    gun.save(function (err, data) {
      if (err) {
        done(err)
      }
      chai
        .request(server)
        .delete(`/guns/${data._id}?_method=DELETE`)
        .end(function (err, res) {
          if (err) {
            done(err)
          }
          expect(res).to.have.status(200)
          expect(res.text).to.include('html')
          done()
        })
    })
  })

  // SEARCH
  it('should search ALL guns by model on /search GET', function (done) {
    chai
      .request(server)
      .get('/search?term=Semi-automatic')
      .end(function (err, res) {
        if (err) {
          done(err)
        }
        expect(res).to.have.status(200)
        expect(res.text).to.include('html')
        done()
      })
  })
})
