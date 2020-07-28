const clarifai = require('clarifai');

const clarifaiApiKey = 'df0f8b728da64d1eb1fddbb054621400';

const app = new Clarifai.App({
    apiKey: clarifaiApiKey
})

const handleApiCall = (req, res) => {
    app.models.predict( Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('error getting face from api'));
}


const handleImage = (req, res, db) => {
    const {id} = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries)
        })
        .catch(err => {
            res.status(400).json('error getting entries')
        })
}

module.exports = {
    handleImage,
    handleApiCall
}
