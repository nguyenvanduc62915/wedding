const biicore = {
    effect: JSON.parse('{"type":"custom","setting":{"icon":"https://cdn.biihappy.com/ziiweb/wedding-snows/22.png","number":"50","speed":"2","minSize":"20","maxSize":"40"}}'),
    templatePremium: ('1' === '1'),
    bgMusic: 'media.mp3',
    autoMusic: true
};

let audio;
let isPlaying = false;
let isInitialized = false;

function initializeAudio() {
    if (!isInitialized) {
        audio = new Audio(biicore.bgMusic);
        audio.loop = true;
        audio.volume = 0.5;

        audio.addEventListener('canplaythrough', () => {
            if (biicore.autoMusic && !isPlaying) {
                playAudio();
            }
        });

        audio.addEventListener('error', (e) => {
            console.error('Audio error:', e);
        });

        isInitialized = true;
    }
}

function playAudio() {
    if (audio && audio.paused) {
        audio.play().then(() => {
            isPlaying = true;
            console.log('Music playing');
            updateVolumeIcon();
        }).catch(error => {
            console.error('Error playing audio:', error);
        });
    }
}

function pauseAudio() {
    if (audio && !audio.paused) {
        audio.pause();
        isPlaying = false;
        console.log('Music paused');
        updateVolumeIcon(); 
    }
}

function togglePlayPause() {
    if (!isInitialized) {
        initializeAudio();
    }

    if (isPlaying) {
        pauseAudio();
    } else {
        playAudio();
    }
}

function updateVolumeIcon() {
    const volumeIconOn = document.getElementById('playerVolumeOn');
    const volumeIconOff = document.getElementById('playerVolumeOff');
    if (volumeIconOn && volumeIconOff) {
        if (isPlaying) {
            volumeIconOn.style.display = 'inline'; 
            volumeIconOff.style.display = 'none'; 
        } else {
            volumeIconOn.style.display = 'none'; 
            volumeIconOff.style.display = 'inline'; 
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initializeAudio(); // Khởi tạo âm thanh ngay khi trang tải

    // Phát nhạc nếu autoMusic là true
    if (biicore.autoMusic) {
        playAudio();
    }

    const volumeIcon = document.querySelector('.playerIcon');
    if (volumeIcon) {
        volumeIcon.addEventListener('click', function(event) {
            event.stopPropagation(); // Ngăn sự kiện nổi lên body
            togglePlayPause();
        });
    } else {
        console.error('Volume icon not found');
    }
});