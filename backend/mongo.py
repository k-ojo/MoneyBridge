import asyncio
from db import users_collection

sample_users = [
    {
        "name": "Juliet",
        "email": "julie68696@mb.com",
        "password": "Ecobrunson47$",
        "balance": 9200.00,
        "transactions": [
            {
                "id": 1,
                "type": "deposit",
                "amount": 170000.00,
                "date": "2025-01-16",
                "description": "To Juliet",
                "status": "completed"
            },
            {
                "id": 2,
                "type": "deposit",
                "amount": 400000.00,
                "date": "2025-05-15",
                "description": "To Juliet",
                "status": "completed"
            },
            {
                "id": 3,
                "type": "deposit",
                "amount": 400000.00,
                "date": "2025-05-10",
                "description": "To Juliet",
                "status": "completed"
            }
        ]
    },

    
    {
        "name": "Florence",
        "email": "florence@mb.com",
        "password": "Ecobrunson47$",
        "balance": 9200.00,
        "transactions": [
            {
                "id": 1,
                "type": "deposit",
                "amount": 170000.00,
                "date": "2025-01-16",
                "description": "To Florence",
                "status": "completed"
            },
            {
                "id": 2,
                "type": "deposit",
                "amount": 400000.00,
                "date": "2025-05-15",
                "description": "To Florence",
                "status": "completed"
            },
            {
                "id": 3,
                "type": "deposit",
                "amount": 400000.00,
                "date": "2025-05-10",
                "description": "To Florence",
                "status": "completed"
            }
        ]
    }
]

async def seed():
    await users_collection.delete_many({})
    await users_collection.insert_many(sample_users)
    print("Seeded!")

asyncio.run(seed())