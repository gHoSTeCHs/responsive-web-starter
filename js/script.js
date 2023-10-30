const music = document.querySelector('.music');
const title = document.querySelector('.name');
const author = document.querySelector('.author');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const musicImg = document.querySelector('.musicImg');
const play = document.querySelector('.play');
const curtime = document.querySelector('.elapsed');
const tolTime = document.querySelector('.total');
const progressContainer = document.querySelector('.progressBar');
const bar = document.querySelector('.progress');
const faplay = document.querySelector('.fa-play');
const fapause = document.querySelector('.fa-pause');

const musicObj = [
	{
		id: 1,
		title: 'Lost in the City Lights',
		artist: 'Cosmo Sheldrake',
		img: '../images/cover-1.png',
		song: '../audio/lost-in-city-lights-145038.mp3',
	},
	{
		id: 2,
		title: 'Forest Lullaby',
		artist: 'Lesfm',
		img: '../images/cover-2.png',
		song: '../audio/forest-lullaby-110624.mp3',
	},
];

function playMusic() {
	if (!music.paused) {
		faplay.style.display = 'block';
		fapause.style.display = 'none';
		music.pause();
	} else {
		faplay.style.display = 'none';
		fapause.style.display = 'block';
		music.play();
	}
}

music.controls = false;
let isDragging = false;
let currentSong = 0;

function addSong() {
	let item = musicObj[currentSong];
	music.src = item.song;
	author.textContent = item.artist;
	title.textContent = item.title;
	musicImg.src = item.img;
	bar.style.width = '0%';

	music.addEventListener('loadedmetadata', () => {
		const dura = music.duration / 60;
		const minutes = Math.floor(dura);
		const seconds = Math.floor(music.duration % 60);
		tolTime.textContent = `${minutes < 10 ? '0' + minutes : minutes}:${
			seconds < 10 ? '0' + seconds : seconds
		}`;
	});

	const crTime = music.currentTime;
	if (crTime == 0) {
		curtime.textContent = '00:00';
	}

	if (music.paused) {
		faplay.style.display = 'block';
		fapause.style.display = 'none';
		// music.pause();
	} else {
		faplay.style.display = 'none';
		fapause.style.display = 'block';
		// music.play();
	}
}

function startDragging(e) {
	isDragging = true;
	updateBar(e);
}

function stopDragging(e) {
	if (isDragging) {
		isDragging = false;
		const clickPosition =
			e.clientX - progressContainer.getBoundingClientRect().left;
		music.currentTime =
			(clickPosition / progressContainer.offsetWidth) * music.duration;
	}
}

function updateBar(e) {
	if (isDragging) {
		const clickPosition =
			e.clientX - progressContainer.getBoundingClientRect().left;
		music.currentTime =
			(clickPosition / progressContainer.offsetWidth) * music.duration;
	}

	const currentTime = music.currentTime;
	const totalTime = music.duration;
	const proMath = (currentTime / totalTime) * 100;
	bar.style.width = proMath + '%';
	const curTimeSec = Math.floor(currentTime % 60);
	const curTimeMin = Math.floor(currentTime / 60);

	curtime.textContent = `${curTimeMin < 10 ? '0' + curTimeMin : curTimeMin}:${
		curTimeSec < 10 ? '0' + curTimeSec : curTimeSec
	}`;
}

function nextSong() {
	if (currentSong >= musicObj.length - 1) {
		console.log('End of queue');
	} else {
		currentSong++;
		addSong();
	}
}

function prevSong() {
	if (currentSong == 0) {
		console.log('End of queue');
	} else {
		currentSong--;
		addSong();
	}
}

music.addEventListener('timeupdate', updateBar);
next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);
play.addEventListener('click', playMusic);
progressContainer.addEventListener('mousedown', startDragging);
document.addEventListener('mouseup', stopDragging);
document.addEventListener('mousemove', updateBar);

window.addEventListener('DOMContentLoaded', () => {
	addSong();
});
