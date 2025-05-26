import asyncio
from db import users_collection

sample_users = [
    {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "password123",
        "balance": 9200.00,
        "transactions": [
            {
                "id": 1,
                "type": "deposit",
                "amount": 5000.00,
                "date": "2024-01-20",
                "description": "Bank Transfer from Chase",
                "status": "completed"
            },
            {
                "id": 2,
                "type": "transfer",
                "amount": -2500.00,
                "date": "2024-01-19",
                "description": "To Sarah Johnson - Germany",
                "status": "completed"
            }
        ]
    },
    {
        "name": "Alice Smith",
        "email": "alice@example.com",
        "password": "alicepass",
        "balance": 0.00,
        "transactions": []
    }
]

async def seed():
    await users_collection.delete_many({})
    await users_collection.insert_many(sample_users)
    print("Seeded!")

asyncio.run(seed())