let b = setInterval(gameFunc, 10);
let a = setTimeout(gameStart, 1500);

if (localStorage.getItem('HighScore') == null) {
    document.getElementById('highScore').innerHTML = 0;
}
else {
    document.getElementById('highScore').innerHTML = localStorage.getItem('HighScore');
}

let container = document.getElementById('container');
let dino = document.querySelector('.dino');
let hedgehog = document.querySelector('.hedgehog');
let gameStartOver = document.querySelector('.gameStartOver');
let music=document.getElementById('music');
let audio=new Audio('Background.mp3');

music.addEventListener('click',function()
{
   if(music.innerHTML=='<span class="material-icons">music_off</span>')
   {
    music.innerHTML=`<span class="material-icons">music_note</span>`;
    audio.play();
   }
   else
    {
        music.innerHTML=`<span class="material-icons">music_off</span>`;
        audio.pause();
    }
});

function gameStart() {
    Score();
    gameStartOver.style.display = "none";
    window.addEventListener('touchstart',function()
    {
        dino.classList.add('dinoUpClass');
        setTimeout(function () {
            dino.classList.remove('dinoUpClass');
        }, 1000);
    })
    window.addEventListener('keydown', fun);
    hedgehog.classList.add('hedgehogAniClass');
    function fun(event) {
        let value = event.keyCode || event.which;
        if (value == 39) {
            dino.style.left = parseInt(window.getComputedStyle(dino).getPropertyValue('Left')) + 5 + "px";
        }
        if (value == 37) {
            dino.style.left = parseInt(window.getComputedStyle(dino).getPropertyValue('Left')) - 5 + "px";
        }
        if (value === 38) {
            dino.classList.add('dinoUpClass');
            setTimeout(function () {
                dino.classList.remove('dinoUpClass');
            }, 1000);
        }
    }
}

let i = 1;
let score;
function Score() {
    score = setInterval(scoreFun, 1000);
    function scoreFun() {
        document.getElementById('score').innerHTML = i++;
    }
}

function gameFunc() {
    let dx = parseInt(window.getComputedStyle(dino).getPropertyValue('Left'));
    let dy = parseInt(window.getComputedStyle(dino).getPropertyValue('Bottom'));
    let hx = parseInt(window.getComputedStyle(hedgehog).getPropertyValue('Left'));
    let hy = parseInt(window.getComputedStyle(hedgehog).getPropertyValue('Bottom'));
    let x = Math.abs(hx - dx);
    let y = Math.abs(hy - dy);
    if (x < 69 && y < 50) {
        clearInterval(score);;
        if (parseInt(document.getElementById('score').innerHTML) > (document.getElementById('highScore').innerHTML)) {
            document.getElementById('highScore').innerHTML=document.getElementById('score').innerHTML;
            localStorage.setItem('HighScore',document.getElementById('score').innerHTML);
        }
        localStorage.setItem('HighScore',document.getElementById('highScore').innerHTML);
        let overaudio = new Audio('GameOver.mp3');
        audio.pause();
        overaudio.volume = 0.3;
        overaudio.play();
        music.innerHTML=`<span class="material-icons">music_off</span>`;
        gameStartOver.style.display = "block";
        gameStartOver.innerHTML = "Game Over";
        hedgehog.classList.remove('hedgehogAniClass');
        dino.style.left = "0px";
        clearInterval(b);
    }
}

