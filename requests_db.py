from database import async_session, Solve
from sqlalchemy import select, update, delete


async def add_solv(time,scrumble):
    async with async_session() as session:
        session.add(Solve(times = time, scrumble = scrumble))
        await session.commit()
        
async def get_solves():
    async with async_session() as session:
        return [{'time':i.times,'scrumble':i.scrumble} for i in await session.scalars(select(Solve))]