import fs from "fs";
import { promises as fsPromises } from 'fs';
import path from "path";

const chunkSize = 5000; // Character limit in this case it is 5000
let fileNum = 1;

//! Using Promises
const __dirname = path.resolve(); // To resolve error for __dirname in ES6

if (fs.existsSync(path.join(__dirname, "Novels", "classroom-of-the-elite"))){}

const fileSpilt = async (txt) =>{
    try{
        const data = await fsPromises.readFile(path.join(__dirname, "Novels", "classroom-of-the-elite", txt ), "utf-8");
        for (let i = 0; i < data.length; i += chunkSize){
            const chunk = data.slice(i, i + chunkSize)

            await fsPromises.writeFile(path.join(__dirname, "spiltText", `filename_${fileNum}.txt`), chunk);
            fileNum++;
        }
    } catch (err){
        console.log(err);
    }
}

fileSpilt("00002.txt")