const child = require('child_process');

child.exec('npm run dev:vite', (sto, err) => {
  sto && process.stdout.write(sto);
  err && process.stdout.write(err);
});

child.exec('npm run dev:electron', (sto, err) => {
  sto && process.stdout.write(sto);
  err && process.stdout.write(err);
});
