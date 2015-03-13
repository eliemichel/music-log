var toBeConverted = new Array();
var conversionMutex = false;


function runConverter() {
	if (!conversionMutex && (id = toBeConverted.pop()) !== undefined) {
		conversionMutex = true;

		var video_url = 'https://www.youtube.com/watch?v=' + id;
		self.port.emit('debug', video_url);
		document.getElementById('youtube-url').value = video_url;
		document.getElementById('submit').click();
		while (document.getElementById('status_text').innerHTML != 'Vidéo convertie avec succès en mp3')
		{}
		var title = document.getElementById('title').innerHTML.substring(14);
		var mp3_url = document.getElementById('dl_link').children[1].href;

		this.port.emit('downloadMP3', {
			'title': title,
			'url': mp3_url
		});

		conversionMutex = false;
		runConverter();
	}
}

self.port.on('convertYoutubeVideo', function(id) {
	self.port.emit('debug', '[TEST] ' + id);
	toBeConverted.push(id);
	runConverter();
});


self.port.emit('debug', 'opened');