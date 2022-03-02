from time import sleep
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

origins = [
    'http://127.0.0.1:3000',
    'http://localhost:3000',
]


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.get('/api/search/{entity}')
async def search(entity):
    return {
        'entity': entity,
        'report': {
            'outlook': 'Positive',
            'positiveCount': 500,
            'neutralCount': 200,
            'negativeCount': 100
        }
    }
