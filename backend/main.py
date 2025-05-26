import os
from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel
from db import users_collection  # Your MongoDB collection
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from jose import JWTError, jwt  # For JWT encoding/decoding
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta
from typing import Optional
from fastapi import Path
import uuid




load_dotenv()

app = FastAPI()

origins = os.getenv("ALLOWED_ORIGINS", "").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# JWT settings
SECRET_KEY = os.getenv("SECRET_KEY", "your_secret_key")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

class DepositRequest(BaseModel):
    bank: str
    amount: float
    firstName: str
    lastName: str
    email: str
    phone: str
    message: Optional[str] = None

class LoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = await users_collection.find_one({"email": email})
    if user is None:
        raise credentials_exception
    return user

@app.post("/api/auth/login", response_model=TokenResponse)
async def login(request: LoginRequest):
    user = await users_collection.find_one({
        "email": request.username,
        "password": request.password
    })

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["email"]},
        expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/api/me")
async def get_current_user_data(user=Depends(get_current_user)):
    return {
        "name": user["name"],
        "email": user["email"],
        "balance": user.get("balance", 0),
        "transactions": user.get("transactions", [])
    }


@app.post("/api/deposits")
async def submit_deposit(
    deposit: DepositRequest,
    user=Depends(get_current_user)
):
    deposit_data = deposit.dict()
    deposit_data["timestamp"] = datetime.utcnow()
    deposit_data["id"] = str(uuid.uuid4())  # Unique ID for the deposit

    print(f"User email: {user['email']}")
    print(f"Deposit data: {deposit_data}")

    try:
        result = await users_collection.update_one(
            {"email": user["email"]},
            {"$push": {"deposit_requests": deposit_data}}
        )
        print("Update result:", result.raw_result)
    except Exception as e:
        print("Exception:", e)
        raise HTTPException(status_code=500, detail="Database error: " + str(e))

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")

    if result.modified_count == 0:
        raise HTTPException(status_code=500, detail="Failed to save deposit request")

    return {"message": "Deposit request submitted successfully", "deposit": deposit_data}


@app.get("/api/deposits/{deposit_id}")
async def get_deposit_by_id(deposit_id: str = Path(...), user=Depends(get_current_user)):
    deposits = user.get("deposit_requests") or []
    for deposit in deposits:
        if deposit.get("id") == deposit_id:
            return {"deposit": deposit}
    raise HTTPException(status_code=404, detail="Deposit request not found")
