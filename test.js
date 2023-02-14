var options  = require('./options.json')

var request = require('request');

var options = {
  'method': 'GET',
  'url': 'https://api.elevenlabs.io/v1/voices',
  'headers': {
    'xi-api-key': options.api_key
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
	json = response.body;
	json_obj = JSON.parse(json);;
	for(voice in json_obj.voices)
	{
		_voice = json_obj.voices[voice];
		if(_voice.category === 'custom')
			console.log('voice name: ' + _voice.name + ', voice ID: ' + _voice.voice_id);
	}
});