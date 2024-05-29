from cubeLogic.wall import Wall
import random
class Cubic:
    def __init__(self) -> None:
        colors = ['W','O','G','R','B','Y']
        self.cub = []
        for i in colors:
            self.cub.append(Wall(i))
            
    def getCubMap(self):
        return [
            [' ',' ',' ',self.cub[0].wall[0][0],self.cub[0].wall[0][1],self.cub[0].wall[0][2],' ',' ',' ',' ',' ',' ',],
            [' ',' ',' ',self.cub[0].wall[1][0],self.cub[0].wall[1][1],self.cub[0].wall[1][2],' ',' ',' ',' ',' ',' ',],
            [' ',' ',' ',self.cub[0].wall[2][0],self.cub[0].wall[2][1],self.cub[0].wall[2][2],' ',' ',' ',' ',' ',' ',],
            [self.cub[1].wall[0][0],self.cub[1].wall[0][1],self.cub[1].wall[0][2],self.cub[2].wall[0][0],self.cub[2].wall[0][1],self.cub[2].wall[0][2],self.cub[3].wall[0][0],self.cub[3].wall[0][1],self.cub[3].wall[0][2],self.cub[4].wall[0][0],self.cub[4].wall[0][1],self.cub[4].wall[0][2],],
            [self.cub[1].wall[1][0],self.cub[1].wall[1][1],self.cub[1].wall[1][2],self.cub[2].wall[1][0],self.cub[2].wall[1][1],self.cub[2].wall[1][2],self.cub[3].wall[1][0],self.cub[3].wall[1][1],self.cub[3].wall[1][2],self.cub[4].wall[1][0],self.cub[4].wall[1][1],self.cub[4].wall[1][2],],
            [self.cub[1].wall[2][0],self.cub[1].wall[2][1],self.cub[1].wall[2][2],self.cub[2].wall[2][0],self.cub[2].wall[2][1],self.cub[2].wall[2][2],self.cub[3].wall[2][0],self.cub[3].wall[2][1],self.cub[3].wall[2][2],self.cub[4].wall[2][0],self.cub[4].wall[2][1],self.cub[4].wall[2][2],],
            [' ',' ',' ',self.cub[5].wall[0][0],self.cub[5].wall[0][1],self.cub[5].wall[0][2],' ',' ',' ',' ',' ',' ',],
            [' ',' ',' ',self.cub[5].wall[1][0],self.cub[5].wall[1][1],self.cub[5].wall[1][2],' ',' ',' ',' ',' ',' ',],
            [' ',' ',' ',self.cub[5].wall[2][0],self.cub[5].wall[2][1],self.cub[5].wall[2][2],' ',' ',' ',' ',' ',' ',],
        ]
    #Правое движение
    def Right(self):
        temp = [
            self.cub[5].wall[2][2],
            self.cub[5].wall[1][2],
            self.cub[5].wall[0][2],
        ]
        self.cub[5].wall[2][2] = self.cub[4].wall[0][0]
        self.cub[5].wall[1][2] = self.cub[4].wall[1][0]
        self.cub[5].wall[0][2] = self.cub[4].wall[2][0]
        self.cub[4].wall[0][0] = self.cub[0].wall[2][2]
        self.cub[4].wall[1][0] = self.cub[0].wall[1][2]
        self.cub[4].wall[2][0] = self.cub[0].wall[0][2]
        self.cub[0].wall[0][2] = self.cub[2].wall[0][2]
        self.cub[0].wall[1][2] = self.cub[2].wall[1][2]
        self.cub[0].wall[2][2] = self.cub[2].wall[2][2]
        self.cub[2].wall[0][2] = temp[2]
        self.cub[2].wall[1][2] = temp[1]
        self.cub[2].wall[2][2] = temp[0]

        temp = self.cub[3].wall[2][2]
        self.cub[3].wall[2][2] = self.cub[3].wall[0][2]
        self.cub[3].wall[0][2] = self.cub[3].wall[0][0]
        self.cub[3].wall[0][0] = self.cub[3].wall[2][0]
        self.cub[3].wall[2][0] = temp
        
        temp = self.cub[3].wall[2][1]
        self.cub[3].wall[2][1] = self.cub[3].wall[1][2]
        self.cub[3].wall[1][2] = self.cub[3].wall[0][1]
        self.cub[3].wall[0][1] = self.cub[3].wall[1][0]
        self.cub[3].wall[1][0] = temp

    def Right2(self):
        self.Right()
        self.Right()
    def RightSh(self):
        self.Right2()
        self.Right()
    #Верхние движение
    def Up(self):
        temp = self.cub[3].wall[0]
        self.cub[3].wall[0] = self.cub[4].wall[0]
        self.cub[4].wall[0] = self.cub[1].wall[0]
        self.cub[1].wall[0] = self.cub[2].wall[0]
        self.cub[2].wall[0] = temp

        temp = self.cub[0].wall[2][2]
        self.cub[0].wall[2][2] = self.cub[0].wall[0][2]
        self.cub[0].wall[0][2] = self.cub[0].wall[0][0]
        self.cub[0].wall[0][0] = self.cub[0].wall[2][0]
        self.cub[0].wall[2][0] = temp
        
        temp = self.cub[0].wall[2][1]
        self.cub[0].wall[2][1] = self.cub[0].wall[1][2]
        self.cub[0].wall[1][2] = self.cub[0].wall[0][1]
        self.cub[0].wall[0][1] = self.cub[0].wall[1][0]
        self.cub[0].wall[1][0] = temp

    def Up2(self):
        self.Up()
        self.Up()
    def UpSh(self):
        self.Up2()
        self.Up()
    #Фронтовое движение
    def Front(self):
        
        temp = [
            self.cub[0].wall[2][0],
            self.cub[0].wall[2][1],
            self.cub[0].wall[2][2],
        ]
        self.cub[0].wall[2][0] = self.cub[1].wall[2][2]
        self.cub[0].wall[2][1] = self.cub[1].wall[1][2]
        self.cub[0].wall[2][2] = self.cub[1].wall[0][2]
        
        self.cub[1].wall[2][2] = self.cub[5].wall[0][2]
        self.cub[1].wall[1][2] = self.cub[5].wall[0][1]
        self.cub[1].wall[0][2] = self.cub[5].wall[0][0]

        self.cub[5].wall[0][2] = self.cub[3].wall[0][0]
        self.cub[5].wall[0][1] = self.cub[3].wall[1][0]
        self.cub[5].wall[0][0] = self.cub[3].wall[2][0]
        
        self.cub[3].wall[0][0] = temp[0]
        self.cub[3].wall[1][0] = temp[1]
        self.cub[3].wall[2][0] = temp[2]
        
        temp = self.cub[2].wall[2][2]
        self.cub[2].wall[2][2] = self.cub[2].wall[0][2]
        self.cub[2].wall[0][2] = self.cub[2].wall[0][0]
        self.cub[2].wall[0][0] = self.cub[2].wall[2][0]
        self.cub[2].wall[2][0] = temp
        
        temp = self.cub[2].wall[2][1]
        self.cub[2].wall[2][1] = self.cub[2].wall[1][2]
        self.cub[2].wall[1][2] = self.cub[2].wall[0][1]
        self.cub[2].wall[0][1] = self.cub[2].wall[1][0]
        self.cub[2].wall[1][0] = temp
    def Front2(self):
        self.Front()
        self.Front()
    def FrontSh(self):
        self.Front2()
        self.Front()
    #Левой движение
    def Left(self):
        
        temp = [
            self.cub[2].wall[0][0],
            self.cub[2].wall[1][0],
            self.cub[2].wall[2][0],
        ]
        
        self.cub[2].wall[0][0] = self.cub[0].wall[0][0]
        self.cub[2].wall[1][0] = self.cub[0].wall[1][0]
        self.cub[2].wall[2][0] = self.cub[0].wall[2][0]
        
        self.cub[0].wall[0][0] = self.cub[4].wall[2][2]
        self.cub[0].wall[1][0] = self.cub[4].wall[1][2]
        self.cub[0].wall[2][0] = self.cub[4].wall[0][2]
        
        self.cub[4].wall[2][2] = self.cub[5].wall[0][0]
        self.cub[4].wall[1][2] = self.cub[5].wall[1][0]
        self.cub[4].wall[0][2] = self.cub[5].wall[2][0]
        
        self.cub[5].wall[0][0] = temp[0]
        self.cub[5].wall[1][0] = temp[1]
        self.cub[5].wall[2][0] = temp[2]
        
        temp = self.cub[1].wall[2][2]
        self.cub[1].wall[2][2] = self.cub[1].wall[0][2]
        self.cub[1].wall[0][2] = self.cub[1].wall[0][0]
        self.cub[1].wall[0][0] = self.cub[1].wall[2][0]
        self.cub[1].wall[2][0] = temp
        
        temp = self.cub[1].wall[2][1]
        self.cub[1].wall[2][1] = self.cub[1].wall[1][2]
        self.cub[1].wall[1][2] = self.cub[1].wall[0][1]
        self.cub[1].wall[0][1] = self.cub[1].wall[1][0]
        self.cub[1].wall[1][0] = temp
    def Left2(self):
        self.Left()
        self.Left()
    def LeftSh(self):
        self.Left2()
        self.Left()
    #Нижние движение
    def Down(self):
        
        temp = self.cub[2].wall[2]
        
        self.cub[2].wall[2] = self.cub[1].wall[2]
        self.cub[1].wall[2] = self.cub[4].wall[2]
        self.cub[4].wall[2] = self.cub[3].wall[2]

        self.cub[3].wall[2] = temp
        
        temp = self.cub[5].wall[2][2]
        self.cub[5].wall[2][2] = self.cub[5].wall[0][2]
        self.cub[5].wall[0][2] = self.cub[5].wall[0][0]
        self.cub[5].wall[0][0] = self.cub[5].wall[2][0]
        self.cub[5].wall[2][0] = temp
        
        temp = self.cub[5].wall[2][1]
        self.cub[5].wall[2][1] = self.cub[5].wall[1][2]
        self.cub[5].wall[1][2] = self.cub[5].wall[0][1]
        self.cub[5].wall[0][1] = self.cub[5].wall[1][0]
        self.cub[5].wall[1][0] = temp
    def Down2(self):
        self.Down()
        self.Down()
    def DownSh(self):
        self.Down2()
        self.Down()
    #Задние движение
    def BackSh(self):
        
        temp = [
            self.cub[0].wall[0][0],
            self.cub[0].wall[0][1],
            self.cub[0].wall[0][2],
        ]
        
        self.cub[0].wall[0][0] = self.cub[1].wall[2][0]
        self.cub[0].wall[0][1] = self.cub[1].wall[1][0]
        self.cub[0].wall[0][2] = self.cub[1].wall[0][0]
        
        self.cub[1].wall[2][0] = self.cub[5].wall[2][2]
        self.cub[1].wall[1][0] = self.cub[5].wall[2][1]
        self.cub[1].wall[0][0] = self.cub[5].wall[2][0]
        
        self.cub[5].wall[2][2] = self.cub[3].wall[0][2]
        self.cub[5].wall[2][1] = self.cub[3].wall[1][2]
        self.cub[5].wall[2][0] = self.cub[3].wall[2][2]
        
        self.cub[3].wall[0][2] = temp[0]
        self.cub[3].wall[1][2] = temp[1]
        self.cub[3].wall[2][2] = temp[2]
        
        temp = self.cub[4].wall[2][2]
        self.cub[4].wall[2][2] = self.cub[4].wall[2][0]
        self.cub[4].wall[2][0] = self.cub[4].wall[0][0]
        self.cub[4].wall[0][0] = self.cub[4].wall[0][2]
        self.cub[4].wall[0][2] = temp
        
        temp = self.cub[4].wall[2][1]
        self.cub[4].wall[2][1] = self.cub[4].wall[1][0]
        self.cub[4].wall[1][0] = self.cub[4].wall[0][1]
        self.cub[4].wall[0][1] = self.cub[4].wall[1][2]
        self.cub[4].wall[1][2] = temp
        
    def Back2(self):
        self.BackSh()
        self.BackSh()
    def Back(self):
        self.BackSh()
        self.Back2()
        
    def Scrumble(self,scr: str):
        for i in (scr.split(' ')):
            if i == 'R':
                self.Right()
            elif i == "R'":
                self.RightSh()
            elif i == 'R2':
                self.Right2()
                
            elif i == 'L':
                self.Left()
            elif i == "L'":
                self.LeftSh()
            elif i == "L2":
                self.Left2()
                
            elif i == 'U':
                self.Up()
            elif i == "U'":
                self.UpSh()
            elif i == 'U2':
                self.Up2()
                
            elif i == 'D':
                self.Down()
            elif i == "D'":
                self.DownSh()
            elif i == 'D2':
                self.Down2()
                
            elif i == 'F':
                self.Front()
            elif i == "F'":
                self.FrontSh()
            elif i == 'F2':
                self.Front2()
                
            elif i == 'B':
                self.Back()
            elif i == "B'":
                self.BackSh()
            elif i == 'B2':
                self.Back2()
