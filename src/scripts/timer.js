let sptimerSec = document.getElementById('sptimer-sec')
let sptimerMs = document.getElementById('sptimer-ms')
let point = document.getElementById('point')


let isSolving = false;// Проверка на собирание кубика
let timerInterval = 0;

function renderCube(cubeMap){
    console.log(123)
    scramblePad = document.querySelector(".scramble-pad")// Получаем элемент на котором будем рисовать
    scramblePad.innerHTML = ''// Очищаем
    for (let i = 0;i < cubeMap.length;i++){
        for (let j = 0;j < cubeMap[0].length;j++){
            newDiv = document.createElement('div')// Создаем элемент цвета кубика
            newDiv.style.border = '2.5px black solid'
            switch (cubeMap[i][j]){
                case 'W':
                    newDiv.style.backgroundColor = 'white'
                    scramblePad.append(newDiv)
                    break
                case 'Y':
                    newDiv.style.backgroundColor = '#FFD700'
                    scramblePad.append(newDiv)
                    break
                case 'R':
                    newDiv.style.backgroundColor = 'red'
                    scramblePad.append(newDiv)
                    break
                case 'O':
                    newDiv.style.backgroundColor = '#ED760E'
                    scramblePad.append(newDiv)
                    break
                case 'B':
                    newDiv.style.backgroundColor = '#4285B4'
                    scramblePad.append(newDiv)
                    break
                case 'G':
                    newDiv.style.backgroundColor = '#47A76A'
                    scramblePad.append(newDiv)
                    break
                case ' ':
                    newDiv.style.backgroundColor = 'none'
                    newDiv.style.border = '0px'
                    scramblePad.append(newDiv)
                    break
            }
        }
    }
}

function renderScrumble(){
    fetch("http://127.0.0.1:8001/scrumble")
    .then(res => res.json())
    .then(dataCub => {
        document.querySelector(".scramble-panel").innerHTML = `<span class='scrumble-text'>${dataCub.scrumble}</span>`
        renderCube(dataCub.cubeMap)
    })
}
function cubeGenerate(){
    fetch("http://127.0.0.1:8001/scrumble", {
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