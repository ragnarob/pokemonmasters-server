var mongoose = require('mongoose')

let url = 'mongodb+srv://progg:pokemon1@pokemoncluster-frbac.mongodb.net/test'
mongoose.connect(url, { useNewUrlParser: true })

let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', () => {
	console.log('connected')
})


