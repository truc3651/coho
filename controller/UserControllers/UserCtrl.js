const user = require('../../models/UserRelation/User')
var bcrypt = require('bcryptjs')
const passport = require('passport')
const { forwardAuthenticated } = require('../../config/auth')

// get All
exports.getAll = async(req, res) => {
    await user.find({})
        .exec((err, docs) => {
            console.log(docs);
            res.render('content/UserContent/userManager', { list: docs })
        })
}

// go to login page
exports.goToLogin = (req, res) => {
    res.render('content/UserContent/login', {
        viewTitle: 'Login'
    })
}

// login acc
exports.login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/user/login',
        failureFlash: true
    })(req, res, next)
}

// logout
exports.logout = (req, res) => {
    req.logout()
    req.flash('success_msg', 'You are logged out')
    res.redirect('/user/login')
}

// go to register page
exports.goToRegister = (req, res) => {
    res.render('content/UserContent/registerOrEdit', {
        viewTitle: 'Register new Account'
    })
}

// register acc
exports.register = async(req, res) => {
    var { name, username, password, confirm, gender } = req.body

    let errors = []

    if (!name || !username || !password || !confirm)
        errors.push({ msg: 'Please enter all fields' })
    if (password != confirm)
        errors.push({ msg: 'Password do not match' })

    if (errors.length > 0) {
        res.render('content/UserContent/registerOrEdit', {
            viewTitle: 'Register new Account',
            errors,
            user: req.body
        })
    } else {
        const findUser = await user.findOne({ username })
        if (findUser) {
            errors.push({ msg: 'This username is aldready existed' })
            res.render('content/UserContent/registerOrEdit', {
                viewTitle: 'Register new Account',
                errors,
                user: req.body
            })
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = new user({
                name,
                username,
                password: hashedPassword,
                gender,
                age: 0,
                height: 0,
                weight: 0
            })
            await newUser.save((err) => {
                if (!err) {
                    req.flash('success_msg', 'You are now registered and can log in')
                    res.redirect('/user/login')
                }
            })
        }
    }
}

// go to edit page
exports.goToEdit = (req, res) => {
    res.render('content/UserContent/registerOrEdit', {
        viewTitle: 'Edit account'
    })
}

// edit acc
exports.edit = (req, res) => {

}


//----------- Helper -----------//
var validate = (err, body) => {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'username':
                body['usernameErr'] = err.errors[field].message
                break
            case 'password':
                body['passwordErr'] = err.errors[field].message
                break
            case 'name':
                body['nameErr'] = err.errors[field].message
                break
            default:
                break
        }
    }
}