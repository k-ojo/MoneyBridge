from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.collection import Collection
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URL = os.environ["MONGO_URL"]

client = AsyncIOMotorClient(MONGO_URL)
db = client["moneybridge"]
users_collection: Collection = db["mbusers"]