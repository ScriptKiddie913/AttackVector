from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import models
import schemas
import crud
import auth
from database import SessionLocal, engine
from fastapi.security import OAuth2PasswordRequestForm

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Attack Vector CTF Platform", description="A CTF platform for cybersecurity challenges", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Authentication endpoints
@app.post("/api/auth/register", response_model=schemas.User)
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)

@app.post("/api/auth/login", response_model=schemas.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = auth.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

# User endpoints
@app.get("/api/users/profile", response_model=schemas.User)
def read_users_me(current_user: models.User = Depends(auth.get_current_user)):
    return current_user

@app.get("/api/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_admin_user)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# Challenge endpoints
@app.get("/api/challenges/", response_model=List[schemas.Challenge])
def read_challenges(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    challenges = crud.get_challenges(db, skip=skip, limit=limit)
    return challenges

@app.get("/api/challenges/{challenge_id}", response_model=schemas.Challenge)
def read_challenge(challenge_id: int, db: Session = Depends(get_db)):
    db_challenge = crud.get_challenge(db, challenge_id=challenge_id)
    if db_challenge is None:
        raise HTTPException(status_code=404, detail="Challenge not found")
    return db_challenge

@app.post("/api/challenges/", response_model=schemas.Challenge)
def create_challenge(challenge: schemas.ChallengeCreate, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_admin_user)):
    return crud.create_challenge(db=db, challenge=challenge)

@app.put("/api/challenges/{challenge_id}", response_model=schemas.Challenge)
def update_challenge(challenge_id: int, challenge: schemas.ChallengeCreate, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_admin_user)):
    db_challenge = crud.get_challenge(db, challenge_id=challenge_id)
    if db_challenge is None:
        raise HTTPException(status_code=404, detail="Challenge not found")
    for key, value in challenge.dict().items():
        setattr(db_challenge, key, value)
    db.commit()
    db.refresh(db_challenge)
    return db_challenge

@app.delete("/api/challenges/{challenge_id}")
def delete_challenge(challenge_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_admin_user)):
    db_challenge = crud.get_challenge(db, challenge_id=challenge_id)
    if db_challenge is None:
        raise HTTPException(status_code=404, detail="Challenge not found")
    db.delete(db_challenge)
    db.commit()
    return {"detail": "Challenge deleted"}

@app.post("/api/challenges/{challenge_id}/submit")
def submit_flag(challenge_id: int, submission: schemas.ChallengeSubmission, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    # Check if challenge exists
    db_challenge = crud.get_challenge(db, challenge_id=challenge_id)
    if db_challenge is None:
        raise HTTPException(status_code=404, detail="Challenge not found")
    
    # Check if user already solved this challenge
    existing_submission = crud.get_user_challenge_submission(db, user_id=current_user.id, challenge_id=challenge_id)
    if existing_submission:
        raise HTTPException(status_code=400, detail="Challenge already solved")
    
    # Check if flag is correct
    is_correct = submission.flag == db_challenge.flag
    
    # Create submission record
    db_submission = crud.create_submission(db, schemas.SubmissionCreate(
        user_id=current_user.id,
        challenge_id=challenge_id,
        flag_submitted=submission.flag,
        is_correct=is_correct
    ))
    
    # If correct, update user score
    if is_correct:
        crud.update_user_score(db, current_user.id, db_challenge.points)
        return {"detail": "Correct flag! Points awarded."}
    else:
        return {"detail": "Incorrect flag. Try again."}

# Category endpoints
@app.get("/api/categories/", response_model=List[schemas.Category])
def read_categories(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    categories = crud.get_categories(db, skip=skip, limit=limit)
    return categories

@app.post("/api/categories/", response_model=schemas.Category)
def create_category(category: schemas.CategoryCreate, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_admin_user)):
    return crud.create_category(db=db, category=category)

# Scoreboard endpoints
@app.get("/api/scoreboard/", response_model=List[schemas.Score])
def read_scoreboard(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    scores = crud.get_scores(db, skip=skip, limit=limit)
    return scores

# Health check endpoint
@app.get("/api/health")
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)