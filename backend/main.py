from datetime import datetime, timedelta
from collections import defaultdict


from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from newsapi import NewsApiClient
from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline


origins = [
    'http://127.0.0.1:3000',
    'http://localhost:3000',
]


app = FastAPI()

news_api = NewsApiClient(api_key='<API KEY>')

tokenizer = AutoTokenizer.from_pretrained('warwickai/fin-perceiver')
model = AutoModelForSequenceClassification.from_pretrained('warwickai/fin-perceiver')
sentiment_pipeline = pipeline('text-classification', model=model, tokenizer=tokenizer)


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.get('/api/search/{entity}')
async def search(entity):
    return generate_entity_report(entity, tokenizer, model)


def generate_entity_report(entity, tokenizer, model):
    current_datetime = datetime.now()
    from_datetime = current_datetime - timedelta(days=7)

    news_api_response = news_api.get_everything(
        q=entity,
        from_param=current_datetime,
        to=from_datetime,
        page_size=50
    )

    articles = news_api_response['articles']

    search_result = {
        'entity': entity,
        'total': {
            'positive': 0,
            'neutral': 0,
            'negative': 0
        },
        'range': [
            from_datetime.strftime('%d-%m-%Y'),
            current_datetime.strftime('%d-%m-%Y')
        ]
    }

    if len(articles) == 0:
        return search_result

    classified_articles = sentiment_pipeline(list(map(prepare_article, articles)))

    article_sentiment_count = {
        'positive': defaultdict(int),
        'neutral': defaultdict(int),
        'negative': defaultdict(int)
    }

    for article, classified_article in zip(articles, classified_articles):
        label = classified_article['label']
        day = article['publishedAt'][:10]

        search_result['total'][label] += 1
        article_sentiment_count[label][day] += 1

    search_result['history'] = {
        sentiment: {
            'days': list(counts.keys()),
            'counts': list(counts.values())
        }
        for sentiment, counts in article_sentiment_count.items()
    }

    return search_result


def prepare_article(article):
    return f'{article["title"]}. {article["description"]}'
