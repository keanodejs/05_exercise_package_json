var fs = require('fs');

var questions = [
    'name',
    'version',
    'description'
];

var answers = {}

function ask(i) {

    process.stdout.write(questions[i]);
    process.stdout.write(' > ');
}

process.stdin.on('data', function(data) {

    answers[questions[Object.keys(answers).length]] = data.toString().trim();

    if (Object.keys(answers).length < questions.length) {
        ask(Object.keys(answers).length);
    } else { 

    	process.exit();   	
    }
});

process.on('exit', function(){

	var jsonAnswers = JSON.stringify(answers, null, 4);
	
	// Blocking code
    fs.writeFileSync('package.json', jsonAnswers);
 
	console.log(jsonAnswers);
	process.stdout.write('Goodbuy!!');
});




ask(0);


















