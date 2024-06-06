import {ResponsiveLine} from '@nivo/line'
import React from 'react'
import style from './style.module.css'

export const NetGraph = ({data}) => {
    return (
        <div className={style.container}>
            <h1>Net: ${data.net}</h1>
            <ResponsiveLine
                data={data.seriesData}
                margin={{ top: 10, right: 105, bottom: 90, left: 75 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: false,
                    reverse: false
                }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: -45,
                    legend: 'Date',
                    legendOffset: 70,
                    legendPosition: 'middle',
                    truncateTickAt: 0
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Amount ($)',
                    legendOffset: -40,
                    legendPosition: 'middle',
                    truncateTickAt: 0
                }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabel="data.yFormatted"
                pointLabelYOffset={-12}
                enableTouchCrosshair={true}
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
    )
}

const fakeData = [
    {
      "id": "expense",
      "color": "hsl(278, 70%, 50%)",
      "data": [
        {
          "x": "2024-05-15",
          "y": 41
        },
        {
          "x": "2024-05-16",
          "y": 191
        },
        {
          "x": "2024-05-17",
          "y": 247
        },
        {
          "x": "2024-05-18",
          "y": 93
        },
        {
          "x": "2024-05-19",
          "y": 79
        },
        {
          "x": "2024-05-20",
          "y": 161
        },
        {
          "x": "2024-05-21",
          "y": 70
        },
        {
          "x": "2024-05-22",
          "y": 55
        },
        {
          "x": "2024-05-23",
          "y": 201
        },
        {
          "x": "2024-05-24",
          "y": 107
        },
        {
          "x": "2024-05-25",
          "y": 89
        },
        {
          "x": "2024-05-26",
          "y": 260
        }
      ]
    },
    {
        "id": "income",
        "color": "hsl(278, 70%, 50%)",
        "data": [
          {
            "x": "2024-05-15",
            "y": 288
          },
          {
            "x": "2024-05-16",
            "y": 288
          },
          {
            "x": "2024-05-17",
            "y": 288
          },
          {
            "x": "2024-05-18",
            "y": 288
          },
          {
            "x": "2024-05-19",
            "y": 288
          },
          {
            "x": "2024-05-20",
            "y": 288
          },
          {
            "x": "2024-05-21",
            "y": 288
          },
          {
            "x": "2024-05-22",
            "y": 288
          },
          {
            "x": "2024-05-23",
            "y": 288
          },
          {
            "x": "2024-05-24",
            "y": 288
          },
          {
            "x": "2024-05-25",
            "y": 288
          },
          {
            "x": "2024-05-26",
            "y": 288
          }
        ]
      },
  ]
