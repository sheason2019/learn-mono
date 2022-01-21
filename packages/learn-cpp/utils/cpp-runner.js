const child = require('child_process');

let build = false;

let fileName = process.argv[process.argv.length - 1];

process.argv.forEach(arg => {
  if (arg === '--build') {
    build = true;
  }
})

const info = /^([\w-]+)\.cpp$/.exec(fileName);
if (info) {
  fileName = info[1];
}

if (build) {
  child.exec(`g++ src/${fileName}.cpp -o dist/${fileName}.out`, (err, sto) => {
    err && console.log(err);
  });
}

child.exec(`./dist/${fileName}.out`, (err, sto) => {
  if (!err) {
    process.stdout.write(sto);
  } else {
    console.log(err);
  }
});
