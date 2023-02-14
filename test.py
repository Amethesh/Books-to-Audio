import requests
import json

# Please insert your xi-api-key below
xi_api_key = ""

# Fetch your voices
response = requests.get(
    "https://api.elevenlabs.io/v1/voices",
    headers={
        "xi-api-key": xi_api_key
    }
)
voices = json.loads(response.text)["voices"]
first_voice = voices[5]

# Convert text into speech using the ID of the voice
with open("00001.txt", "r") as f:
    text = f.read()
#text = "This is a test for the text-to-speech system by Eleven Labs."

response = requests.post(
    f"https://api.elevenlabs.io/v1/text-to-speech/{first_voice['voice_id']}",
    json = {
        "text": text
    },
    headers={
        "xi-api-key": xi_api_key
    }
)

# Write the audio to disk, response.content contains it as bytes
with open("audio_male.mp3", "wb") as f:
    f.write(response.content)