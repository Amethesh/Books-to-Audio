import fs from "fs";
import { promises as fsPromises } from 'fs';
import path from "path";
import tts from "./tts.js";
import faketts from "./faketts.js"; 

const chunkSize = 5000; // Character limit in this case it is 5000
let fileNum = 1;
 
//! Using Promises
const __dirname = path.resolve(); // To resolve error for __dirname in ES6

const makeFile = async () => { //Function to create or delete existing spilt texts
            
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

const fileSpilt = async (txt) =>{
    try{
        const data = await fsPromises.readFile(path.join(__dirname, "Novels", "classroom-of-the-elite", txt ), "utf-8");
        await makeFile();      

        let lastSpaceIndex = -1;
        for (let i = 0; i < data.length; i++) {
            //To cut the file only if its ends with \n and has less than 5000 characters
            if (i - lastSpaceIndex > chunkSize && (data[i] === ' ' || data[i] === '.' || data[i] === '\n')) {
                console.log(`i value: ${i}  ---  lastSpaceIndex value: ${lastSpaceIndex}`)
                const chunk = data.slice(lastSpaceIndex + 1, i);
                console.log(chunk.length)
                await fsPromises.writeFile(path.join(__dirname, "spiltText", `filename_${fileNum}.txt`), chunk);
                await tts(fileNum,fileNum)
                console.log(fileNum)
                //await faketts(fileNum,fileNum);
                fileNum++;
                lastSpaceIndex = i;
            }
        }

        if (lastSpaceIndex !== data.length - 1) {
            const chunk = data.slice(lastSpaceIndex + 1, data.length);
            await fsPromises.writeFile(path.join(__dirname, "spiltText", `filename_${fileNum}.txt`), chunk);
            await tts(fileNum,fileNum)
            console.log(fileNum)
            //await faketts(fileNum,fileNum);
            fileNum++;
        }

    } catch (err){
        console.log(err);
    }
}

fileSpilt("00003.txt")

export default fileSpilt