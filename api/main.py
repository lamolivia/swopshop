import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

#origins = [
#    "http://localhost",
#    "http://localhost:8000",
#    "http://localhost:8080",
#    "http://localhost:8081",
#	"http://localhost:19001"
#]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/test")
async def Test():
	return "testing value"