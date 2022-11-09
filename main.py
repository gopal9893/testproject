from fastapi import FastAPI

app=FastAPI()

@app.get("/")
def getUser():
    user = {"Hello : world"}
    return user

