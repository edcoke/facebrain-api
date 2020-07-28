const jwt = require('jsonwebtoken');
const redis = require('redis');

//Setup Redis
console.log("redis env", process.env.REDIS_URI);
const redisClient = redis.createClient({host: process.env.REDIS_URI});

const handleSignin = (req, res, db, bcrypt) => {
    const{email, password} = req.body;
    if(!email || !password){
        return Promise.reject('incorrect form submission');
    }
    return db.select('email', 'hash')
        .from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash)
            if(isValid){
                return db.select('*')
                    .from('users')
                    .where('email', '=', email)
                    .then(user => user[0])
                    .catch(err => Promise.reject('unable to get user'))
            } else {
                Promise.reject('wrong credentials');
            }
        })
        .catch(Promise.reject('wrong credentials'))
}

const getAuthTokenId = () => {
    console.log('auth ok');
}

const createSession = (user) => {
    //Create JWT token, add tu user & return;
    const {email, id} = user;
    const token = signToken(email);
    return {success: 'true', userId: id, token}
}

const signToken = (email) => {
    const jwtPayload = {email};
    return jwt.sign(jwtPayload, 'JWT_SECRET', {expiresIn: '2 days'});
}

const signinAuthentication = (db, bcrypt) => (req, res) => {
    const {authorization} = req.headers;
    return authorization?
        getAuthTokenId():
        handleSignin(req, res, db, bcrypt)
            .then(data => {
                return data.id && data.email? createSession(data): Promise.reject(data);
            })
            .then(session => res.json(session))
            .catch(err => res.status(400).json(err));
}

module.exports = {
    signinAuthentication
}
