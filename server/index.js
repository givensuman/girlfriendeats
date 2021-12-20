const express = require('express')
const path = require('path')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express().use(cors()).use(express.json())

app.use(express.static(path.resolve(__dirname, '../client/build')));

const API_KEY = process.env.API_KEY
const API_ROUTE = 'https://api.yelp.com/v3/businesses/search'

app.post('/api', async (req, res) => {
    
    let { zip, cat, price, dist } = req.body
    dist = dist * 1600 // converts miles to meters

    const data = await axios(
        API_ROUTE,
        {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            },
            params: {
                term: cat,
                location: zip,
                price: price,
                radius: dist
            }
        }
    )
    res.send(data.data)
})


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

const PORT = process.env.PORT || 1337
app.listen(PORT, console.log(`Server running on port ${PORT} 🚀`))