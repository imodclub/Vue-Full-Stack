const express = require('express');
const mongodb = require('mongodb');

const router = express.Router()

//Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
})


//Add Posts
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
})


//Delete Posts
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id:new mongodb.ObjectId(req.params.id)});
    res.status(200).send();
})



async function loadPostsCollection() {
    try {
        const client = await mongodb.MongoClient.connect
            ('mongodb+srv://imodclub:BlackShadow@cluster0.ok1dh.mongodb.net/test?retryWrites=true&w=majority', {
                useNewUrlParser: true
            });
        return client.db('test').collection('post');
    }catch(err) {
    console.log(err);
    }
}

module.exports = router;