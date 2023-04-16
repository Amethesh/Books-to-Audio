import https from "https"
import fs from "fs"
import * as dotenv from 'dotenv'
import path from "path"
import apiStatus from "../src/apiStatus.js"
import joinAllMP3FilesInDirectory from "../src/joinMP3.js"
import fileCounter from "./fileCounter.js"

dotenv.config()
const __dirname = path.resolve(); // To resolve error for __dirname in ES6

// Please insert your xi-api-key below
const xiApiKey = process.env.API_KEY
const voiceId = "ErXwobaYiN019PkySvjV";

let voiceCount = 0
// let fileCount = 0

const tts = async (textLoc, voiceLoc,output_path,API_KEY,voice_id) => {
  https.get(
    {
      hostname: 'api.elevenlabs.io',
      path: '/v1/voices',
      headers: {
        'xi-api-key': API_KEY
      }
    },
    response => {
      let data = '';
      response.on('data', chunk => {
        data += chunk;
      });
      response.on('end', () => {
        const text = fs.readFileSync(path.join(__dirname, "spiltText", `filename_${textLoc}.txt` ), 'utf8');

        const req = https.request(
          {
            hostname: 'api.elevenlabs.io',
            path: `/v1/text-to-speech/${voice_id}`,
            method: 'POST',
            headers: {
              'xi-api-key': API_KEY,
              'Content-Type': 'application/json'
            }
          },
          response => {
            const audioStream = fs.createWriteStream(path.join(__dirname, "Audio", "audioSpilt", `voice-${voiceLoc}.mp3` ));
            response.pipe(audioStream);
          }
        );

        req.on('response', async res => {
          if (res.statusCode === 200) {
            voiceCount = apiStatus();
            const fileCount = await fileCounter();
            console.log(`fileCount = ${fileCount}, voiceCount = ${voiceCount}`);
            console.log(`API called for ${voiceCount} times...`);
            
            if (fileCount == voiceCount){
              joinAllMP3FilesInDirectory(output_path)
              console.log(`Called joinAllMP3FilesInDirectory()`);
            }
          }
        });

        req.write(JSON.stringify({ text }));
        req.end();
      });
    }
  );
}

// await tts(1,1,"5b55c001f2b6c48f60f6a8a1f2b1f93c","TxGEqnHWrfWFTfGW9XjX")


// Call the tts function with appropriate parameters
// tts(1,1)
export default tts