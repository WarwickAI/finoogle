export interface SearchResult {
    entity: string;
    range: string[];
    total: SentimentsCount;
    history: SentimentsCountHistory;
}

export interface SentimentCountHistory {
    days: string[];
    counts: number[];
}

export interface SentimentsCountHistory {
    positive: SentimentCountHistory;
    neutral: SentimentCountHistory;
    negative: SentimentCountHistory;
}

export interface SentimentsCount {
    positive: number;
    neutral: number;
    negative: number;
}

export const searchEntity = async (entity: string) => fetch(`http://localhost:8000/api/search/${entity}`)