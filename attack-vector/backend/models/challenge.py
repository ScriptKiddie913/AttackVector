from sqlalchemy import Column, Integer, String, Text, ForeignKey, Boolean, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from database import Base

class Challenge(Base):
    __tablename__ = "challenges"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    category_id = Column(Integer, ForeignKey("categories.id"))
    difficulty = Column(String(20), nullable=False)  # easy, medium, hard, insane
    flag = Column(String(255), nullable=False)
    points = Column(Integer, nullable=False)
    is_active = Column(Boolean, default=True)
    is_storyline = Column(Boolean, default=False)
    storyline_order = Column(Integer, nullable=True)
    storyline_parent_id = Column(Integer, ForeignKey("challenges.id"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    category = relationship("Category")
    storyline_parent = relationship("Challenge", remote_side=[id])
    submissions = relationship("Submission", back_populates="challenge")