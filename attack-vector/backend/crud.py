from sqlalchemy.orm import Session
from passlib.context import CryptContext
from typing import List, Optional
import models
import schemas

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

# User CRUD operations
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(
        username=user.username,
        email=user.email,
        password_hash=get_password_hash(user.password)
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # Create initial score entry
    db_score = models.Score(user_id=db_user.id)
    db.add(db_score)
    db.commit()
    
    return db_user

# Category CRUD operations
def get_category(db: Session, category_id: int):
    return db.query(models.Category).filter(models.Category.id == category_id).first()

def get_categories(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Category).offset(skip).limit(limit).all()

def create_category(db: Session, category: schemas.CategoryCreate):
    db_category = models.Category(**category.dict())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

# Challenge CRUD operations
def get_challenge(db: Session, challenge_id: int):
    return db.query(models.Challenge).filter(models.Challenge.id == challenge_id).first()

def get_challenges(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Challenge).offset(skip).limit(limit).all()

def create_challenge(db: Session, challenge: schemas.ChallengeCreate):
    db_challenge = models.Challenge(
        title=challenge.title,
        description=challenge.description,
        category_id=challenge.category_id,
        difficulty=challenge.difficulty,
        flag=challenge.flag,
        points=challenge.points,
        is_active=challenge.is_active,
        is_storyline=challenge.is_storyline,
        storyline_order=challenge.storyline_order,
        storyline_parent_id=challenge.storyline_parent_id
    )
    db.add(db_challenge)
    db.commit()
    db.refresh(db_challenge)
    return db_challenge

# Submission CRUD operations
def get_submission(db: Session, submission_id: int):
    return db.query(models.Submission).filter(models.Submission.id == submission_id).first()

def get_submissions(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Submission).offset(skip).limit(limit).all()

def create_submission(db: Session, submission: schemas.SubmissionCreate):
    db_submission = models.Submission(**submission.dict())
    db.add(db_submission)
    db.commit()
    db.refresh(db_submission)
    return db_submission

def get_user_challenge_submission(db: Session, user_id: int, challenge_id: int):
    return db.query(models.Submission).filter(
        models.Submission.user_id == user_id,
        models.Submission.challenge_id == challenge_id,
        models.Submission.is_correct == True
    ).first()

# Score CRUD operations
def get_score(db: Session, score_id: int):
    return db.query(models.Score).filter(models.Score.id == score_id).first()

def get_scores(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Score).order_by(models.Score.total_score.desc()).offset(skip).limit(limit).all()

def get_user_score(db: Session, user_id: int):
    return db.query(models.Score).filter(models.Score.user_id == user_id).first()

def update_user_score(db: Session, user_id: int, points: int):
    db_score = get_user_score(db, user_id)
    if db_score:
        db_score.total_score += points
        db_score.last_solved = models.func.now()
        db.commit()
        db.refresh(db_score)
    return db_score