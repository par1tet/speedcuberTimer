from fastapi import FastAPI, Body
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from cubeLogic.cubic import Cubic
from database import async_main
from requests_db import add_solv, get_solves
import os
import random
import json
import asyncio

app = FastAPI()

@app.get("/")
def main():
    return FileResponse("index.html")

@app.post("/scrumble")
async def post_test(data = Body()):
    if data['codepost'] == 1:
        # Создание рандомнового скрамбла
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
        # Создание кубика со скрамблом
        cub = Cubic()
        cub.Scrumble(newscr)
        with open('cube.json', 'r') as cubeData:
            data = json.load(cubeData)
        with open('cube.json', 'w') as cubeData:
            data["cubeMap"] = cub.getCubMap()
            json.dump(data,cubeData,indent=2,ensure_ascii=False)
    return JSONResponse(content=data)

@app.get("/scrumble")
async def get_user():
    with open('cube.json', 'r') as usersData:
        return JSONResponse(content=json.load(usersData))
    
@app.post("/newSolve")
async def new_solve(data = Body()):
    if isinstance(data['scrumble'], str):
        await add_solv(data['time'], data['scrumble'])
    return JSONResponse({'solves': await get_solves()})

@app.get("/newSolve")
async def return_solve():
    return JSONResponse({'solves': await get_solves()})


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

@app.get("/src/scripts/buttonAutors.js")
def js_button_settings():
    return FileResponse("src/scripts/buttonAutors.js")

@app.get("/src/scripts/solvesPanelSettings.js")
def js_button_settings():
    return FileResponse("src/scripts/solvesPanelSettings.js")

@app.get("/src/assets/img/autors.png")
def js_button_settings():
    return FileResponse("src/assets/img/autors.png")

@app.get("/src/assets/img/hidebutton.png")
def js_button_settings():
    return FileResponse("src/assets/img/hidebutton.png")

@app.get("/src/assets/img/settings.png")
def js_button_settings():
    return FileResponse("src/assets/img/settings.png")

if __name__ == '__main__':
    asyncio.run(async_main())
    with open('cube.json', 'w') as cubeData:
        data = {}
        data["cubeMap"] = []
        data["scrumble"] = ''
        json.dump(data,cubeData,indent=2,ensure_ascii=False)
    os.system(f"uvicorn main:app --port {8002} --reload")
    