let settingsButton = document.getElementById('main-settings')
let divMain = document.querySelector('.main')

if (localStorage.getItem('windowTitleBC') === null){
    localStorage.setItem('windowTitleBC', '#fca2f3ff')
    console.log('test')
}
if (localStorage.getItem('windowBC') === null){
    localStorage.setItem('windowBC', '#fca2f3ff')
    console.log('test')
}

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
    if (document.querySelector('.autors-window') !== null || document.querySelector('.settings-window') !== null){
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
    windowTitle.style.background = localStorage.getItem('windowTitleBC')

    let hideButton = document.createElement('button')// Создание кнопки скрытия
    hideButton.addEventListener('click', hideWindowSettings)
    hideButton.innerHTML += `<img src="/src/assets/img/hidebutton.png">`
    windowTitle.append(hideButton)

    // -------------------------------------------
    // Создание настроек

    let settings = document.createElement('div')
    settings.classList.add('settings')
    settings.style.backgroundColor = localStorage.getItem('windowBC');

    // -------------------------------------------
    // Добавления окна в Html
    // -------------------------------------------

    windowTitle.append(settings)
    settingsWindow.append(windowTitle)
    divMain.after(settingsWindow)

    // ------------------------------------------------------------------------------------------
    // Функция добавляющая возможность смены цвета

    function changeC(event){
        document.getElementById(event.target.id).whatDo(event)
    }

    //
    // ------------------------------------------------------------------------------------------

    // ------------------------------------------------------------------------------------------
    // Функция позволяющия оптимизоровать код, создает новые элементы смены цвета

    function createChoiceOfColor(BCWhat, Text, changeColor, linkedValue, hex = false){
        let choiceBCContainer = document.createElement('div')// Создание контейнера с input-ом и span-ом
    
        let textBC = document.createElement('span')// Создание текста
        textBC.classList.add('text-settings')
        textBC.innerHTML = Text
        choiceBCContainer.append(textBC)// Добавление текста

        choiceBCContainer.innerHTML += `<input type="color" id="choiceB${BCWhat}">`// Создание выбора цвета

        settings.append(choiceBCContainer)// Добавление выбора цвета

        let choiceInput = document.getElementById(`choiceB${BCWhat}`)// Получаем элемент
        choiceInput.whatDo = changeColor// Функция смены цвета


        if (hex){// Если передан цвет в hex формате
            choiceInput.value = linkedValue
        }else{// Если в rgb
            // ОСТОРОЖНО!!! СМОТРЯ НА ЭТОТ СЛЕДУЙЩИЙ КОД ВЫ МОЖЕТЕ УПАСТЬ В ОБМОРОК, И БОЛЬШЕ НЕ ВСТАТЬ!!!!!!

            rgbColor = linkedValue.slice(3).replace('(','').replace(')','').split(',')// Получаем массив rgb строк

            for (let i = 0;i < 3;i++){ rgbColor[i] = +rgbColor[i] }// Преобразуем его в массив чисел

            // КУЛЬМИНАЦИЯ!!!
            // (любители чистого кода уже умерли)
            choiceInput.value =// Здесь мы преобразуем все числа из массива rgb в hex формат
            ("#" + ((rgbColor[0]).toString(16).length == 1 ? "0" + (rgbColor[0]).toString(16) : (rgbColor[0]).toString(16))// Сначала red
            + ((rgbColor[1]).toString(16).length == 1 ? "0" + (rgbColor[1]).toString(16) : (rgbColor[1]).toString(16))// Потом green
            + ((rgbColor[2]).toString(16).length == 1 ? "0" + (rgbColor[2]).toString(16) : (rgbColor[2]).toString(16)));// И наканец это все кончилось

            // ЭТОТ АДСКИЙ КОД ЗАКОНЧИЛСЯ
        }

        choiceInput.addEventListener('input', changeC)// Слушаем изменение цвета
    }

    //
    // ------------------------------------------------------------------------------------------

    createChoiceOfColor('TimerColor','Цвет цифр таймера: ', event => {
        document.querySelector('.timer-pad').style.color = event.target.value;
    }, getComputedStyle(document.querySelector('.timer-pad')).color)

    createChoiceOfColor('Timer','Цвет заднего фона таймера: ', event => {
        document.querySelector('.timer-container').style.backgroundColor = event.target.value;
    }, getComputedStyle(document.querySelector('.timer-container')).backgroundColor)

    createChoiceOfColor('Control','Цвет заднего фона контрольной панели: ', event => {
        document.querySelector('.control-panel').style.backgroundColor = event.target.value;
        
    }, getComputedStyle(document.querySelector('.control-panel')).backgroundColor)
    
    createChoiceOfColor('Scramble','Цвет заднего фона скрамбла: ', event => {
        document.querySelector('.scramble-panel').style.backgroundColor = event.target.value;
        
    }, getComputedStyle(document.querySelector('.scramble-panel')).backgroundColor)

    createChoiceOfColor('Buttons','Цвет кнопок: ', event => {
        buttons = document.querySelectorAll('.settings-button');
        for (let i = 0;i < 6;i++){
            buttons[i].style.backgroundColor = event.target.value;
        }
    }, getComputedStyle(document.querySelector('.settings-button')).backgroundColor)

    createChoiceOfColor('Settings','Цвет заднего фона окна: ', event => {
        document.querySelector('.settings').style.backgroundColor = event.target.value;
        localStorage.setItem('windowBC', event.target.value)
    }, localStorage.getItem('windowBC'), true)

    createChoiceOfColor('WindowTitle','Цвет заднего фона заголовка: ', event => {
        document.querySelector('.window-title').style.backgroundColor = event.target.value;
        localStorage.setItem('windowTitleBC', event.target.value)
    }, localStorage.getItem('windowTitleBC'), true)

    createChoiceOfColor('Text','Цвет текста: ', event => {
        document.querySelector('body').style.color = event.target.value;
    }, getComputedStyle(document.querySelector('body')).color)
}


settingsButton.addEventListener('mouseover',settingsButtonMouseOver)
settingsButton.addEventListener('mouseout',settingsButtonMouseOut)
settingsButton.addEventListener('click',openSettings);