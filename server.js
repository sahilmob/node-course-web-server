const express = require('express')
const hbs = require('hbs')
const fs = require('fs')
const port = process.env.PORT || 3000;
var app = express();
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'))

// app.use((req, res, next) => {
//     res.render('maintinance.hbs')
// })

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} : Method: ${req.method}, Path: ${req.path}, ip: ${req.ip}`
    console.log(log)
    fs.appendFileSync('log.txt', log + '\n', err => {
        if (err) {
            console.log('Unable to append log to server')
        }
    })
    next();
})



// // app.get('/', (req, res) => {
// //     // res.send('<h1>Hello Express</h1>')
// //     res.send({
// //         name: 'Sahil',
// //         likes: [
// //             'Biking',
// //             'Cities'
// //         ]
// //     })
// // });

app.get('/', (req, res) => {
    res.render('index.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hello, this is the Homepage'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',


    })

})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})