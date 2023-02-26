import fs from "fs";
import path from "path"
import { exec } from "child_process";

const __dirname = path.resolve();
const dir = path.join(__dirname, "Audio", "audioSpilt");

function joinMP3(inputFiles, outputFile) {
  // Use ffmpeg to concatenate the input files into one output file
  const inputFilePaths = inputFiles.map((filename) => {
    return path.join(dir, filename);
  });

  // Joining files like this "file1.mp3|file2.mp3|file3.mp3"
  const command = `ffmpeg -i "concat:${inputFilePaths.join("|")}" -c copy ${outputFile}.mp3`; 

  // Execute the ffmpeg command
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error joining MP3 files: ${err}`);
      return;
    }
    console.log(`Successfully joined MP3 files. Output file: ${outputFile}.mp3`);
  });
}

function getAllMP3FilesInDirectory(dirPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        reject(err);
      } else {
        const mp3Files = files.filter((file) => {
          return path.extname(file).toLowerCase() === ".mp3";
        });
        resolve(mp3Files);
      }
    });
  });
}

async function joinAllMP3FilesInDirectory(chapterNo) {
  try {
    const mp3Files = await getAllMP3FilesInDirectory(dir);
    const outputFile = path.join(__dirname,"Audio","finalOutput",`chapter-${chapterNo}`);
    joinMP3(mp3Files, outputFile);
  } catch (err) {
    console.error(`Error joining all MP3 files in directory: ${err}`);
  }
}

joinAllMP3FilesInDirectory(1);
