import https from "https"
import fs from "fs"
import * as dotenv from 'dotenv'
import path from "path"

dotenv.config()
const __dirname = path.resolve(); // To resolve error for __dirname in ES6

// Please insert your xi-api-key below
const xiApiKey = process.env.API_KEY
const voiceId = "V9hVOl0xjZYL2dpUEGUT";

// Fetch your voices
const tts = (textLoc, voiceLoc) => {
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
            //const voices = JSON.parse(data).voices;
            //const firstVoice = voices[5];
            // Convert text into speech using the ID of the voice
            const text = fs.readFileSync(path.join(__dirname, "spiltText", `filename_${textLoc}.txt` ), 'utf8');
            //const text = 'This is a test for the text-to-speech system by Eleven Labs.';
            
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
            req.write(JSON.stringify({ text }));
            req.end();
        });
    }
);
}


//tts("spiltText/filename_11.txt","chapter3.mp3")
//spiltText\filename_11.txt
export default tts