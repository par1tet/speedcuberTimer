let sptimerSec = document.getElementById('sptimer-sec')
let sptimerMs = document.getElementById('sptimer-ms')
let point = document.getElementById('point')


let isSolving = false;// Проверка на собирание кубика
let timerInterval = 0;

function renderScrumble(){
    fetch("http://127.0.0.1:8016/scrumble")
    .then(res => res.json())
    .then(dataCub => {
        document.querySelector(".scramble-panel").innerHTML = dataCub.scrumble
    })
}
function cubeGenerate(){
    fetch("http://127.0.0.1:8016/scrumble", {
        method : "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            codepost : 1// 1 - Создать скрамбл, и сделать разметку куба
        })
    })
}


function timerLogic(event){
    if (event.key !== ' '){// Тест на нажатие пробела
        return 0
    }
    fetch("/scrumble")
    if (!isSolving){// Запуск таймера
        point.innerHTML = "."
        sptimerSec.innerHTML = "0";
        sptimerMs.innerHTML = "0";
        timerInterval = setInterval(() => {
            if (sptimerMs.innerHTML == '99'){
                sptimerSec.innerHTML = +sptimerSec.innerHTML + 1;
                sptimerMs.innerHTML = 0;
            }else{
                sptimerMs.innerHTML = +sptimerMs.innerHTML + 1;
            }
        },10)
    }else{// Остановления таймера
        cubeGenerate()
        renderScrumble()
        clearInterval(timerInterval)
    }
    if (event.key === ' '){// Смена по нажатию
        isSolving = !isSolving;
    }
}

document.addEventListener('keydown', timerLogic);