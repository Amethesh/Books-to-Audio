//const axios = require('axios');
import axios from "axios";

async function getVoices(apiKey) {
  try {
    const response = await axios.get(`https://api.elevenlabs.io/v1/voices`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function printVoices(apiKey) {
  const voices = await getVoices(apiKey);
  console.log(voices);
}

printVoices("");
