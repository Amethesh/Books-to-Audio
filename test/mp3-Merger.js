// // const ffmpeg = require('fluent-ffmpeg');
// import ffmpeg from 'fluent-ffmpeg';

// function joinMP3(inputFile1, inputFile2, outputFile) {
//   // Use fluent-ffmpeg to concatenate the two input files into one output file
//   ffmpeg()
//     .input(inputFile1)
//     .input(inputFile2)
//     .on('error', (err) => {
//       console.error(`Error joining MP3 files: ${err.message}`);
//     })
//     .on('end', () => {
//       console.log(`Successfully joined MP3 files. Output file: ${outputFile}`);
//     })
//     .output(outputFile)
//     .run();
// }

// // Example usage: join two MP3 files into one
// joinMP3('chapter1.mp3', 'chapter2.mp3', 'output.mp3');


// const { exec } = require('child_process');
import { exec } from "child_process"

function joinMP3(inputFile1, inputFile2, outputFile) {
  // Use ffmpeg to concatenate the two input files into one output file
  const command = `ffmpeg -i "concat:${inputFile1}|${inputFile2}" -c copy ${outputFile}`;

  // Execute the ffmpeg command
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error joining MP3 files: ${err}`);
      return;
    }
    console.log(`Successfully joined MP3 files. Output file: ${outputFile}`);
  });
}

// Example usage: join two MP3 files into one
joinMP3('Audio/audioSpilt/voice-1.mp3', 'Audio/audioSpilt/voice-2.mp3', 'Audio/finalOutput/chapter-2.mp3');
