from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from . import crud, schemas, database

router = APIRouter(prefix="/todos", tags=["Todos"])

@router.get("/", response_model=List[schemas.TodoResponse])
async def read_todos(db: AsyncSession = Depends(database.get_db)):
    return await crud.get_todos(db)

@router.post("/", response_model=schemas.TodoResponse, status_code=status.HTTP_201_CREATED)
async def create_todo(todo: schemas.TodoCreate, db: AsyncSession = Depends(database.get_db)):
    return await crud.create_todo(db, todo)

@router.patch("/{todo_id}/status", response_model=schemas.TodoResponse)
async def update_status(todo_id: int, status: bool, db: AsyncSession = Depends(database.get_db)):
    updated_todo = await crud.update_todo_status(db, todo_id, status)
    if not updated_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return updated_todo
@router.delete("/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_todo(todo_id: int, db: AsyncSession = Depends(database.get_db)):
    deleted_todo = await crud.delete_todo(db, todo_id)
    if not deleted_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return None