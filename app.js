const 	express = require('express'),
		fs = require('fs'),
		pug = require('pug')
		app = express(),
		bodyParser = require('body-parser');

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');


// app.use(bodyParser.json('/users.json')); // support json encoded bodies
app.use(bodyParser.urlencoded({	extended: true })); // support encoded bodies
app.use(express.static('static'))

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

// document.getElementById('name').addEventListener('change', function() {
//     console.log(this.getAttribute('value'));
// });

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
		for (var i=0; i< userInfo.length; i++){
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

app.post('/add_users', (request, response) => {
	if(!request.body['firstname'] || !request.body['lastname'] || !request.body['email']){ // if one of the fields is empty
		response.render('add_users', {fieldEmptyError: true, errorMessage: 'Try again. Please fill out all fields to add a user.'}) // stay on add-user, pass error to add-user so it can give the passed error message to fill out all fields to add a user
		} else {
			fs.readFile(__dirname + '/users.json', (err, data) => { // if all fields are filled out
				if (err) throw err;

			let parsedData = JSON.parse(data); // parse json file into js object
			parsedData.push(request.body); // push new user object to parsedData
			let json = JSON.stringify(parsedData); // make a json file of parsedData (with added user)
			//test: console.log(json);

			fs.writeFile(__dirname + '/users.json', json, 'utf8', (mistake) => { //write file with parsedData (with added user)
				if (mistake) throw mistake;
			})
			response.redirect('/')

			//changed render into redirect, so we only render all-users in app.get(all-users), so we don't keep on adding the same
			// user when we reload after adding
		// 	response.redirect('/all-users');
		})
	}
});

app.post('/handlesearchinput', (request, response)=>{
		// console.log('/handlesearchinput is called')
		// console.log(request.body)
	fs.readFile('./users.json', 'utf8', (error, data) =>{
		// console.log('Ik maak nu een post request');
		if (error){
			throw error;
		}
		// console.log('werkt de post request?');
		// console.log(request.body)
		const userInfo = JSON.parse(data);
		// console.log(userInfo)
		
		let searchResult = []

		for (var i=0; i< userInfo.length; i++){
			if (userInfo[i].firstname.indexOf(request.body.userInput) > -1) {
				console.log("Voornaam komt overeen")
				console.log(request.body.userInput)
				console.log(userInfo[i].firstname)
				searchResult.push(userInfo[i])
				console.log("We zoeken de index van ")
				console.log(userInfo[i].firstname.indexOf(request.body.userInput))
			} else {
				console.log("Voornaam komt niet overeen")
			}
		}
		response.send({names: searchResult});


	})
})


app.get('/add_users', (request, response) => {
	console.log ("User has been added. Thank you!")
});

app.listen(3000, () => {
	console.log('Server has started.');
});
