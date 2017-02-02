const 	express = require('express'),
		fs = require('fs'),
		pug = require('pug')
		app = express(),
		bodyParser = require('body-parser');

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');


// app.use(bodyParser.json('/users.json')); // support json encoded bodies
app.use(bodyParser.urlencoded({	extended: true })); // support encoded bodies

// Hier zie je de index.pug met alle gebruikers.
app.get('/', (request, response) => {
	fs.readFile('./users.json', 'utf8', (error, data) =>{
		console.log('About to render a pug page');
		if (error){
			throw error;
		}
		console.log('readfile is called');
		const userInfo = JSON.parse(data);
		response.render('index', {people: userInfo});	
	});
});
// Hier zie je de search.pug met een zoek query.
app.get('/search', (request, response) => {
	fs.readFile('./users.json', 'utf8', (error, data) =>{
		console.log('About to render a pug page');
		if (error){
			throw error;
		}
		console.log('readfile is called');
		const userInfo = JSON.parse(data);
		response.render('search', {people: userInfo});	
	});
});

// Hier zie je de add_users.pug met 3 forms.
app.get('/add_users', (request, response) => {
	fs.readFile('./users.json', 'utf8', (error, data) =>{
		console.log('About to render a pug page');
		if (error){
			throw error;
		}
		console.log('readfile is called');
		const userInfo = JSON.parse(data);
		response.render('add_users', {people: userInfo});	
	});
});

// Hier zie je de result.pug met het resultaat van je zoekopdracht.
app.post('/result', function(req, res) {
	console.log('hier doe je een console log')
		fs.readFile('./users.json', 'utf8', (error, data) =>{
		console.log('Ik maak nu een post request');
		if (error){
			throw error;
		}
		console.log('werkt de post request?');
		console.log(req.body.query)
		const userInfo = JSON.parse(data);

		let searchResult = "nothing"
		for (i=0; i< userInfo.length; i++){
			if (userInfo[i].firstname === req.body.query) {
				console.log("Voornaam komt overeen")
				searchResult = userInfo[i]
				res.render('result', {names: searchResult});	

			} else {
				console.log("Voornaam komt niet overeen")
			}
		}

		for (i=0; i< userInfo.length; i++){
			if (userInfo[i].lastname === req.body.query) {
				console.log("Achternaam komt overeen")
				results = userInfo[i]
			}	else {
				console.log("Achternaam komt niet overeen")
			}
		}
	});	
	
});

app.post('/add_users', function(req, res) {
	console.log('Post request add users')
});

app.listen(3000, () => {
	console.log('Server has started.');
});
