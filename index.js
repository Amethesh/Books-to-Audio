// const axios = require("axios")
// const fs = require('fs');

import axios from "axios";
import fs from "fs";

let file = ""

async function textToSpeech(text, voiceId) {
  try {
    const apiKey = "";
    const response = await axios.post(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, text, {
      headers: {
        "xi-api-key": apiKey
      }
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function convertTextFileToAudio(filePath, voiceId, outputFilePath) {
  try {
    
    const text = fs.readFileSync(filePath, 'utf-8').toString();
    
    const audio = await textToSpeech(text, voiceId);
    fs.writeFileSync(outputFilePath, audio, 'binary');
  } catch (error) {
    console.error(error);
  }
}

convertTextFileToAudio("00001.txt", "21m00Tcm4TlvDq8ikWAM", "output.mp3");
