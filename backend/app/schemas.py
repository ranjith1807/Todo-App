from pydantic import BaseModel, ConfigDict

class TodoBase(BaseModel):
    title: str
    description: str | None = None
    is_completed: bool = False

class TodoCreate(TodoBase):
    pass

class TodoUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    is_completed: bool | None = None

class TodoResponse(TodoBase):
    id: int
    model_config = ConfigDict(from_attributes=True)