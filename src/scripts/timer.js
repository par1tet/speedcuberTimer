import { showStatistic } from "./solvesPanelSettings.js";

let sptimerSec = document.getElementById('sptimer-sec')
let sptimerMs = document.getElementById('sptimer-ms')
let point = document.getElementById('point')


let isSolving = false;// Проверка на собирание кубика
let timerInterval = 0;

function renderCube(cubeMap){
    let scramblePad = document.querySelector(".scramble-pad")// Получаем элемент на котором будем рисовать
    scramblePad.innerHTML = ''// Очищаем
    for (let i = 0;i < cubeMap.length;i++){
        for (let j = 0;j < cubeMap[0].length;j++){
            let newDiv = document.createElement('div')// Создаем элемент цвета кубика
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
    fetch("http://127.0.0.1:8002/scrumble")
    .then(res => res.json())
    .then(dataCub => {
        document.querySelector(".scramble-panel").innerHTML = `<span class='scrumble-text'>${dataCub.scrumble}</span>`
        renderCube(dataCub.cubeMap)
    })
}
function cubeGenerate(){
    fetch("http://127.0.0.1:8002/scrumble", {
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

function solvesShow(dataSolves){
    let solvesPanel = document.querySelector('.solves-panel')
    solvesPanel.innerHTML = ''

    let solvesTable = document.createElement('table')
    solvesTable.classList.add('solves-table')

    // Создание сборок

    for (let i = 0;i < dataSolves.solves.length;i++){
        let newSolve = document.createElement('tr')

        let time = document.createElement('td')// Время сборки
        let number = document.createElement('td')// Номер сборки

        let lastAo5 = document.createElement('td')// Среднее из последних пяти
        let lastFiveSum = 0
        if (i >= 4){
        for(let j = 0;j < 5;j++){
            lastFiveSum += dataSolves.solves[i - j].time
        }lastAo5.innerHTML = (lastFiveSum / 5).toFixed(3)}else{lastAo5.innerHTML = ''}
        

        let lastAo12 = document.createElement('td')// Среднее из последних двенадцати
        let last12Sum = 0
        if (i >= 11){
        for(let j = 0;j < 12;j++){
            last12Sum += dataSolves.solves[i - j].time
        }lastAo12.innerHTML = (last12Sum / 12).toFixed(3)}else{lastAo12.innerHTML = ''}

        time.innerHTML = dataSolves.solves[i].time
        number.innerHTML = i+1

        newSolve.append(number)
        newSolve.append(time)
        newSolve.append(lastAo5)
        newSolve.append(lastAo12)

        solvesTable.prepend(newSolve)
    }

    // Создание заголовка
    let title = document.createElement('tr')

    let time = document.createElement('td')// Время сборки
    let number = document.createElement('td')// Номер сборки
    let lastAo5 = document.createElement('td')// Среднее из последних пяти
    let lastAo12 = document.createElement('td')// Среднее из последних двенадцати

    time.innerHTML = 'Время'
    number.innerHTML = '№'
    lastAo5.innerHTML = 'ao5'
    lastAo12.innerHTML = 'ao12'

    title.append(number)
    title.append(time)
    title.append(lastAo5)
    title.append(lastAo12)

    solvesTable.prepend(title)

    solvesPanel.append(solvesTable)
}

if (document.querySelector(".scramble-panel").innerHTML === ''){
    cubeGenerate()
    renderScrumble()
    fetch("http://127.0.0.1:8002/newSolve")
    .then(res => res.json())
    .then(dataSolves => {solvesShow(dataSolves)})
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
        let time = +`${document.querySelector('.timer-counter-sec').innerHTML}.${document.querySelector('.timer-counter-ms').innerHTML}`
        let scrumble = `${document.querySelector('.scrumble-text').innerHTML}`
        fetch("http://127.0.0.1:8002/newSolve", {
            method : "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                time: time,
                scrumble: scrumble
            })
        })
        .then(res => res.json())
        .then(dataSolves => {solvesShow(dataSolves)})
        cubeGenerate()
        renderScrumble()
        clearInterval(timerInterval)
        showStatistic()
    }
    if (event.key === ' '){// Смена по нажатию
        isSolving = !isSolving;
    }
}

document.addEventListener('keydown', timerLogic);