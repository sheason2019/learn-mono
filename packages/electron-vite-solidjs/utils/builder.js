const child = require('child_process');
const fs = require('fs');

child.exec('npx vite build', (sto, err) => {
  sto && process.stdout.write(sto);
  err && process.stdout.write(err);
  copyFile();
});

function copyFile() {
  fs.writeFileSync('./dist/main.js', fs.readFileSync('./main.js'));
  fs.writeFileSync('./dist/package.json', fs.readFileSync('./package.json'));

  child.exec('npx electron-packager ./dist --out=./build', (sto, err) => {
    sto && console.log(sto);
    err && console.error(err);
  });
}