#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import readline from "readline";
import Table from "cli-table3";
import fs from "fs";
import fileSpilt from "./fileSpilter.js";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r,ms)) //Function for waiting for few seconds

//To display big starting text(Books to Audio)
function start() {
  console.clear();
  const msg = "Books to Audio";

  figlet(msg, (err, data) => {
    console.log(gradient.cristal.multiline(data));
    instructions();
    promptToContinue();
  });
}

//Starting instructions
function instructions() {
  console.log(`
  ${chalk.bold.red("Requirements:")}  
- Your book or file should be in ${chalk.green(".txt")} format
- Use this tool to convert them: https://www.zamzar.com/convert/epub-to-txt/
- Your Eleven Labs's ${chalk.green("API Key")}
- Enough ${chalk.green("chatacters")} left to convert the book 
- Use this tool to check No of characters in your text file: https://www.charactercountonline.com/

${chalk.red(`Caution: By running this script you will spend your character usage,
So make sure your .txt file is correct and with proper spacing and newline(i.e,Enters)`)}
  `);
}

//Press Enter to continue: Function
function promptToContinue() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Press Enter to continue...", (answer) => {
    console.log("Continuing...");
    filePaths();
    // rl.close();
  });
}

//Getting 1.input_path 2.output_path 3.API_KEY
function filePaths() {
  const questions = [
    {
      type: "input",
      name: "input_path",
      message: "Enter your .txt file path:",
      default() {
        return "./Books/FILE_NAME.txt";
      },
    },
    {
      type: "input",
      name: "output_path",
      message: "Enter your output file path:",
      default() {
        return "./Audio/output.mp3";
      },
    },
    {
      type: "input",
      name: "API_KEY",
      message: "Enter your API key:",
      default() {
        return chalk.red("API_KEY");
      },
    },
  ];

  inquirer.prompt(questions).then((answers) => {
    // const jsonData = JSON.stringify(answers);
    // console.log(JSON.stringify(answers, null, "  "));
    voiceId(answers);
  });
}

//Displaying defaults voiceids and Getting it
function voiceId(firstAnswers) {
  let table = new Table({
    head: ["Name", "Voice_Id", "Gender"],
    style: {
      head: ["blue","bold"], //disable colors in header cells
      border: [], //disable colors for the border
    },
    colWidths: [15, 25, 10], //set the widths of each column (optional)
  });

  table.push(
    ["Rachel", "21m00Tcm4TlvDq8ikWAM", "Female"],
    ["Domi", "AZnzlk1XvdvUeBnXmlld", "Female"],
    ["Bella", "EXAVITQu4vr4xnSDxMaL", "Female"],
    ["Antoni", "ErXwobaYiN019PkySvjV", "Male"],
    ["Arnold", "VR6AewLTigWG4xSOukaG", "Male"],
    ["Adam", "pNInz6obpgDQGcFmaJgB", "Male"],
    ["Sam", "yoZ06aMxZJJ28mfd3POQ", "Male"],
  );
  
  const question = 
    {
      type: "input",
      name: "voice_id",
      message: "Enter the voice id:",
      default() {
        return "ErXwobaYiN019PkySvjV";
      },
    };

  console.log(chalk.bold.magenta(`
  Default Voice ids:`));
  console.log(`${table.toString()}`);
  console.log(chalk.red(`Custom voices not included`));
  inquirer.prompt(question).then((answers) => {

    const newAnswers = Object.assign({},firstAnswers,answers);
    const jsonData = JSON.stringify(newAnswers);
    // console.log(JSON.stringify(newAnswers, null, "  "));

    fs.writeFile("./json/data.json", jsonData, (err) => {
      if (err) throw err;
      console.log("Data saved to JSON file.");
      converWait();     
    });
  });
}

let spinner
//Loading screen 
async function converWait(){
  console.log(chalk.bold.magenta(`
  This might take several minutes..`))
  spinner = createSpinner("Converting...").start();

  fs.readFile('./json/data.json', 'utf8', async (err, data) => {
    if (err) throw err;
    const key = JSON.parse(data);
    // console.log(key);
    
    //!Calling for converation
    console.log(key.input_path)
    await fileSpilt(key.input_path,key.output_path,key.API_KEY,key.voice_id)
  });
  // await sleep()
}

//Big ending text
export async function success(){
  const msg = "Converted sucessfully";
  spinner.success({text: `Audio created in ouput directory`})
  
  figlet(msg, (err, data) => {
    console.log(gradient.retro.multiline(data));
    //deleteTemp()
  });

}

//To delete temporary files created
function deleteTemp() {

  inquirer
  .prompt(
    {
      type: 'confirm',
      name: 'tempDelete',
      message: 'Do you want to delete the temporary file created?',
    })
  .then((answers) => {
    // console.log(JSON.stringify(answers, null, '  '));
  });

}
//! Calling all functions
start();
