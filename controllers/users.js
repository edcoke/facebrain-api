const handleUsers = (req, res, db) => {
    db.select('*')
        .from('users')
        .then(data => res.json(data))
        .catch(err => {res.json('unable to get users')})
}

module.exports = {
    handleUsers
}
