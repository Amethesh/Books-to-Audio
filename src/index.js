//! Index.js is Work In Progress---WIP 
//! Function and working of index 
//?1: Read the chapter files one by one
//?2: Then it call fileSpilter to spilt the files into 5000 characters and stores it in different files
//?3: Then ForEach spilted files it calls the tts to convert it into mp3
//4: lastly it calls mp3Merger to merge all the mp3 files 
//5: Finally each charapter it will have a Audio/mp3 file 

import fs from "fs"
import { promises as fsPromises } from 'fs';
import path from "path";
import fileSpilt from "./fileSpilter.js";
import joinAllMP3FilesInDirectory from "./joinMP3.js";
import apiStatus from "./apiStatus.js";

const __dirname = path.resolve(); // To resolve error for __dirname in ES6

const fullPath = path.join(__dirname, "Novels")
const directoryPath = path.join(__dirname, "spiltText");
const directoryPath1 = path.join(__dirname, "Audio", "audioSpilt");

const ReadFile = async () => {
    try {
        const files = await fsPromises.readdir(fullPath);
        console.log(`No of files:${files.length}`);
        const file = "Who-Moved-My-Cheese1.txt"
        //let chapterCount = 1;
        // for (const file of files) {
            console.log(`Converting File:${file}......`)
            await fileSpilt(file);
            console.log(`Converted File:${file}. Now joining mp3 files`) 

            let VoiceCount
            
            console.log("After await fileSpilt call")
            fs.readdir(directoryPath, function (err, files) {
                VoiceCount = files.length
                console.log(VoiceCount)
                console.log("Inside fs1")
            })
 
            //!const audioCount = apiStatus(); //Calling it might change the count value
            // console.log(`No of converted audio: ${audioCount}`)
            // let audioCount = 0
            // while(audioCount == VoiceCount){
            //     console.log("Inside while")
            //     fs.readdir(directoryPath1, function (err, files) {
            //         audioCount = files.length                  
            //     });
            // }
            // if(audioCount == VoiceCount)    {
            //     console.log(`Number of files in directory: ${files.length}`);
            //     joinAllMP3FilesInDirectory(chapterCount)
            //     console.log(`Sucessfully created chapter-${chapterCount}.mp3`)
            // }       
            // //chapterCount++;

        // }
    } catch (error) {
        console.log(error);
    }
}

ReadFile();