const commands = require('./commands');

const done = function(output) { 
    process.stdout.write(output);
    process.stdout.write("\nprompt > ");
}

// Output un prompt
process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
    var arg = data.toString().trim().split(' ');// remueve la nueva línea
    var cmd = arg.shift(); 
    if(commands.hasOwnProperty(cmd)) {
        commands[cmd](arg, done);
    } else{
        process.stdout.write('command not found');
    }
});
