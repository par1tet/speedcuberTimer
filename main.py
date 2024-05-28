from fastapi import FastAPI, Body
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
import random
import json

app = FastAPI()
users = {
    "name" : 'Alex'
}

@app.post("/scrumble")
async def post_test(data = Body()):
    if data['codepost'] == 1:
        scrumble = ''
        newscr = []
        for i in range(0,random.randint(15,23)):
            randomMove = ('RLUDFB')[random.randrange(0,6)]
            k = 0
            while k < 3:
                k+=1
                if (i - k) < 0:
                    continue
                if scrumble[i-k] == randomMove:
                    randomMove = ('RLUDFB')[random.randrange(0,6)]
                    k = 0
            scrumble += randomMove
            newscr = ''
            for i in scrumble:
                newscr += (i + ([' ', "' ", "2 "])[random.randrange(0,3)])
        
        data = {}
        with open('cube.json', 'r') as cubeData:
            data = json.load(cubeData)
        with open('cube.json', 'w') as cubeData:
            data["scrumble"] = newscr
            json.dump(data, cubeData)
            
    return JSONResponse(content=data)

@app.get("/scrumble")
async def get_user():
    print(123)
    with open('cube.json', 'r') as usersData:
        return JSONResponse(content=json.load(usersData))
    
@app.get("/")
def main():
    return FileResponse("index.html")





# Добавление статических файлов

@app.get("/src/styles/main.css")
def css():
    return FileResponse("src/styles/main.css")

@app.get("/src/scripts/timer.js")
def js_timer():
    return FileResponse("src/scripts/timer.js")

@app.get("/src/scripts/buttonSettings.js")
def js_button_settings():
    return FileResponse("src/scripts/buttonSettings.js")

@app.get("/src/assets/img/hidebutton.png")
def js_button_settings():
    return FileResponse("src/assets/img/hidebutton.png")

@app.get("/src/assets/img/settings.png")
def js_button_settings():
    return FileResponse("src/assets/img/settings.png")