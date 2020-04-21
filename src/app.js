const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode copy')
const forecast = require('./utils/forcast')
console.log(__dirname)
console.log(__filename)
console.log(path.join(__dirname,'../public'))
const publicDirectoryPath = path.join(__dirname,'../public')
const  viewPath = path.join(__dirname,'../templates/views')
const parialPath = path.join(__dirname,'../templates/partials')
const app = express()
/*port variable to run the application in heroku servers */
/*env is variable to access the environment variable*/
/* PORT is the access of environment variable */
const port = process.env.PORT || 3000
 


//define paths for Express config 
//express.static is a function , takes the path to the folder  we want serve up 
//This express.static to impact with style of html :D 

//Setup handlrbars engine and views locations
app.set('view engine' ,'hbs')

app.set('views',viewPath)
//hbs.registerPartial(parialPath)
hbs.registerPartials(parialPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('',(req,res)=>{
    //render allows us to render one of our views  
    res.render('index',{
        title:'Weather App',
        name:'Eman Saeed'
    })
})
app.get('/about',(req,res) =>{
    res.render('about',{
        title:'About Me',
        name :'Eman Saeed'
    })
})
app.get('/products',(req,res)=>{
    //req.query is showing the response of the server :D
    if(!req.query.search){
       return res.send({
            error:'You must provide a seach term',

        })
    }
    
        console.log(req.query.search)
        res.send({
            products:[]
        })
    }
  
)
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

       // forecast(latitude, longitude, (error, forecastData) => {
           // if (error) {
           //     return res.send({ error })
          //  }

            res.send({
               // forecast: forecastData,
                location:location,
                latitude:latitude,
                longitude:longitude,
                address: req.query.address
           // })
        })
    })
})

  //  res.send({
   //     forcast:'it is snowing',
   //     location:'Philadelphia',
   //     address: req.query.address
   // })


app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some helpfil text. ',
        title: 'Help ',
        name:'Eman Saeed'
        
    })
})



app.get('/help/*',(req,res)=>{
    res.render('PageeError',{
        errornumber:'404',
        helpText: 'Help article not found .',
        title: 'Error 404',
        name:'Eman Saeed'
        
    })
})
app.get('*',(req,res) =>{
    res.render('PageNotFound',{
        helpText:'ERROR 404',
        errornumber:'404',
        name:'Eman Saeed'
    })


})


//we can sending a html or json  
//app.get('/wheathr',(req,res)=>{
   // res.send('<h1>WEATHER</h1>')

//})
/*
app.get('/help',(req,res)=>{
    res.send([{
        name:'Eman'},

        {
    }])
})
app.get('/about',(req,res)=>{
    res.send('About Page')
})
app.get('/weather',(req,res)=>{
    res.send(' Your Weather Page')
})
//The below / is called route 

//3000 is port number that express will use 
*/
/*the port 3000 is used when we start our application in our machine */ 
app.listen(port,()=>{
    console.log('Server is up on port '+port)
})     
