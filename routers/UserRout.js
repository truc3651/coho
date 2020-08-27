const express = require('express')
const router = express.Router()
const userCtrl = require('../controller/UserControllers/UserCtrl')
const unities = require('../controller/unities')
const upload = unities.upload
const { forwardAuthenticated } = require('../config/auth')

// get All
router.get('/user-manager', async(req, res) => {
    userCtrl.getAll(req, res)
})

// login page
router.get('/login', forwardAuthenticated, async(req, res) => {
    userCtrl.goToLogin(req, res)
})

// login 
router.post('/login', (req, res, next) => {
    userCtrl.login(req, res, next)
})

// logout 
router.get('/logout', (req, res) => {
    userCtrl.logout(req, res)
})

// register page
router.get('/register', forwardAuthenticated, async(req, res) => {
    userCtrl.goToRegister(req, res)
})

// register new acc
router.post('/register', async(req, res) => {
    userCtrl.register(req, res)
})

// edit user's profile page
router.get('/edit', async(req, res) => {
    userCtrl.goToEdit(req, res)
})


module.exports = router