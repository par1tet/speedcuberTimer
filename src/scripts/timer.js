let sptimerSec = document.getElementById('sptimer-sec')
let sptimerMs = document.getElementById('sptimer-ms')
let point = document.getElementById('point')


let isSolving = false;// Проверка на собирание кубика
let timerInterval = 0;


function timerLogic(event){
    if (event.key !== ' '){// Смена по нажатию
        console.log('timerjl')
        return 0
    }
    if (!isSolving){// Если не собирает, и нажимает на пробел
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
    }else{
        clearInterval(timerInterval)
    }
    if (event.key === ' '){// Смена по нажатию
        isSolving = !isSolving;
    }
}

document.addEventListener('keydown', timerLogic);