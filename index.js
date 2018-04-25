const { mountains } = require('./alpes.json');

let total = 0;
let mountainsCount = 0;
mountains.forEach(({ height }) => {
    const properHeight = Number(height);

    if (isNaN(properHeight)) {
        return;
    }

    mountainsCount++;
    total += properHeight;
});

if (mountainsCount === 0) {
    console.log('No data!');
} else {
    console.log(Math.round(total / mountainsCount));
}
