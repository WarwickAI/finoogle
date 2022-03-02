export interface SearchResult {
    entity: string;
    report: EntityReport;
}
  
export interface EntityReport {
    outlook: string;
    positiveCount: number;
    neutralCount: number;
    negativeCount: number;
}

export const searchEntity = async (entity: string) => fetch(`http://localhost:8000/api/search/${entity}`)