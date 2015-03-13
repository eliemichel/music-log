
var youtubeVideo = /^https?:\/\/(?:www\.)?youtube\.[a-z]+\/watch\?v=([A-z0-9_-]+)(?:$|&)/;

if ((match = youtubeVideo.exec(window.location.href)) !== null) {
	var id = match[1];
	self.port.emit('youtubeVideoOpened', id);
}

