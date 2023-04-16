//! Main starting function
import fs from "fs";
import { promises as fsPromises } from 'fs';
import path from "path";
import tts from "./tts.js";
import joinAllMP3FilesInDirectory from "./joinMP3.js";

const chunkSize = 30; // Character limit in this case it is 5000
let fileNum = 1;
 
//! Using Promises
const __dirname = path.resolve(); // To resolve error for __dirname in ES6

const makeFile = async () => { //Function to create or deleted existing spilt texts
            
    if (!fs.existsSync(path.join(__dirname, "spiltText")))
    {
        await fsPromises.mkdir(path.join(__dirname, "spiltText"));
        console.log("Created spiltText")
    }
    else if(fs.existsSync(path.join(__dirname, "spiltText"))){
        await fsPromises.rm(path.join(__dirname, "spiltText"),  { recursive: true, force: true });
        makeFile();
        console.log("Removed spiltText")
    }
    
}

const fileSpilt = async (input_path,output_path,API_KEY,voice_id) =>{
    try{
        const data = await fsPromises.readFile(input_path, "utf-8");
        await makeFile();      

        let lastSpaceIndex = -1;
        for (let i = 0; i < data.length; i++) {
            //To cut the file only if its ends with \n and has less than 5000 characters
            if (i - lastSpaceIndex > chunkSize && (data[i] === ' ' || data[i] === '.' || data[i] === '\n')) {
                // console.log(`i value: ${i}  ---  lastSpaceIndex value: ${lastSpaceIndex}`)
                const chunk = data.slice(lastSpaceIndex + 1, i);
                // console.log(chunk.length)
                await fsPromises.writeFile(path.join(__dirname, "spiltText", `filename_${fileNum}.txt`), chunk);
                // await tts(fileNum,fileNum,output_path,API_KEY,voice_id)
                console.log(fileNum)
                //await faketts(fileNum,fileNum);
                fileNum++;
                lastSpaceIndex = i;
            }
        }

        if (lastSpaceIndex !== data.length - 1) {
            const chunk = data.slice(lastSpaceIndex + 1, data.length);
            await fsPromises.writeFile(path.join(__dirname, "spiltText", `filename_${fileNum}.txt`), chunk);
            console.log("Calling tts")
            await tts(fileNum,fileNum,output_path,API_KEY,voice_id)
            console.log(fileNum)
            //await faketts(fileNum,fileNum);
            fileNum++;
        }

    } catch (err){
        console.log(err);
    }
}


// await fileSpilt("/Novels/Mushoku_tensei/Prologue.txt","/Audio/Mushoku_tensei/Prologue.mp3","5b55c001f2b6c48f60f6a8a1f2b1f93c","ErXwobaYiN019PkySvjV")
// await joinAllMP3FilesInDirectory(1) 

export default fileSpilt