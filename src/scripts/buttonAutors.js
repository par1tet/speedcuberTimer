let autorsButton = document.getElementById('autors')
if (localStorage.getItem('windowTitleBC') === null){
    localStorage.setItem('windowTitleBC', '#fca2f3ff')
    console.log('test')
}
if (localStorage.getItem('windowBC') === null){
    localStorage.setItem('windowBC', '#fca2f3ff')
    console.log('test')
}

function autorsButtonMouseOver(event){
    autorsButton.innerHTML = `АВТО-\nРЫ`
}
function autorsButtonMouseOut(event){
    autorsButton.innerHTML = `<img src="/src/assets/img/autors.png">`
}

function hideWindowAutors(){
    document.querySelector('.autors-window').remove()
}

function openAutors(){
    if (document.querySelector('.autors-window') !== null || document.querySelector('.settings-window') !== null){
        return 0
    }
    let autorsWindow = document.createElement('div')// Создаем div
    autorsWindow.innerHTML = ' '
    autorsWindow.classList.add('autors-window')

    // -------------------------------------------
    // Создание заголовка окна

    let windowTitle = document.createElement('div')// Создаем заголовок
    windowTitle.innerHTML = ' '
    windowTitle.classList.add('window-title')
    

    windowTitle.innerHTML += `<img src="/src/assets/img/autors.png">`// Создаем иконку

    let title = document.createElement('span')// Создание оглавления
    title.innerHTML = 'АВТОРЫ'
    windowTitle.append(title)
    windowTitle.style.background = localStorage.getItem('windowTitleBC')

    let hideButton = document.createElement('button')// Создание кнопки скрытия
    hideButton.addEventListener('click', hideWindowAutors)
    hideButton.innerHTML += `<img src="/src/assets/img/hidebutton.png">`
    windowTitle.append(hideButton)

    // -------------------------------------------
    // Создание списка авторов

    let listAutors = document.createElement('div')
    listAutors.classList.add('autors')
    listAutors.style.backgroundColor = localStorage.getItem('windowBC');

    function createAutor(role, autors){
        let autorsDiv = document.createElement('div')

        let autorsSpan = document.createElement('span')// Текст с авторами
        let roleSpan = document.createElement('span')// Текст с ролью

        // Добаляем классы и текст

        autorsDiv.classList.add('autors-and-roles')

        autorsSpan.classList.add('autors-text')
        autorsSpan.innerHTML = autors

        roleSpan.classList.add('autors-roles')
        roleSpan.innerHTML = role

        // Добавляем все в окно

        autorsDiv.append(roleSpan)
        autorsDiv.append(autorsSpan)

        listAutors.append(autorsDiv)
    }

    createAutor('Генеральный разработчик', 'par1tet')
    createAutor('Продюсер', 'par1tet')
    createAutor('Главный споносор', 'par1tet')
    createAutor('Проект менеджер', 'par1tet')
    createAutor('Художник', 'par1tet')
    createAutor('Техподдержка', 'par1tet')

    autorsWindow.append(windowTitle)
    autorsWindow.append(listAutors)
    divMain.after(autorsWindow)// divMain береться из buttonSettings.js
}


autorsButton.addEventListener('mouseover',autorsButtonMouseOver)
autorsButton.addEventListener('mouseout',autorsButtonMouseOut)
autorsButton.addEventListener('click',openAutors);