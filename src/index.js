//! Function and working of index 
//?1: Read the chapter files one by one
//?2: Then it call fileSpilter to spilt the files into 5000 characters and stores it in different files
//TODO 3: Then ForEach spilted files it calls the tts to convert it into mp3
//TODO 4: lastly it calls mp3Merger to merge all the mp3 files 
//TODO 5: Finally each characters it will create a Audio/mp3 file 

import fileSpilt from "./fileSpilter.js";
import fs from "fs"
import { promises as fsPromises } from 'fs';
import path from "path";

const __dirname = path.resolve(); // To resolve error for __dirname in ES6

const fullPath = path.join(__dirname, "Novels", "classroom-of-the-elite")

const ReadFile = async () => {
    
    fs.readdir(fullPath, (error, files) => {
        if (error) console.log(error)

        console.log(`No of files:${files.length}`);

        files.forEach( async file => {
            console.log(`Converting File:${file}`)
            await fileSpilt(file)
            console.log(`Converted File:${file}`)

        })
    })
}

ReadFile()