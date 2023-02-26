import { exec } from "child_process";
import path from "path";
import fs from "fs";
import joinMP3 from "./mp3Merger.js";

const dir = path.join(__dirname,"Audio","audioSpilt")

function iterationJoin(){
    
    const numFiles = getNumberOfFilesInDirectory(dir);
    console.log(`Number of files in directory: ${numFiles}`);
  
    if (numFiles%2 != 0){
      console.log("There is a odd number of files adding a silent .mp3")
  
      const silent = `ffmpeg -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=44100 -t 5 Audio/audioSpilt/voice-${numFiles+1}.mp3`
      exec(silent, (err, stdout, stderr) => {
        if (err) {
          console.error(`Error creating MP3 file voice-${dir+1}.mp3 - [err]: ${err}`);
          return;
        }  
        console.log(`Successfully created MP3 files. Output file: voice-${numFiles+1}.mp3`);
        singleJoin()
      });
  
    }
    else{
      console.log("even")
      singleJoin()
    }
  
    function singleJoin (){
  
      let count = 1
      for(let i = 1; i<numFiles; i++){
        console.log(`Joining voice-${i} and voice-${++i} copying to chapter-${count}`)
        // joinMP3(i,++i,count)
        count++
      }
    }
      
}

function getNumberOfFilesInDirectory(dirPath) {
    try {
      const files = fs.readdirSync(dirPath);
      return files.length;
    } catch (err) {
      console.error(`Error reading directory: ${err}`);
      return 0;
    }
}
  
  
iterationJoin()