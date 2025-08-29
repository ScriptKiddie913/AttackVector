from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ScoreBase(BaseModel):
    user_id: int
    total_score: int = 0

class ScoreCreate(ScoreBase):
    pass

class Score(ScoreBase):
    id: int
    last_solved: Optional[datetime] = None
    updated_at: datetime

    class Config:
        orm_mode = True