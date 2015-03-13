var pageMod = require('sdk/page-mod');
var pageWorker = require("sdk/page-worker");




/* -=-=-=-=- Converter -=-=-=-=- */

//*
var converterPageWorker = pageWorker.Page({
	contentURL: 'http://www.youtube-mp3.org',
	contentScriptFile: './youtubeMP3Bot.js'
});


converterPageWorker.port.on('downloadMP3', function(mp3) {
	console.log('Title: ' + mp3.title + ' (at ' + mp3.url + ')');
});

/*/

var tabs = require('sdk/tabs');
var converterPageWorker = null;


tabs.open({
	url: 'http://www.youtube-mp3.org',
	onOpen: function (tab) {
		console.log('OPENED');

		converterPageWorker = tab.attach({
			contentScriptFile: './youtubeMP3Bot.js'
		});

		converterPageWorker.port.on('downloadMP3', function(mp3) {
			console.log('Title: ' + mp3.title + ' (at ' + mp3.url + ')');
		});

		converterPageWorker.port.on('debug', function(msg) {
			console.log('[DEBUG] ' + msg);
		});

	}
});
*/



/* -=-=-=-=- Youtube video detecter -=-=-=-=- */

pageMod.PageMod({
	include: '*.youtube.com',
	contentScriptFile: './youtubeVideoDetector.js',
	contentScriptWhen: 'start',
	onAttach: youtubeVideoListener
});

function youtubeVideoListener(worker) {
	worker.port.on('youtubeVideoOpened', function(id) {
		console.log('BLABLABLA');
		console.log(converterPageWorker.port);
		converterPageWorker.port.emit('convertYoutubeVideo', id);
	});	
}

