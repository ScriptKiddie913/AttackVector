from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class SubmissionBase(BaseModel):
    user_id: int
    challenge_id: int
    flag_submitted: str
    is_correct: bool

class SubmissionCreate(SubmissionBase):
    pass

class Submission(SubmissionBase):
    id: int
    submitted_at: datetime

    class Config:
        orm_mode = True