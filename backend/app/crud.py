from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from . import models, schemas

async def get_todos(db: AsyncSession):
    result = await db.execute(select(models.TodoItem).order_by(models.TodoItem.id.desc()))
    return result.scalars().all()

async def create_todo(db: AsyncSession, todo: schemas.TodoCreate):
    db_todo = models.TodoItem(**todo.model_dump())
    db.add(db_todo)
    await db.commit()
    await db.refresh(db_todo)
    return db_todo

async def update_todo_status(db: AsyncSession, todo_id: int, is_completed: bool):
    result = await db.execute(select(models.TodoItem).where(models.TodoItem.id == todo_id))
    db_todo = result.scalar_one_or_none()
    
    if db_todo:
        db_todo.is_completed = is_completed
        await db.commit()
        await db.refresh(db_todo)
    return db_todo
async def delete_todo(db: AsyncSession, todo_id: int):
    result = await db.execute(select(models.TodoItem).where(models.TodoItem.id == todo_id))
    db_todo = result.scalar_one_or_none()
    
    if db_todo:
        await db.delete(db_todo)
        await db.commit()
    return db_todo