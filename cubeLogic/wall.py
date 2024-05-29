class Wall:
    def __init__(self, color: str) -> None:
        self.color = color
        self.wall = [
        [color,color,color],
        [color,color,color],
        [color,color,color],
        ]