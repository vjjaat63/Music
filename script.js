// music
const input = document.getElementById('input');
const btn = document.getElementById('search');
const container = document.getElementById('container');
const dm = document.getElementById('dm');

let handledata = (data)=>{
    
    const oldResult = document.getElementById('result');
    if (oldResult) 
        oldResult.remove();
    
    const result = document.createElement('div');
    result.id = 'result'
    container.appendChild(result);
    
    
    
    data.forEach(song => {
        let details = document.createElement('div')
        details.className = 'song';
        // console.log(song)
        const album = song.album;
        const thumbnail = song.image;        
        const audio = song.media_url;
        const artists = song.singers;
        const duration ={
            minutes : Math.floor(parseInt(song.duration)/60) ,
            seconds : Math.floor(parseInt(song.duration)%60)
        }
        const music = song.music;
        const totalplays = song.play_count;
        const releaseDate = song.release_date;

        details.innerHTML = `<img src = ${thumbnail} alt = "thumbnail" class = "image">
        <p class = 'audio'> <audio src = ${audio} controls >click</audio> </p>
        <p class = 'duration'> Duration : ${duration.minutes}:${duration.seconds} </p>
        <p class = 'album'> Album : ${album}</p>
        <p class = 'singer'> Singer : ${artists} </p>
        <p class = 'music'> Music By : ${music} </p>
        <p class = 'totalplays'> Total Plays : ${totalplays} </p>
        <p class = 'totalplays'> Release Date : ${releaseDate} </p> `
        
        result.insertAdjacentElement('beforeend',details);
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