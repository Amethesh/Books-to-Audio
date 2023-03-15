//! Function for testing tts cause 11labs costs for evevry resquest
var i;
// Fetch your voices
const faketts = async (textLoc, voiceLoc) => {
  setTimeout(() => {
          console.log(`Converted filename_${textLoc}.txt to voice-${voiceLoc}.mp3`);
        }, 3000)    //!For testing

    // (function (i) {
    //   setTimeout(function () {
    //     console.log(`Converted filename_${textLoc}.txt to voice-${voiceLoc}.mp3`);
    //   }, 2000);
    // })(i);

};

export default faketts;
