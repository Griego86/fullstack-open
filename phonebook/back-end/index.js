const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

morgan.token('body', (req, res) => {return JSON.stringify(req.body)})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  const timestamp = new Date().toString()
  const message = `Phonebook has info for ${persons.length} people.`

  res.send(`<p>${message}</p><p>${timestamp}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find( p => p.id === id)
  
  person ? res.json(person) : res.status(404).end()
})

app.post('/api/persons', (req, res) => {
  const name = req.body.name
  const number = req.body.number

  if (name === undefined || number === undefined) {
    return res.status(400).json({error: 'content missing'})
  } else if (persons.find( p => p.name === name)) {
    return res.status(400).json({error: 'name must be unique'})
  }

  const id = Math.floor(Math.random() * 1000)

  const newPerson = {
    name,
    number,
    id
  }

  persons = persons.concat(newPerson)

  res.json(persons)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)

  res.status(204).end()
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})