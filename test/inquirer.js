import inquirer from "inquirer";
import Table from "cli-table3";

// const questions = [
//     {
//       type: "list",
//       name: "option",
//       message: "Select an option:",
//       choices: [
//         "21m00Tcm4TlvDq8ikWAM",
//         "AZnzlk1XvdvUeBnXmlld",
//         "EXAVITQu4vr4xnSDxMaL",
//         "ErXwobaYiN019PkySvjV",
//         "VR6AewLTigWG4xSOukaG",
//         "pNInz6obpgDQGcFmaJgB",
//         "yoZ06aMxZJJ28mfd3POQ",
//         new inquirer.Separator(),
//         {
//           name: "Custom option",
//           value: "custom",
//         },
//       ],
//     },
//     {
//       type: "input",
//       name: "voice_id",
//       message: "Enter your custom voice id:",
//       when: (answers) => answers.option === "custom",
//     },
//   ];
  
//   inquirer.prompt(questions).then((answers) => {
//     console.log("Selected option:", answers.option);
//     if (answers.customOption) {
//       console.log("Custom option:", answers.customOption);
//     }
//   });
const table = new Table({
    head: ["Name", "Voice_Id", "Gender"],
    style: {
      head: ["blue", "bold"],
      border: [],
    },
    colWidths: [15, 25, 10],
  });
  
  table.push(
    ["Rachel", "21m00Tcm4TlvDq8ikWAM", "Female"],
    ["Domi", "AZnzlk1XvdvUeBnXmlld", "Female"],
    ["Bella", "EXAVITQu4vr4xnSDxMaL", "Female"],
    ["Antoni", "ErXwobaYiN019PkySvjV", "Male"],
    ["Arnold", "VR6AewLTigWG4xSOukaG", "Male"],
    ["Adam", "pNInz6obpgDQGcFmaJgB", "Male"],
    ["Sam", "yoZ06aMxZJJ28mfd3POQ", "Male"]
  );
  
  const options = table.map((row) => ({
    name: row[0],
    value: row[1],
  }));
  
  options.push({
    name: "Custom voice",
    value: "custom",
  });
  
  const questions = [
    {
      type: "list",
      name: "voiceId",
      message: "Select a voice ID:",
      choices: options,
    },
    {
      type: "input",
      name: "customVoiceId",
      message: "Enter a custom voice ID:",
      when: (answers) => answers.voiceId === "custom",
    },
  ];
  
  inquirer.prompt(questions).then((answers) => {
    console.log("Selected voice ID:", answers.voiceId);
    if (answers.customVoiceId) {
      console.log("Custom voice ID:", answers.customVoiceId);
    }
  });