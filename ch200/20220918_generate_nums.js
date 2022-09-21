const gen = () => Math.floor(Math.random() * 10000000);
let i = 0, n = 1000;
for (i = 0; i < n; i++) {
  const num = gen();
  console.log(num.toLocaleString('en-US', { minimumIntegerDigits: 7, useGrouping: false}));
}
