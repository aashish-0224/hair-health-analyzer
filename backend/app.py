from fastapi import FastAPI, File, UploadFile, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel

import cv2
import numpy as np
import base64

from database import engine, SessionLocal
import models


models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def home():
    return {"message": "Hair Health Analyzer API is running"}


class LoginRequest(BaseModel):
    username: str
    password: str


@app.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):

    user = db.query(models.User).filter(
        models.User.username == data.username,
        models.User.password == data.password,
    ).first()

    if user:
        return {"status": "success"}
    else:
        return {"status": "failed"}


@app.post("/analyze")
async def analyze(image: UploadFile = File(...)):

    contents = await image.read()

    npimg = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray, 100, 200)

    hair_density = int(edges.sum())

    _, buffer = cv2.imencode(".jpg", edges)
    edges_base64 = base64.b64encode(buffer).decode()

    if hair_density < 200000:
        health = "Weak Hair"
        hairfall_level = "High"
        recommendation = "Increase protein intake and apply coconut oil twice a week."

    elif hair_density < 400000:
        health = "Moderate Hair"
        hairfall_level = "Medium"
        recommendation = "Maintain balanced diet and avoid excessive heat styling."

    else:
        health = "Healthy Hair"
        hairfall_level = "Low"
        recommendation = "Your hair health is good. Maintain current routine."

    return {
        "hair_density_score": hair_density,
        "hair_health": health,
        "hairfall_level": hairfall_level,
        "recommendation": recommendation,
        "edges_image": edges_base64
    }