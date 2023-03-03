import https from "https"
import fs from "fs"
import * as dotenv from 'dotenv'
import path from "path"
import apiStatus from "../src/apiStatus.js"

dotenv.config()
const __dirname = path.resolve(); // To resolve error for __dirname in ES6

// Please insert your xi-api-key below
const xiApiKey = process.env.API_KEY
const voiceId = "21m00Tcm4TlvDq8ikWAM";

// const apiStatus = () => {
//   console.log("API call successful");
// }

const tts = async (textLoc, voiceLoc) => {
  https.get(
    {
      hostname: 'api.elevenlabs.io',
      path: '/v1/voices',
      headers: {
        'xi-api-key': xiApiKey
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
            path: `/v1/text-to-speech/${voiceId}`,
            method: 'POST',
            headers: {
              'xi-api-key': xiApiKey,
              'Content-Type': 'application/json'
            }
          },
          response => {
            const audioStream = fs.createWriteStream(path.join(__dirname, "Audio", "audioSpilt", `voice-${voiceLoc}.mp3` ));
            response.pipe(audioStream);
          }
        );

        req.on('response', res => {
          if (res.statusCode === 200) {
            apiStatus();
          }
        });

        req.write(JSON.stringify({ text }));
        req.end();
      });
    }
  );
}

// Call the tts function with appropriate parameters
tts(1,1)
