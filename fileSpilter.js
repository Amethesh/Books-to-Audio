import fs from "fs"

const chunkSize = 5000;
let fileNum = 1;

fs.readFile('Novels/classroom-of-the-elite/00002.txt', 'utf8', (err, data) => {
  if (err) throw err;
  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize);
    fs.writeFile(`filename_${fileNum}.txt`, chunk, (err) => {
      if (err) throw err;
    });
    fileNum++;
  }
});
