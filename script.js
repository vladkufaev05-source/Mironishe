document.addEventListener('DOMContentLoaded', () => {
    let workCount = 0
    const maxWorkCount = 100

    function addWork() {
        if (workCount < maxWorkCount) {
            workCount += 3;
            if (workCount > maxWorkCount) workCount = maxWorkCount;
            
            const progressPercent = workCount;
            document.getElementById('gymProgress').style.width = progressPercent + '%'
            document.getElementById('percent').textContent = progressPercent + '%'
            document.getElementById('progressText').textContent = workCount + ' ТРЕНИРОВОК'
            document.getElementById('workCount').textContent = workCount
        } else {
            alert('ВСЕ ТРЕНИРОВКИ ПРОЙДЕНЫ')
        }
    }

    let gameIndex = 0
    const countGames = 4

    function cardGame(index) {
        document.querySelectorAll('.game-card').forEach(card => {
            card.classList.remove('active');
        });
        document.querySelector(`.game-card[data-index="${index}"]`).classList.add('active')
    }

    function nextGame() {
        gameIndex = (gameIndex + 1) % countGames
        cardGame(gameIndex)
    }

    function prevGame() {
        gameIndex = (gameIndex - 1 + countGames) % countGames
        cardGame(gameIndex)
    }
    document.querySelector('.but').addEventListener('click', addWork)
    document.querySelectorAll('.slider-but')[0].addEventListener('click', prevGame)
    document.querySelectorAll('.slider-but')[1].addEventListener('click', nextGame)
    cardGame(0);

    let trackIndex = 0;
    let isPlaying = false

    const audio = document.getElementById('audio-controls')
    const playBut = document.getElementById('play-but')
    const vinylPlastin = document.getElementById('plastin')

    function loadTrack(index) {
        const track = document.querySelectorAll('.track-item')[index]
        const src = track.dataset.src
        const title = track.dataset.title
        const artist = track.dataset.artist

        audio.src = src;

        document.getElementById('music-title').textContent = title
        
        document.querySelectorAll('.track-item').forEach(item => {
            item.classList.remove('active')
        });
        track.classList.add('active')
        
        trackIndex = index;
    }

    function togglePlay() {
        if (isPlaying) {
            audio.pause()
            playBut.textContent = '►'
            playBut.classList.remove('playing')
            vinylPlastin.style.animationPlayState = 'paused';
            isPlaying = false;
        } else {
            audio.play();
            playBut.textContent = '‖'
            playBut.classList.add('playing')
            vinylPlastin.style.animationPlayState = 'running';
            isPlaying = true;
        }
    }

    function nextTrack() {
        trackIndex = (trackIndex + 1) % 4
        loadTrack(trackIndex);
        if (isPlaying) {
            audio.play()
        }
    }

    function prevTrack() {
        trackIndex = (trackIndex - 1 + 4) % 4
        loadTrack(trackIndex)
        if (isPlaying) {
            audio.play()
        }
    }

    audio.addEventListener('ended', () => {
        nextTrack();
    });

    document.querySelectorAll('.track-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            loadTrack(index);
            if (isPlaying) {
                audio.play();
            }
        });
    });


    document.querySelectorAll('.control-but')[0].addEventListener('click', prevTrack)
    document.querySelectorAll('.control-but')[1].addEventListener('click', togglePlay)
    document.querySelectorAll('.control-but')[2].addEventListener('click', nextTrack)


    loadTrack(0)
});