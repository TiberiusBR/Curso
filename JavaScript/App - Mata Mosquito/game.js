//Initial Variables
var height = 0;
var width = 0;
var vidas = 1;
var time = 5;

var createMosquitoTime = 1500;

var level = window.location.search;
level = level.replace('?', '');

if (level === 'easy') {
    //1500
    createMosquitoTime = 1500
} else if (level === 'medium') {
    //1000
    createMosquitoTime = 1000
} else if (level === 'hard') {
    //750
    createMosquitoTime = 750
}

//Adjust game to device size
function adjustGameWindowSize() {
    height = window.innerHeight;
    width = window.innerWidth;
}

adjustGameWindowSize()

//Create an custom countdown to game victory
var cronometro = setInterval(function () {
    document.getElementById('cronometro').innerHTML = time;
    time -= 1;

    if (time < 0) {
        clearInterval(cronometro);
        clearInterval(createMosquito);
        alert('Win!');
        window.location.href = "vitoria.html";
    }
}, 1000)

function mosquitoRandomPosition() {

    //Remove the object, if there's one, and control player's health
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove();

        if (vidas > 3) {
            window.location.href = "fim_de_jogo.html"
        } else {
            document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png"
            vidas++
        }
    }

    //Assign random positions based on device resolution.
    //Removes 90 from tje value so the object doesn't extrapolate window size
    var positionX = Math.floor(Math.random() * width) - 90;
    var positionY = Math.floor(Math.random() * height) - 90;

    //Makes sure that the random positions wont have a negative value.
    positionX = positionX < 0 ? 0 : positionX;
    positionY = positionY < 0 ? 0 : positionY;

    //Create HTML Element
    var mosquito = document.createElement('img');
    mosquito.src = 'imagens/mosquito.png';
    mosquito.className = mosquitoRandomSize() + ' ' + mosquitoRandomMirror();
    mosquito.style.left = positionX + 'px';
    mosquito.style.top = positionY + 'px';
    mosquito.style.position = 'absolute';
    mosquito.id = 'mosquito';
    mosquito.onclick = function () {
        this.remove();
    }

    document.body.appendChild(mosquito);
}

//Randomly defines the size based on 3 classes on the style.css
function mosquitoRandomSize() {
    var classe = Math.floor(Math.random() * 3);

    switch (classe) {
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }
}

//Randomly mirrors the object orientation
function mosquitoRandomMirror() {
    var classe = Math.floor(Math.random() * 2);

    switch (classe) {
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
    }
}