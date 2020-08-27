require('dotenv').config()
const fact = require('../../models/FactRelation/Fact')
const cateFact = require('../../models/FactRelation/Category')
const cateFactCtrl = require('./CateFactCtrl')
const unities = require('../unities')
const fs = require('fs')
const path = require('path')
const directory = './public/upload/fact'

// get All
exports.getAll = async(req, res) => {

    // query category
    var cateName = await req.params.cate

    // find idCateFact
    var search = cateName.charAt(0).toUpperCase() + cateName.slice(1)
    var cate = await cateFactCtrl.getCate(search)

    // pagination
    const listFact = await fact
        .find({ cate: cate._id })

    const count = listFact.length
    const { page = 1, limit = 2 } = req.query

    const currentPage = page
    const numerOfPage = Math.ceil(count / limit)
    const arrayNumberOfPage = []
    for (var i = 1; i <= numerOfPage; i++) {
        arrayNumberOfPage.push(i)
    }
    const lastPage = arrayNumberOfPage[arrayNumberOfPage.length - 1]

    // query list
    const result = await fact
        .find({ cate: cate._id })
        .populate({ path: 'cate', select: 'name' }) // chọn field name để hiển thị
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec((err, docs) => {
            res.render('content/FactContent/facts', {
                list: docs,
                currentPage,
                limit,
                arrayNumberOfPage,
                lastPage,
                cateName
            })
        })
}

// get News
exports.getNews = async(req, res) => {
    // query path
    var cateName = await req.params.cate
        // query id the fact
    var idFact = await req.params.id

    await fact.findById(idFact, (err, docs) => {
        if (err)
            throw err
        else {
            res.render('content/FactContent/news', {
                fact: docs,
            })
        }
    })
}

// insert page
exports.goToInsert = async(req, res) => {
    const listCates = await cateFactCtrl.getListCates(req, res)
    res.render('content/FactContent/facts_insert', {
        viewTitle: 'Create new Fact',
        listCates
    })
}

// insert fact // req, res thuoc multer
exports.insert = async(req, res) => {
    var newFact = new fact()
    newFact.title = req.body.title
    newFact.content = req.body.content
    newFact.cate = req.body.cate
    if (req.file == undefined)
        newFact.img = null
    else
        newFact.img = req.file.filename

    // fill category combobox
    const listCates = await cateFact.find({}).exec()

    await newFact.save((err) => {
        if (err) {
            if (err.name == 'ValidationError') {
                validate(err, req.body)

                res.render('content/FactContent/facts_insert', {
                    viewTitle: 'Create new Fact',
                    listCates,
                    fact: req.body,
                    fail: true
                })
            } else
                throw err
        } else
            res.render('content/FactContent/facts_insert', {
                viewTitle: 'Create new Fact',
                success: true
            })
    })
}

// go to edit page
exports.getModel = async(req, res) => {
    var id = req.params.id

    await fact.findById(id, (err, docs) => {
        if (err)
            throw err
        else {
            res.render('content/FactContent/facts_insert', {
                fact: docs,
                viewTitle: 'Edit Fact',
            })
        }
    })
}

// edit fact
exports.edit = async(req, res) => {
    var editedFact = req.body
    if (req.file != undefined || req.file != null)
        editedFact.img = req.file.filename

    await fact.findOneAndUpdate({ _id: req.body._id }, editedFact, { runValidators: true }, (err, docs) => {

        if (!err) {
            res.render('content/FactContent/facts_insert', {
                viewTitle: 'Edit Fact',
                fact: req.body,
                success: true
            })
        } else {
            if (err.name == 'ValidationError') {
                validate(err, req.body);
                res.render('content/FactContent/facts_insert', {
                    viewTitle: 'Edit Fact',
                    fact: req.body
                })
            } else
                console.log(err)
        }
    })
    clearData(req, res)
}

// delete fact
exports.delete = async(req, res) => {
    var id = req.params.id

    await fact.findByIdAndDelete(id, (err, docs) => {
        if (err)
            throw err
        else
            res.redirect('/fact/')
    })
    clearData(req, res)
}

//----------- Helper -----------//
var validate = (err, body) => {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'title':
                body['titleErr'] = err.errors[field].message
                break
            case 'img':
                body['imgErr'] = err.errors[field].message
                break
            case 'content':
                body['contentErr'] = err.errors[field].message
                break
            default:
                break
        }
    }
}

var clearData = async(req, res) => {
    const allFacts = await fact
        .find({})
        .lean()
        .exec()

    fs.readdir(directory, (err, files) => {
        if (err)
            throw err
        else {
            var imgOfFacts = []
            for (const fact of allFacts) {
                imgOfFacts.push(fact.img)
            }
            var imgOfFiles = []
            for (const file of files) {
                imgOfFiles.push(file)
            }

            var difference = imgOfFiles.filter(x => !imgOfFacts.includes(x))

            // remove deprecated file 
            for (const file of difference) {
                fs.unlink(path.join(directory, file), err => {
                    if (err) throw err
                })
            }
        }
    })
}