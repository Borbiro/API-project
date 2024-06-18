import express from "express"

const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', async (req, res) => {
  res.render("index.ejs")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})