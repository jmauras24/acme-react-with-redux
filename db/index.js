const conn = require('./conn');
const User = require('./User');

const sync = () => {
  return conn.sync({force: true})
}

const seed = () => {
  return Promise.all([
    User.create({name: 'Mike'}),
    User.create({name: 'Joe'}),
    User.create({name: 'Jerry'}),
    User.create({name: 'Ben'})
  ])
    .then( users => {
      console.log(`users created: ${users}`)
    })
}

module.exports = {
  sync,
  seed,
  models:{
    User
  }
}
