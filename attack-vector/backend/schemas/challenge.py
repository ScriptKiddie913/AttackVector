from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ChallengeBase(BaseModel):
    title: str
    description: Optional[str] = None
    category_id: int
    difficulty: str
    points: int
    is_active: bool = True
    is_storyline: bool = False
    storyline_order: Optional[int] = None
    storyline_parent_id: Optional[int] = None

class ChallengeCreate(ChallengeBase):
    flag: str

class Challenge(ChallengeBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

class ChallengeSubmission(BaseModel):
    flag: str