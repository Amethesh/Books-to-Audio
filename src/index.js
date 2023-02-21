// import fileSpilt from "./fileSpilter.js";
import fs from "fs"
import { promises as fsPromises } from 'fs';
import path from "path";

const __dirname = path.resolve(); // To resolve error for __dirname in ES6

const fullPath = path.join(__dirname, "Novels", "classroom-of-the-elite")

const ReadFile = async () => {
    
    fs.readdir(fullPath, (error, files) => {
        if (error) console.log(error)
        console.log(`No of files:${files.length}`);
        files.forEach( file => console.log(file))
    })
}

ReadFile()