const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
 
//Define paths for express config
const publicDirPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname , '../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')


//Setpu handle bars and views locaton
app.set('view engine' , 'hbs')
app.set('views' , viewPath)
hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('/about', (req,res) => {
    res.render('about' , {
        title: 'About Me',
        name: 'Labeeb'
    })
})

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather-App',
        name: 'Labeeb'
    })
})

app.get('/help', (req,res) => {
    res.render('help' , {
        helptext:'This is some help text',
        title: 'Help Page',
        name: 'Labeeb'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error:"You must provide an address"
        })
    }

    geocode(req.query.address, (error,{latitude , longitude , location}={}) => {
        if(error){
            return res.send({error})
        }
        forecast (latitude,longitude, (error , forecast) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast : forecast,
                location : location,
                address: req.query.address
            })

        })
    })
})

app.get('/products',(req,res) => {
    if(!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})


app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Labeeb',
        errorMsg:'Help Article Not Found'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Labeeb',
        errorMsg:'Page Does Not Exist'
    })
})



// app.get('/help/*',(req,res) => {
//     res.render('404',{
//         title: '404',
//         name: 'Labeeb',
//         errorMsg:'Page Does Not Exist'
//     })
// })

// app.get('*',(req,res) => {
//     res.render('404',{
//         title: '404',
//         name: 'Labeeb',
//         errorMsg:'Page Does Not Exist'
//     })
// })

app.listen(3000, () => {
    console.log('Server is up on part 3000.')
})