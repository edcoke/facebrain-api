const express = require('express');
const bcrypt= require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');
const users = require('./controllers/users');


const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan('combined'));
app.use(cors());

//      For running locally
// const db = knex({
//     client: 'pg',
//     connection: {
//         host: 'localhost',
//         user: 'postgres',
//         password: 'Rez5-Kidi',
//         database: 'smart-brain'
//     }
// });
//      for docker container
const db = knex({
    client: 'pg',
    connection: process.env.POSTGRES_URI
});

app.get('/', (req, res) => {users.handleUsers(req, res, db)});
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)} );
app.post('/profile/:id', (req, res) => {profile.handleProfileUpdate(req, res, db)} );
//app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)}  );
app.post('/signin', signin.signinAuthentication(db, bcrypt));
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)} );
app.put('/image', (req, res) => {image.handleImage(req,res,db)});
app.post('/imageurl', (req, res) => {
    image.handleApiCall(req, res);
})
app.listen(3000, () => {
    console.log('listening on port 3000' );
})



