// music
const input = document.getElementById('input');
const btn = document.getElementById('search');
const resultContainer = document.getElementById('result');
const dm = document.getElementById('dm');
const toggleThemeBtn = document.getElementById('toggle-theme');

// Theme toggle logic
function setTheme(isDark) {
    if (isDark) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
    localStorage.setItem('music-theme', isDark ? 'dark' : 'light');
}

// Load saved theme
(function() {
    const saved = localStorage.getItem('music-theme');
    if (saved === 'dark') setTheme(true);
})();

toggleThemeBtn && toggleThemeBtn.addEventListener('click', function() {
    const isDark = !document.body.classList.contains('dark');
    setTheme(isDark);
});

let handledata = (data) => {
    // Clear previous results
    resultContainer.innerHTML = '';

    data.forEach(song => {
        let details = document.createElement('div');
        details.className = 'song';
        const album = song.album;
        const thumbnail = song.image;
        const audio = song.media_url;
        const artists = song.singers;
        const name = song.song;
        let lyrics = song.lyrics;
        if(song.lyrics === null)
            lyrics = "not available";

        const duration = {
            minutes: Math.floor(parseInt(song.duration) / 60),
            seconds: Math.floor(parseInt(song.duration) % 60)
        }
        const music = song.music;
        const totalplays = song.play_count;
        const releaseDate = song.release_date;

        details.innerHTML = `<img src="${thumbnail}" alt="thumbnail" class="image">
        <p class='audio'><audio src="${audio}" controls></audio></p>
        <p class='name'><strong>Song:</strong> ${name}</p>
        <p class='album'><strong>Album:</strong> ${album}</p>
        <p class='duration'><strong>Duration:</strong> ${duration.minutes}:${duration.seconds}</p>
        <p class='singer'><strong>Singer:</strong> ${artists}</p>
        <p class='music'><strong>Music By:</strong> ${music}</p>
        <p class='totalplays'><strong>Total Plays:</strong> ${totalplays}</p>
        <p class='release_date'><strong>Release Date:</strong> ${releaseDate}</p>`;

        // Add Lyrics button
        const button = document.createElement('button');
        button.textContent = "Lyrics";
        button.className = "lyrics-btn";
        details.appendChild(button);

        // Add event listener to the individual button
        button.addEventListener('click', () => {
            if (!details.querySelector('.lyrics')) {
                const outerBox = document.createElement('div');
                outerBox.className = 'outer_box';
                outerBox.innerHTML = `<p class="lyrics">${lyrics}</p>`;
                details.appendChild(outerBox);
            }
        });

        resultContainer.appendChild(details);
    });
}

async function fetching(api) {
    console.log("Fetching API");
    let result;
    try {
        const response = await fetch(api);
        result = await response.json();
    } catch (error) {
        console.log("Unable to fetch API:", error);
    }
    handledata(result);
}

btn.addEventListener('click',()=>{
    const song = input.value.trim();
    // const song = 'ishq'
    fetching(`https://saavnapi-nine.vercel.app/result/?query=${song}&lyrics=true`);
})

input.addEventListener('keydown',(e)=>{
    if(e.key === 'Enter')
        btn.click();
})
document.addEventListener('play', function(e){
    const audios = document.querySelectorAll('audio');
    audios.forEach(audio => {
        if (audio !== e.target) {
            audio.pause();
        }
    });
}, true);

dm.addEventListener('click',()=>{
    if(document.documentElement.style.getPropertyValue('--bg') === 'white'){
        document.documentElement.style.setProperty('--bg','black');
        document.documentElement.style.setProperty('--col','white');
        document.documentElement.style.setProperty('--top','rgb(255, 105, 180)');
        document.documentElement.style.setProperty('--shadow','0 4px 8px white');
    }   
    else{
        document.documentElement.style.setProperty('--bg','white');
        document.documentElement.style.setProperty('--col','black');
        document.documentElement.style.setProperty('--top','pink');
        document.documentElement.style.setProperty('--shadow','0 8px 16px black');
    }   
})

input.addEventListener('input',()=>{
    const song = input.value.trim();
    // const song = 'ishq'
    fetching(`https://saavnapi-nine.vercel.app/result/?query=${song}&lyrics=true`);
})