const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()
const Gun = require('../models/gun')

const ar15 = {
  model: 'AR-15',
  firingMode: 'Semi-automatic',
  caliber: '.223 Rem',
  picUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Stag2wi_.jpg',
  picUrlSq: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Stag2wi_.jpg',
  description: 'A lightweight semi-automatic rifle'
}

chai.use(chaiHttp)

describe('Guns', () => {
  after(() => {
    Gun.deleteMany({ $or: [{ model: 'AR-15' }, { model: 'Spider' }] }).exec(
      (err, guns) => {
        console.log(guns)
        guns.remove()
      }
    )
  })

  // TEST INDEX
  it('should index ALL guns on / GET', (done) => {
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.html
        done()
      })
  })

  // TEST NEW
  it('should display new form on /guns/new GET', (done) => {
    chai
      .request(server)
      .get('/guns/new')
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.html
        done()
      })
  })

  // TEST CREATE
  it('should create a SINGLE gun on /guns POST', (done) => {
    chai
      .request(server)
      .post('/guns')
      .send(ar15)
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.html
        done()
      })
  })

  // TEST SHOW
  it('should show a SINGLE gun on /guns/<id> GET', (done) => {
    const gun = new Gun(ar15)
    gun.save((err, data) => {
      chai
        .request(server)
        .get(`/guns/${data._id}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.should.be.html
          done()
        })
    })
  })

  // TEST EDIT
  it('should edit a SINGLE gun on /guns/<id>/edit GET', (done) => {
    const gun = new Gun(ar15)
    gun.save((err, data) => {
      chai
        .request(server)
        .get(`/guns/${data._id}/edit`)
        .end((err, res) => {
          res.should.have.status(200)
          res.should.be.html
          done()
        })
    })
  })

  // TEST UPDATE
  it('should update a SINGLE gun on /guns/<id> PUT', (done) => {
    const gun = new Gun(ar15)
    gun.save((err, data) => {
      chai
        .request(server)
        .put(`/guns/${data._id}?_method=PUT`)
        .send({ model: 'Spider' })
        .end((err, res) => {
          res.should.have.status(200)
          res.should.be.html
          done()
        })
    })
  })

  // TEST DELETE
  it('should delete a SINGLE gun on /guns/<id> DELETE', (done) => {
    const gun = new Gun(ar15)
    gun.save((err, data) => {
      chai
        .request(server)
        .delete(`/guns/${data._id}?_method=DELETE`)
        .end((err, res) => {
          res.should.have.status(200)
          res.should.be.html
          done()
        })
    })
  })
})
