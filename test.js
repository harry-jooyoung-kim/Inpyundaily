
var {PythonShell} = require('python-shell');

var options = {
  mode: 'text',
  encoding: 'utf8',
  pythonOptions: ['-u'],
  scriptPath: '',
  args: [1,20200508],
  pythonPath: ''
};

PythonShell.run('crawl.py', options, function (err, results) { 
    if (err) throw err; 
    let data = results; 
    console.log(data)
});

