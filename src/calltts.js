import fs from "fs";
import path from "path";
import tts from "./tts.js";
 
//! Using Promises
const __dirname = path.resolve(); 

export const calltts = async (output_path,API_KEY,voice_id) => {

    for( let i = 4 ; i <= 6; i++){

        await tts(i,i,output_path,API_KEY,voice_id)
        
    }
}

calltts("./Audio/Shadow/Chapter2.mp3", "5b55c001f2b6c48f60f6a8a1f2b1f93c", "TV3QEkEEEOv8GwnfAZlP")