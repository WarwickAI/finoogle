import { Card, Classes } from '@blueprintjs/core';
import { SearchResult, SentimentCountHistory } from '../api/search';

import Plot from 'react-plotly.js';
import { Data } from 'plotly.js';

interface EntitySearchProps {
    searchResult: SearchResult | null;
}

const EntitySearch = ({ searchResult }: EntitySearchProps) => {
    const getClassSkeleton = (className: string) => searchResult == null ? className + ' ' + Classes.SKELETON : className;

    const generatePlot = (name: string, color: string, sentimentHistory: SentimentCountHistory): Data => ({
        type: 'bar',
        name: name,
        x: sentimentHistory.days,
        y: sentimentHistory.counts,
        marker: {
            color: color
        }
    })

    return (
        <div className='entity-card'>
            <h1 className={getClassSkeleton('')}>{searchResult?.entity}</h1>

            <div className={getClassSkeleton('entity-card-row')}>
                <Card interactive={true}>
                    <h2>Positive articles</h2>
                    <p>{searchResult?.total.positive}</p>
                </Card>
                <Card interactive={true}>
                    <h2>Neutral articles</h2>
                    <p>{searchResult?.total.neutral}</p>
                </Card>
                <Card interactive={true}>
                    <h2>Negative articles</h2>
                    <p>{searchResult?.total.negative}</p>
                </Card>
            </div>

          <div className={getClassSkeleton('entity-plot-container')}>
            {searchResult !== null &&
                <Plot
                    data={[
                        generatePlot('Positive', '#0F9960', searchResult.history.positive),
                        generatePlot('Negative', '#DB3737', searchResult.history.negative),
                        generatePlot('Neutral', '#137CBD', searchResult.history.neutral),
                    ]}
                    layout={{
                        title: 'Daily sentiment count over time', 
                        xaxis: {
                            range: searchResult.range,
                            type: 'date'
                        },
                        barmode: 'stack'
                    }}
                    config={{responsive: true}}
                    useResizeHandler={true}
                    className="entity-plot"
                />}
        </div>
        </div>
    )
};

export default EntitySearch;