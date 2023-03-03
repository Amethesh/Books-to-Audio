import path from "path";
import fs from "fs"

const __dirname = path.resolve(); // To resolve error for __dirname in ES6

const directoryPath = path.join(__dirname, "spiltText");
//const directoryPath1 = path.join(__dirname, "Audio", "audioSpilt");
// let count = 0

export default async function fileCounter() {
    return new Promise((resolve, reject) => {
      fs.readdir(directoryPath, function (err, files) {
        if (err) {
          reject(err);
        } else {
          const count = files.length;
          console.log(`Inside fileCount: ${count}`);
          resolve(count);
        }
      });
    });
  }