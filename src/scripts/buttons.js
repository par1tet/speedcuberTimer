settingsButton = document.getElementById('main-settings')
divMain = document.querySelector('.main')

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
    settingsWindow = document.createElement('div')// Создаем div
    settingsWindow.innerHTML = ''
    settingsWindow.classList.add('settings-window')


    windowTitle = document.createElement('div')// Создаем заголовок
    windowTitle.innerHTML = ' '
    windowTitle.classList.add('window-title')

    windowTitle.innerHTML += `<img src="/src/assets/img/settings.png">`// Создаем иконку

    title = document.createElement('span')// Создание оглавления
    title.innerHTML = 'НАСТРОЙКИ'
    windowTitle.append(title)

    hideButton = document.createElement('button')// Создание кнопки
    hideButton.addEventListener('click', hideWindowSettings)
    hideButton.innerHTML += `<img src="/src/assets/img/hidebutton.png">`
    windowTitle.append(hideButton)


    settingsWindow.append(windowTitle)

    divMain.after(settingsWindow)
}


settingsButton.addEventListener('mouseover',settingsButtonMouseOver)
settingsButton.addEventListener('mouseout',settingsButtonMouseOut)
settingsButton.addEventListener('click',openSettings)