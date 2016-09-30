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
    // To prevent adding to answers object when asking "Is this ok? (yes / no):"
    if (Object.keys(answers).length < questions.length) {
        answers[questions[Object.keys(answers).length].name] = data.toString().trim();
    }
    if (Object.keys(answers).length < questions.length) {
        ask(Object.keys(answers).length);
    } else {
        if (data.toString().trim() !== 'yes' && data.toString().trim() !== 'no') {
            var jsonAnswers = JSON.stringify(answers, null, 4);
            process.stdout.write('\n\n');
            process.stdout.write('About to write to ' + folder + '/package.json:\n\n');
            process.stdout.write(jsonAnswers)
            process.stdout.write('\n\n');
            process.stdout.write('Is this ok? (yes / no): ')
        } else if (data.toString().trim() === 'yes') {
            var jsonAnswers = JSON.stringify(answers, null, 4);
            fs.writeFileSync('package.json', jsonAnswers);
            process.exit(0);
        } else {
            process.stdout.write('\n\n');
            process.stdout.write('Aborted!\n\n');
            process.exit(0);
        }
    }
});
process.on('exit', function() {
    // put some code to be executed at exit(), if you want
});
ask(0);
