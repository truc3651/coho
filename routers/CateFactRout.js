const express = require('express')
const router = express.Router()
const cateFactCtrl = require('../controller/FactControllers/CateFactCtrl')

// Get All
router.get('/', (req, res) => {
    cateFactCtrl.getAll(req, res)
})

// Insert Page
router.get('/create', (req, res) => {
    cateFactCtrl.goToInsert(req, res)
})

// Insert / Update Fact
router.post('/create', async(req, res) => {
    if (req.body._id == '') {
        cateFactCtrl.insert(req, res)
    } else
        cateFactCtrl.edit(req, res)
})

// Get model
router.get('/edit/:id', (req, res) => {
    cateFactCtrl.getModel(req, res)
})

// Delete Fact
router.get('/delete/:id', (req, res) => {
    cateFactCtrl.delete(req, res)
})

module.exports = router