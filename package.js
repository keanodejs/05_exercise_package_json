var fs = require('fs');
var folder = process.cwd();
var answers = {};
var questions = [{
    name: 'name',
    disp: 'Application Name: ' // get the folder name as default
}, {
    name: 'version',
    disp: 'Version: (1.0.0)'
}, {
    name: 'description',
    disp: 'Description: '
}, {
    name: 'entry point',
    disp: 'Entry Point: ' // take the first .js file in directory or index.js
}, {
    name: 'author',
    disp: 'Author: ' // Get computers user as default
}, {
    name: 'license',
    disp: 'License: (ISC)'
}];

function ask(i) {
    if (i === 0) {
        process.stdout.write('\n\n');
        process.stdout.write('This utility will walk you through creating ');
        process.stdout.write('a package.json file. ')
        process.stdout.write('It only covers the most common items, and tries to guess sensible defaults.')
        process.stdout.write('\n\n');
    }
    process.stdout.write(questions[i].disp);
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
