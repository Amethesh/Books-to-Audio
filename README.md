# Books to Audio

Books-to-Audio is a Node.js script that converts text files into audio files using AI text-to-speech using Eleven Labs API. This script can be used to listen to your favorite books, articles, or any text-based content while doing other activities such as commuting, working out, or doing household chores.

The script is designed to work with text files in the .txt format.


## Run Locally

#### 1. Clone the project

```bash
  git clone https://github.com/Amethesh/Books-to-Audio.git
```

#### 2. Go to the project directory

```bash
  cd Books-to-Audio
```

#### 3. Install dependencies

```bash
  npm install
```

#### 4. Place your text file in the "novels" directory

#### 5. Run the index

```bash
  node ./src/index
```

#### 6. The audio file will be generated in the "audio" directory
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY`="YOUR_ELEVENLABS_API_KEY"


## Configuration
#### The "index.js" file contains the following configuration options:

- **language:** The language to use for text-to-speech (default: 'en-US')
- **voice:** The name of the voice to use for text-to-speech (default: 'en-US-Standard-D')
- **outputFormat:** The format to use for the audio file (default: 'mp3')
- **bitrate:** The bitrate to use for the audio file (default: 320000)

## Enjoy

![Alt Text](https://tenor.com/view/darkville-rpg-music-listening-to-music-gif-14887332.gif)
## Authors

- [@Amethesh](https://github.com/Amethesh)

