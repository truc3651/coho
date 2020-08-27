const express = require('express')
const router = express.Router()
const factCtrl = require('../controller/FactControllers/FactCtrl')
const unities = require('../controller/unities')
const upload = unities.upload

// Insert Page
router.get('/create', (req, res) => {
    factCtrl.goToInsert(req, res)
})

// Insert / Update Fact
router.post('/create', upload, async(req, res) => {
    if (req.body._id == '') {
        factCtrl.insert(req, res)
    } else
        factCtrl.edit(req, res)
})

// Get model
router.get('/edit/:id', (req, res) => {
    factCtrl.getModel(req, res)
})

// Delete Fact
router.get('/delete/:id', (req, res) => {
    factCtrl.delete(req, res)
})

router.get('/allFacts', (req, res) => {
    factCtrl.allFacts(req, res)
})

// Get Fact based on Cate
router.get('/:cate', (req, res) => {
    factCtrl.getAll(req, res)
})

// show news
router.get('/:cate/:id', (req, res) => {
    factCtrl.getNews(req, res)
})

module.exports = router