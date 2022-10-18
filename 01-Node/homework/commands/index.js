let fs = require('fs');
let request = require('request');

module.exports = {
    pwd: function(arg, done) {done(process.cwd())},
    date: function(arg, done) {done(Date())},
    ls: function(arg, done){
        fs.readdir('.', function(err, files) {
            output = '';
            if (err) throw err;
            files.forEach(function(file) {
                //process.stdout.write(file.toString() + "\n");
                output = output + file + "\n";
            })
                //process.stdout.write("prompt > ");
                done(output);
            });
        },
    echo: function(arg, done){
        done(arg.join(' '));
        },
    cat: function(file, done){
        fs.readFile(file[0],'utf8', function(err, data){
            if(err)throw err;
            // process.stdout.write(data);
            // process.stdout.write("prompt > ");
            done(data);
        })
        },
    head: function(file, done){
        fs.readFile(file[0],'utf8', function(err, data){
            if(err)throw err;
            var lines = data.split('\n').slice(0,9).join('\n');
            // process.stdout.write(lines);
            // process.stdout.write("prompt > ");
            done(lines);
        })
        },
    tail: function(file, done){
        fs.readFile(file[0],'utf8', function(err, data){
            if(err)throw err;
            var lines = data.split('\n').slice(-10).join('\n');
            // process.stdout.write(lines);
            // process.stdout.write("prompt > ");
            done(lines);
            }
        )},
    curl: function(url, done){
            request(url[0],function(err, response, body){
                if(err)throw err;
                // process.stdout.write(body);
                // process.stdout.write("prompt > ");
                done(body);
            })
        }
}