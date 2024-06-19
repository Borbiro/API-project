import axios from "axios"
import express from "express"
import bodyParser from "body-parser"
import { startAndEndDate } from './fun.js'

const app = express()
const port = 3000
const API_Link = "https://api.jikan.moe/v4/anime"
const themes = [["Action", 1], ["Adventure", 2], ["Comedy", 4], ["Drama", 8], ["Fantasy", 10], ["Horror", 14], ["Mystery", 7], ["Romance", 22], ["Sci-Fi", 24], ["Slice-of-Life", 36], ["Sports", 30], ["Supernatural", 37]]

var items = {}

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/home', async (req, res) => {
  res.render("index.ejs", {themes: themes})
})

app.post('/get-animes', async (req, res) => {

  if (req.body.next_page) {
    items.page += 1

    const response = await axios.get(`${API_Link}?min_score=${items.min_score}&max_score=${items.max_score}&status=${items.status}&type=${items.type}&order_by=${items.order_by}&sort=${items.sort}&page=${items.page}&start_date=${items.start_date}&end_date=${items.end_date}&genres=${items.theme}`)
    const data = response.data.data
    const totalItems = response.data.pagination.items.total

    res.render("index.ejs", { 
      data: data,
      themes: themes,
      totalItems: totalItems
    })
  } else if (req.body.previous_page) {
    items.page -= 1

    const response = await axios.get(`${API_Link}?min_score=${items.min_score}&max_score=${items.max_score}&status=${items.status}&type=${items.type}&order_by=${items.order_by}&sort=${items.sort}&page=${items.page}&start_date=${items.start_date}&end_date=${items.end_date}&genres=${items.theme}`)
    const data = response.data.data
    const totalItems = response.data.pagination.items.total

    res.render("index.ejs", { 
      data: data,
      themes: themes,
      totalItems: totalItems
    })
  } else {
    items = {}
    var date = startAndEndDate(req.body.year, req.body.season)

    var genres = ""
    if (req.body.theme) {
      genres = req.body.theme
    }
    
    items = {
      min_score: req.body.min_score,
      max_score: req.body.max_score,
      status: req.body.status,
      type: req.body.type,
      theme: genres.toString(),
      start_date: date[0],
      end_date: date[1],
      order_by: req.body.order_by,
      sort: req.body.sort,
      page: 1
    }

    const response = await axios.get(`${API_Link}?min_score=${req.body.min_score}&max_score=${req.body.max_score}&status=${req.body.status}&type=${req.body.type}&order_by=${req.body.order_by}&sort=${req.body.sort}&page=1&start_date=${date[0]}&end_date=${date[1]}&genres=${genres.toString()}`)
    const data = response.data.data
    const totalItems = response.data.pagination.items.total

    res.render("index.ejs", { 
      data: data,
      themes: themes,
      totalItems: totalItems
    })
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})