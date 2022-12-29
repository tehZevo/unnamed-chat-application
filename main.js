const express = require('express')
const app = express()
const port = 3000

//TODO: database
const channels = [
  {id: "foo", messages: []}
]

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// {
//   channel: string,
//   content: string,
//   attachments: [{name, data}, {name, data}, ...] or null,
// }
app.post('/create-message', (req, res) => {
  res.json(req.body);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
