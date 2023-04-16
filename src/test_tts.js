//! Main starting function
import fs from "fs";
import { promises as fsPromises } from 'fs';
import path from "path";
import tts from "./tts.js";
import joinAllMP3FilesInDirectory from "./joinMP3.js";

const chunkSize = 30; // Character limit in this case it is 5000
let fileNum = 1;
let callCount = 0; // Counter for number of tts calls

//! Using Promises
const __dirname = path.resolve(); // To resolve error for __dirname in ES6

const makeFile = async () => { //Function to create or deleted existing split texts
            
    if (!fs.existsSync(path.join(__dirname, "splitText")))
    {
        await fsPromises.mkdir(path.join(__dirname, "splitText"));
        console.log("Created splitText");
    }
    else if(fs.existsSync(path.join(__dirname, "splitText"))){
        await fsPromises.rm(path.join(__dirname, "splitText"),  { recursive: true, force: true });
        makeFile();
        console.log("Removed splitText");
    }
    
}

const fileSplit = async (input_path,output_path,API_KEY,voice_id) =>{
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
                await fsPromises.writeFile(path.join(__dirname, "splitText", `filename_${fileNum}.txt`), chunk);
                
                // Call tts only if the call count is less than 3
                if (callCount < 3) {
                    await tts(fileNum, fileNum, output_path, API_KEY, voice_id);
                    console.log(`TTS Call ${callCount + 1}`);
                    callCount++;
                }
                
                console.log(fileNum)
                //await faketts(fileNum,fileNum);
                fileNum++;
                lastSpaceIndex = i;
            }
        }

        if (lastSpaceIndex !== data.length - 1) {
            const chunk = data.slice(lastSpaceIndex + 1, data.length);
            await fsPromises.writeFile(path.join(__dirname, "splitText", `filename_${fileNum}.txt`), chunk);
            
            // Call tts only if the call count is less than 3
            if (callCount < 3) {
                await tts(fileNum, fileNum, output_path, API_KEY, voice_id);
                console.log(`TTS Call ${callCount + 1}`);
                callCount++;
            }
            
            console.log(fileNum)
            //await faketts(fileNum,fileNum);
            fileNum++;
        }

    } catch (err){
        console.log(err);
    }
}

// Reset call count after 3 tts calls are fulfilled
const resetCallCount = () => {
    callCount = 0;
}

// Call fileSplit function and reset call count
await fileSplit("/Novels/test.txt","/Audio/test.mp3","5b55c001f2b6c48f60f6a8a1f2b1f93c","TV3QEkEEEOv8GwnfAZlP");
resetCallCount();

// Function to join all MP3 files in the directory
// const joinAllMP3 = async () => {
//     await joinAllMP3FilesInDirectory(path.join(__dirname, "splitText"), path.join(__dirname, "output.mp3"));
//     console.log("Joined all MP3 files");
// }

// Call joinAllMP3 function after tts calls are completed
// await joinAllMP3();

