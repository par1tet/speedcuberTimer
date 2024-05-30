from sqlalchemy import BigInteger, String, ForeignKey
from sqlalchemy.ext.asyncio import create_async_engine, AsyncAttrs, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

engine = create_async_engine(url='sqlite+aiosqlite:///db.sqlite3', echo=True)

async_session = async_sessionmaker(engine)

class Base(DeclarativeBase, AsyncAttrs):
    pass

class Solve(Base):
    __tablename__ = 'solves'
    
    id: Mapped[int] = mapped_column(primary_key=True)
    times: Mapped[float] = mapped_column()
    scrumble: Mapped[str] = mapped_column(String(1000))
    
async def async_main():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)