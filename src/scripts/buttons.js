let settingsButton = document.getElementById('main-settings')
let divMain = document.querySelector('.main')

function settingsButtonMouseOver(event){
    settingsButton.innerHTML = `НАСТ-\nРОЙКИ`
}
function settingsButtonMouseOut(event){
    settingsButton.innerHTML = `<img src="/src/assets/img/settings.png">`
}

function hideWindowSettings(){
    document.querySelector('.settings-window').remove()
}

function openSettings(){
    if (document.querySelector('.settings-window') !== null){
        return 0
    }
    let settingsWindow = document.createElement('div')// Создаем div
    settingsWindow.innerHTML = ''
    settingsWindow.classList.add('settings-window')

    // -------------------------------------------
    // Создание и настройка окна
    // -------------------------------------------


    // -------------------------------------------
    // Создание заголовка окна

    let windowTitle = document.createElement('div')// Создаем заголовок
    windowTitle.innerHTML = ' '
    windowTitle.classList.add('window-title')

    windowTitle.innerHTML += `<img src="/src/assets/img/settings.png">`// Создаем иконку

    let title = document.createElement('span')// Создание оглавления
    title.innerHTML = 'НАСТРОЙКИ'
    windowTitle.append(title)

    let hideButton = document.createElement('button')// Создание кнопки скрытия
    hideButton.addEventListener('click', hideWindowSettings)
    hideButton.innerHTML += `<img src="/src/assets/img/hidebutton.png">`
    windowTitle.append(hideButton)

    // -------------------------------------------
    // Создание настроек

    settings = document.createElement('div')
    settings.classList.add('settings')

    let choiceBCTimerContainer = document.createElement('div')// Создание контейнера с input-ом и span-ом
    
    let textBCTimer = document.createElement('span')// Создание текста
    textBCTimer.classList.add('text-settings')
    textBCTimer.innerHTML = 'Цвет заднего фона таймера: '
    choiceBCTimerContainer.append(textBCTimer)

    choiceBCTimerContainer.innerHTML += `<input type="color" id="choiceBCTimer">`// Создание выбора цвета заднего фона таймера

    //-----------------------------------------

    let choiceBCControlContainer = document.createElement('div')// Создание контейнера с input-ом и span-ом

    let textBCControl = document.createElement('span')// Создание текста
    textBCControl.classList.add('text-settings')
    textBCControl.innerHTML = 'Цвет заднего фона контрольной панели: '
    choiceBCControlContainer.append(textBCControl)

    choiceBCControlContainer.innerHTML += `<input type="color" id="choiceBCControl">`// Создание выбора цвета заднего фона контрольной панели

    //-----------------------------------------

    let choiceBCScrumbleContainer = document.createElement('div')// Создание контейнера с input-ом и span-ом

    let textBCScrumble = document.createElement('span')// Создание текста
    textBCScrumble.classList.add('text-settings')
    textBCScrumble.innerHTML = 'Цвет заднего фона скрамбла: '
    choiceBCScrumbleContainer.append(textBCScrumble)

    choiceBCScrumbleContainer.innerHTML += `<input type="color" id="choiceBCScrumble">`// Создание выбора цвета заднего фона скрамбла

    // -------------------------------------------
    // Добавление всех настроек
    // -------------------------------------------

    settings.append(choiceBCTimerContainer)
    settings.append(choiceBCControlContainer)
    settings.append(choiceBCScrumbleContainer)

    // -------------------------------------------
    // Добавления окна в Html
    // -------------------------------------------
    windowTitle.append(settings)
    settingsWindow.append(windowTitle)
    divMain.after(settingsWindow)

    // -------------------------------------------
    // Настройка для того что бы все работало
    // -------------------------------------------

    function changeBCTimer(event){
        document.querySelector('.timer-container').style.backgroundColor = event.target.value
    }
    function changeBCControl(event){
        document.querySelector('.control-panel').style.backgroundColor = event.target.value
    }
    function changeBCScrumble(event){
        document.querySelector('.scramble-panel').style.backgroundColor = event.target.value
    }

    let choiceInputTimerBC = document.getElementById('choiceBCTimer')
    let choiceInputControlBC = document.getElementById('choiceBCControl')
    let choiceInputScrumbleBC = document.getElementById('choiceBCScrumble')

    choiceInputTimerBC.addEventListener('input', changeBCTimer)
    choiceInputControlBC.addEventListener('input', changeBCControl)
    choiceInputScrumbleBC.addEventListener('input', changeBCScrumble)
}


settingsButton.addEventListener('mouseover',settingsButtonMouseOver)
settingsButton.addEventListener('mouseout',settingsButtonMouseOut)
settingsButton.addEventListener('click',openSettings);