var fs = require('fs');

var answers = {};
var questions = [
    'name',
    'version',
    'description',
    'entry point',
    'author',
    'license',
];

function ask(i) {
    process.stdout.write(questions[i]);
    process.stdout.write(' > ');
}
process.stdin.on('data', function(data) {

    answers[questions[Object.keys(answers).length].name] = data.toString().trim();

    if (Object.keys(answers).length < questions.length) {
        ask(Object.keys(answers).length);
    } else {
        
            var jsonAnswers = JSON.stringify(answers, null, 4);
            fs.writeFileSync('package.json', jsonAnswers);
            process.exit(0);
       
    }
});
process.on('exit', function() {
    // put some code to be executed at exit(), if you want
});
ask(0);
