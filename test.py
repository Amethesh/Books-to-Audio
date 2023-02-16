import requests
import json

# Please insert your xi-api-key below
xi_api_key = "1705d1eafb2fdd7eacedfb3b86e2b89d"

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
# with open("00001.txt", "r") as f:
#     text = f.read()
#text = "This is a test for the text-to-speech system by Eleven Labs."

with open("00001.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()
    text = ""
    for line in lines:
        text += line.rstrip('\n')

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
with open("overlord-001.mp3", "wb") as f:
    f.write(response.content)