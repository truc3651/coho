const multer = require('multer')
const path = require('path')

//----------- Pagination -----------//
// exports.pagination = (req, res, docs) => {
//     var currentPage = parseInt(req.query.page) || 1
//     var perpage = 2
//     var start = (currentPage - 1) * perpage
//     var end = currentPage * perpage

//     var maxPage = Math.ceil(docs.length / perpage)
//     var numberOfPage = 3

//     var count = 0
//     var digits = []

//     if (currentPage == maxPage - 1 || currentPage == maxPage) {
//         for (var i = maxPage - 2; i <= maxPage; i++) {
//             digits.push(i)
//         }

//     } else {
//         for (var i = currentPage; i <= maxPage; i++) {
//             if (count == numberOfPage)
//                 break
//             digits.push(i)
//             count++
//         }
//     }

//     return ({ list: docs.slice(start, end), digits, currentPage })
// }

//----------- Upload files -----------//
const storage = multer.diskStorage({
    destination: './public/upload/fact/',
    filename: function(req, file, cb) {
        if (file != null)
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

exports.upload = multer({
    storage: storage,
    limits: { fileSize: 100000 },
    fileFilter: (req, file, cb, ) => {
        checkFileType(file, cb)
    }
}).single('img')

var checkFileType = (file, cb) => {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    }
}




//----------- Helper -----------//
var Handlebars = require('handlebars');

Handlebars.registerHelper("inc", function(value, options) {
    return parseInt(value) + 1;
});

Handlebars.registerHelper("dec", function(value, options) {
    return parseInt(value) - 1;
});

Handlebars.registerHelper("ifvalue", function(conditional, options) {
    if (conditional == options.hash.equals) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper('ifequal', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
})

Handlebars.registerHelper('ifstring', function(arg1, arg2, options) {
    var arg1 = arg1.toString()
    var arg2 = arg2.toString()
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
})

Handlebars.registerHelper("lower", function(value, options) {
    return value.toLowerCase()
})

Handlebars.registerHelper("cap", function(value, options) {
    return value.charAt(0).toUpperCase() + value.slice(1)
})