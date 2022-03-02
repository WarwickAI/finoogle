import { Card, Classes, Pre } from '@blueprintjs/core';
import { ResponsiveLine } from '@nivo/line';
import { SearchResult } from '../api/search';

import { data } from '../data';

interface EntitySearchProps {
    searchResult: SearchResult | null;
}

const EntitySearch = ({ searchResult }: EntitySearchProps) => {

    const getClassSkeleton = (className: string) => searchResult == null ? className + ' ' + Classes.SKELETON : className;

    return (
        <div className='entity-card'>
            <h1 className={getClassSkeleton('')}>{searchResult?.entity}</h1>

            <div className={getClassSkeleton('entity-card-row')}>
                <Card interactive={true}>
                    <h2>Overall outlook</h2>
                    <p>{searchResult?.report.outlook}</p>
                </Card>
                <Card interactive={true}>
                    <h2>Positive articles</h2>
                    <p>{searchResult?.report.positiveCount} (10%)</p>
                </Card>
                <Card interactive={true}>
                    <h2>Neutral articles</h2>
                    <p>{searchResult?.report.neutralCount} (80%)</p>
                </Card>
                <Card interactive={true}>
                    <h2>Negative articles</h2>
                    <p>{searchResult?.report.negativeCount}</p>
                </Card>
            </div>

          <div className={getClassSkeleton('entity-plot')}>
            <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: true,
                    reverse: false
                }}
                yFormat=' >-.2f'
                axisTop={null}
                axisRight={null}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'count',
                    legendOffset: -40,
                    legendPosition: 'middle'
                }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        </div>
        </div>
    )
};

export default EntitySearch;