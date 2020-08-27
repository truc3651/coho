require('dotenv').config()
const cateFact = require('../../models/FactRelation/Category')

// get all
exports.getAll = async(req, res) => {
    const listCates = await this.getListCates(req, res)
    res.render('content/FactContent/cates', { list: listCates })
}

// get listCates
exports.getListCates = async(req, res) => {
    return await cateFact.find({}).exec()
}

// find cate based on name
exports.getCate = (search) => {
    return cateFact
        .findOne({ name: search })
        .exec()
}

// go to insert page
exports.goToInsert = (req, res) => {
    res.render('content/FactContent/cates_insert')
}

// insert cate
exports.insert = async(req, res) => {
    var newCate = new cateFact()
    newCate.name = req.body.name

    await newCate.save((err) => {
        if (err) {
            if (err.name == 'ValidationError') {
                validate(err, req.body)
                res.render('content/FactContent/cates_insert', {
                    viewTitle: 'Create new Category',
                    catefact: req.body
                })
            } else
                throw err
        } else
            res.redirect('/catefact/')
    })
}

// go to edit page
exports.getModel = async(req, res) => {
    var id = req.params.id

    await cateFact.findById(id, (err, docs) => {
        if (err)
            throw err
        else {
            res.render('content/FactContent/cates_insert', {
                catefact: docs,
                viewTitle: 'Edit Catergory'
            })
        }
    })
}

// edit cate
exports.edit = async(req, res) => {
    var editedCateFact = req.body

    await cateFact.findOneAndUpdate({ _id: req.body._id },
        editedCateFact, (err, docs) => {
            if (!err)
                res.redirect('/catefact/')
            else {
                if (err.name == 'ValidationError') {
                    validate(err, req.body);
                    res.render('content/FactContent/cates_insert', {
                        viewTitle: 'Edit Category',
                        catefact: req.body
                    })
                } else
                    throw err
            }
        })
}

// delete fact
exports.delete = async(req, res) => {
    var id = req.params.id

    await cateFact.findByIdAndDelete(id, (err, docs) => {
        if (err)
            throw err
        else
            res.redirect('/catefact/')
    })
}



//----------- Helper -----------//
var validate = (err, body) => {
    for (field in err.errors) {
        switch (field) {
            case 'name':
                body['nameErr'] = err.errors[field].message
                break
            default:
                break
        }
    }
}