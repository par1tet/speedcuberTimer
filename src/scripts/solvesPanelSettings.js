panelDiv = document.createElement('div')
panelDiv.classList.add('solves-settings-panel')

function showStatistic(){
    let tableStatistic = document.createElement('table')

    let title = document.createElement('tr')

    let titleEmptyTd = document.createElement('td')// Пустой td
    let titleSingles = document.createElement('td')// Singles td
    let titleAo5s = document.createElement('td')// Ao5 td
    let titleAo12s = document.createElement('td')// Ao12 td

    titleEmptyTd.innerHTML = ''
    titleSingles.innerHTML = 'Singls'
    titleAo5s.innerHTML = 'ao5'
    titleAo12s.innerHTML = 'ao12'

    title.append(titleEmptyTd)
    title.append(titleSingles)
    title.append(titleAo5s)
    title.append(titleAo12s)

    tableStatistic.append(title)

    // Лучшие сборки
    let betterSolves = document.createElement('tr')

    let betterEmptyTd = document.createElement('td')
    let betterSingles = document.createElement('td')
    let betterAo5s = document.createElement('td')
    let betterAo12s = document.createElement('td')

    betterEmptyTd.innerHTML = 'better'
    // Получение лучшей сборки
    fetch("http://127.0.0.1:8002/newSolve")
    .then(res => res.json())
    .then(dataSolves => {
        betterSingles.innerHTML = dataSolves.solves[0].time
        for (let i = 0; i < dataSolves.solves.length;i++){
            if (dataSolves.solves[i].time < +betterSingles.innerHTML){
                betterSingles.innerHTML = dataSolves.solves[i].time
            }
        }
    })
    // ---------------
    // Получение лучшей ao5
    fetch("http://127.0.0.1:8002/newSolve")
    .then(res => res.json())
    .then(dataSolves => {
        let ao5s = []
        let lastFiveSum = 0
        for (let i = 0;i < dataSolves.solves.length;i++){
            lastFiveSum = 0
            if (i >= 4){
                for(let j = 0;j < 5;j++){
                    lastFiveSum += dataSolves.solves[i - j].time
                }
                ao5s.push((lastFiveSum / 5).toFixed(3))
            }else{continue}
        }
        betterAo5s.innerHTML = ao5s[0]
        for (let i = 0; i < ao5s.length;i++){
            if ((+ao5s[i]) < +betterAo5s.innerHTML){
                betterAo5s.innerHTML = ao5s[i]
            }
        }
    })
    // ---------------
    // Получение лучшей ao12
    fetch("http://127.0.0.1:8002/newSolve")
    .then(res => res.json())
    .then(dataSolves => {
        let ao12s = []
        let last12Sum = 0
        for (let i = 0;i < dataSolves.solves.length;i++){
            last12Sum = 0
            if (i >= 11){
                for(let j = 0;j < 12;j++){
                    last12Sum += dataSolves.solves[i - j].time
                }
                ao12s.push((last12Sum / 5).toFixed(3))
            }else{continue}
        }
        betterAo12s.innerHTML = ao12s[0]
        for (let i = 0; i < ao12s.length;i++){
            if ((+ao12s[i]) < +betterAo12s.innerHTML){
                betterAo12s.innerHTML = ao12s[i]
            }
        }
    })
    // ---------------

    betterSolves.append(betterEmptyTd)
    betterSolves.append(betterSingles)
    betterSolves.append(betterAo5s)
    betterSolves.append(betterAo12s)

    tableStatistic.append(betterSolves)

    // Средние сборок
    let averageSolves = document.createElement('tr')

    let averageEmptyTd = document.createElement('td')// Пустой td
    let averageSingles = document.createElement('td')// Пустой td
    let averageAo5s = document.createElement('td')// Пустой td
    let averageAo12s = document.createElement('td')// Пустой td

    averageEmptyTd.innerHTML = 'average'
    // Получение среднего из всех сборок
    fetch("http://127.0.0.1:8002/newSolve")
    .then(res => res.json())
    .then(dataSolves => {
        let sum = 0
        for (let i = 0; i < dataSolves.solves.length;i++){
            sum += dataSolves.solves[i].time
        }
        averageSingles.innerHTML = (sum / dataSolves.solves.length).toFixed(2)
    })
    // ---------------
    // Получение среднего ao5
    fetch("http://127.0.0.1:8002/newSolve")
    .then(res => res.json())
    .then(dataSolves => {
        let ao5s = []
        let lastFiveSum = 0
        for (let i = 0;i < dataSolves.solves.length;i++){
            lastFiveSum = 0
            if (i >= 11){
                for(let j = 0;j < 12;j++){
                    lastFiveSum += dataSolves.solves[i - j].time
                }
                ao5s.push((lastFiveSum / 5).toFixed(3))
            }else{continue}
        }
        let sum = 0
        for (let i = 0; i < ao5s.length;i++){
            sum += +ao5s[i]
        }
        averageAo5s.innerHTML = (sum / ao5s.length).toFixed(3)
    })
    // ---------------
    // Получение среднего ao12
    fetch("http://127.0.0.1:8002/newSolve")
    .then(res => res.json())
    .then(dataSolves => {
        let ao12s = []
        let last12Sum = 0
        for (let i = 0;i < dataSolves.solves.length;i++){
            last12Sum = 0
            if (i >= 4){
                for(let j = 0;j < 5;j++){
                    last12Sum += dataSolves.solves[i - j].time
                }
                ao12s.push((last12Sum / 5).toFixed(3))
            }else{continue}
        }
        let sum = 0
        for (let i = 0; i < ao12s.length;i++){
            sum += +ao12s[i]
        }
        averageAo12s.innerHTML = (sum / ao12s.length).toFixed(3)
    })
    // ---------------

    averageSolves.append(averageEmptyTd)
    averageSolves.append(averageSingles)
    averageSolves.append(averageAo5s)
    averageSolves.append(averageAo12s)

    tableStatistic.append(averageSolves)

    // Худшие сборки
    let worstSolves = document.createElement('tr')

    let worstEmptyTd = document.createElement('td')// Пустой td
    let worstSingles = document.createElement('td')// Пустой td
    let worstAo5s = document.createElement('td')// Пустой td
    let worstAo12s = document.createElement('td')// Пустой td

    worstEmptyTd.innerHTML = 'worst'
    // Получение худшей сборки
    fetch("http://127.0.0.1:8002/newSolve")
    .then(res => res.json())
    .then(dataSolves => {
        worstSingles.innerHTML = dataSolves.solves[0].time
        for (let i = 0; i < dataSolves.solves.length;i++){
            if (dataSolves.solves[i].time > +worstSingles.innerHTML){
                worstSingles.innerHTML = dataSolves.solves[i].time
            }
        }
    })
    // ---------------
    // Получение худшей ao5
    fetch("http://127.0.0.1:8002/newSolve")
    .then(res => res.json())
    .then(dataSolves => {
        let ao5s = []
        let lastFiveSum = 0
        for (let i = 0;i < dataSolves.solves.length;i++){
            lastFiveSum = 0
            if (i >= 4){
                for(let j = 0;j < 5;j++){
                    lastFiveSum += dataSolves.solves[i - j].time
                }
                ao5s.push((lastFiveSum / 5).toFixed(3))
            }else{continue}
        }
        worstAo5s.innerHTML = ao5s[0]
        for (let i = 0; i < ao5s.length;i++){
            if ((+ao5s[i]) > +worstAo5s.innerHTML){
                worstAo5s.innerHTML = ao5s[i]
            }
        }
    })
    // ---------------
    // Получение худшей ao12
    fetch("http://127.0.0.1:8002/newSolve")
    .then(res => res.json())
    .then(dataSolves => {
        let ao12s = []
        let lastFiveSum = 0
        for (let i = 0;i < dataSolves.solves.length;i++){
            lastFiveSum = 0
            if (i >= 11){
                for(let j = 0;j < 12;j++){
                    lastFiveSum += dataSolves.solves[i - j].time
                }
                ao12s.push((lastFiveSum / 5).toFixed(3))
            }else{continue}
        }
        worstAo12s.innerHTML = ao12s[0]
        for (let i = 0; i < ao12s.length;i++){
            if ((+ao12s[i]) > +worstAo12s.innerHTML){
                worstAo12s.innerHTML = ao12s[i]
            }
        }
    })
    // ---------------

    worstSolves.append(worstEmptyTd)
    worstSolves.append(worstSingles)
    worstSolves.append(worstAo5s)
    worstSolves.append(worstAo12s)

    tableStatistic.append(worstSolves)

    panelDiv.append(tableStatistic)
}

showStatistic()
document.querySelector('.solves-panel').before(panelDiv)