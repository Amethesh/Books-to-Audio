import { exec } from "child_process";
import path from "path";

const __dirname = path.resolve(); // To resolve error for __dirname in ES6

function joinMP3(audio1, audio2, outputFile) {
  // Use ffmpeg to concatenate the two input files into one output file

  // const audioPath1 = path.join(__dirname, "Audio", "audioSpilt", `voice-${audio1}.mp3`);
  const audioPath1 = `Audio/audioSpilt/voice-${audio1}.mp3`;
  console.log(audioPath1)
  // const audioPath2 = path.join(__dirname, "Audio", "audioSpilt", `voice-${audio2}.mp3`);
  const audioPath2 = `Audio/audioSpilt/voice-${audio2}.mp3`;
  console.log(audioPath2)
  // const outPath = path.join(__dirname, "Audio", "finalOutput", `chapter-${outputFile}.mp3`);
  // const outPath = `Audio/finalOutput/chapter-${outputFile}.mp3`;
  const outPath = `test.mp3`;
  console.log(outPath)

  const command = `ffmpeg -i "concat:${audioPath1}|${audioPath2}" -c copy ${outPath}`;

  // Execute the ffmpeg command
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error joining MP3 files - [err]: ${err}`);
      return;
    }
    if (stderr) {
    //   console.error(`Error joining MP3 files - [stderr]: ${stderr}`); //Giving annoying errors
      return;
    }

    console.log(`Successfully joined MP3 files. Output file: ${outPath}`);
  });
}

// Example usage: join two MP3 files into one
joinMP3('1', '2', '1');
