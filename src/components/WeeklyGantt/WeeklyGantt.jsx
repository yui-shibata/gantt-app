import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import HighchartsGantt from "highcharts/modules/gantt";
import HC_exporting from 'highcharts/modules/exporting';
import HC_accessibility from 'highcharts/modules/accessibility';
import more from "highcharts/highcharts-more";
import draggable from "highcharts/modules/draggable-points";
import {schedule_item} from './schedule_item';

HighchartsGantt(Highcharts);
HC_exporting(Highcharts);
HC_accessibility(Highcharts);
more(Highcharts);
draggable(Highcharts);

const WeeklyGantt = ({plan}) => {
  // Initialize state
  const [chartOptions, setChartOptions] = useState(null);

  // Process data and initialize chart on component mount
  useEffect(() => {
    var series,
    products;

    // Set to 00:00:00:000 today
    products = [plan];
    // Your existing data processing code here...
    series = products.map(function (product, i) {
      var data = product.deals.map(function (deal) {
        return {
          id: 'deal-' + i,
          product: deal.product,
          start: deal.from,
          end: deal.to,
          y: i,
          name: deal.product
        };
      });
      return {
        name: product.plant,
        data: data,
        current: product.deals[product.current]
      };
    });

    // Set chart options
    const options = {
      series: series,
      // ...Other chart options...
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            format: '{point.name}',
            style: {
              fontWeight: 'normal'
            }
          },
          dragDrop: {
            draggableX: true,
            draggableY: true,
            dragMinY: 0,
            dragMaxY: 6,
            dragMinX: 0,
            dragMaxX: 6,
            liveRedraw: false,
            groupBy: 'groupId' 
          },
        },
        point: {
          events: {
            dragStart: function (e) {
              yStart = e.chartY;
              xStart = e.chartX;
              seriesGroup = this.groupId;
              seriesName = this.name;
              seriesIndex = this.index;
              seriesData = this.series.chart.series[0].data;
  
              blockGroup = blockProps.find(function (element) {
                if (element[0] == seriesGroup) {
                  return element;
                }
              });
  
              if (seriesName.indexOf("h") != -1) {
                orientation = "horizontal";
              } else {
                orientation = "vertical";
              }
  
              blocksIndex = blockProps.findIndex(function (element) {
                if (element[0] == seriesGroup) {
                  return element;
                }
              });
  
              startRow = blockGroup[1]; //row 2
              startCol = blockGroup[2]; //column 0
              size = blockGroup[3]; //length or height
              seriesData = this.series.chart.series[0].data;
            },
            drag: function (e) {
              try {
                if (orientation == "horizontal") {
                  let newerY = seriesData[seriesIndex].y;
                  if (e.chartX > xStart) {
                    //console.log('going right');
  
                    //red block's escape
                    if (
                      seriesGroup == "hBlock5" &&
                      seriesData[seriesIndex].x2 > 5
                    ) {
                      seriesData[seriesIndex].update({ x: 6, x2: 7, y: newerY });
                    }
                    if (pointMatrix[startRow][startCol + size] == 0) {
                      seriesData[seriesIndex].update({
                        x: zones[startCol + 1][0],
                        x2: zones[startCol + size][1],
                        y: newerY,
                      });
  
                      pointMatrix[startRow][startCol + size] = 1;
                      pointMatrix[startRow][startCol] = 0;
                      blockProps[blocksIndex][2] = startCol + 1;
                    }
                  } else {
                    // console.log('going left');
                    newerY = seriesData[seriesIndex].y;
                    newX1 = zones[startCol - 1][0];
                    newX2 = zones[startCol - 1 + (size - 1)];
  
                    gridindex1 = startCol - 1;
                    gridindex2 = startCol + (size - 1);
  
                    if (pointMatrix[startRow][startCol - 1] == 0) {
                      seriesData[seriesIndex].update({
                        x: zones[startCol - 1][0],
                        x2: zones[startCol - 1 + (size - 1)][1],
                        y: newerY,
                      });
  
                      pointMatrix[startRow][startCol - 1] = 1;
                      pointMatrix[startRow][startCol + (size - 1)] = 0;
                      blockProps[blocksIndex][2] = startCol - 1;
                    }
                  }
                } else {
                  if (e.chartY > yStart) {
                    //  console.log('going down');
  
                    if (pointMatrix[startRow + size][startCol] == 0) {
                      for (ii = 0; ii < seriesData.length; ++ii) {
                        if (seriesData[ii].groupId == seriesGroup) {
                          newerY = seriesData[ii].y + 1;
                          seriesData[ii].update(newerY);
                        }
                      }
                      pointMatrix[startRow + size][startCol] = 1;
                      pointMatrix[startRow][startCol] = 0;
                      blockProps[blocksIndex][1] = startRow + 1;
                    }
                  } else {
                    // console.log('going up');
  
                    if (pointMatrix[startRow - 1][startCol] == 0) {
                      for (ii = 0; ii < seriesData.length; ++ii) {
                        if (seriesData[ii].groupId == seriesGroup) {
                          newerY = seriesData[ii].y - 1;
                          seriesData[ii].update(newerY);
                        }
                      }
                      pointMatrix[startRow - 1 + size][startCol] = 0;
                      pointMatrix[startRow - 1][startCol] = 1;
                      blockProps[blocksIndex][1] = startRow - 1;
                    }
                  }
                }
              } catch (error) {
                return;
              }
            },
  
            drop: function () {
              return false;
            },
          }
        }
      },
      tooltip: {
        pointFormat: '<span>Product: {point.product}</span><br/><span>From: {point.start:%e. %b}</span><br/><span>To: {point.end:%e. %b}</span>'
      },
      lang: {
        accessibility: {
          axis: {
            xAxisDescriptionPlural: 'The chart has a two-part X axis showing time in both week numbers and days.',
            yAxisDescriptionSingular: 'The chart has a tabular Y axis showing a data table row for each point.'
          }
        }
      },
      accessibility: {
        keyboardNavigation: {
          seriesNavigation: {
            mode: 'serialize'
          }
        },
        point: {
          valueDescriptionFormat: 'Rented to {point.product} from {point.x:%A, %B %e} to {point.x2:%A, %B %e}.'
        },
        series: {
          descriptionFormat: '{series.name}, product {add series.index 1} of {series.chart.series.length}.'
        }
      },
      xAxis: {
        type: 'datetime',
        tickInterval: 6 * 3600 * 1000, // 4時間単位
        min: Date.UTC(2023, 4, 29,0,0,0), // 開始日
        max: Date.UTC(2023, 5, 4,0,0,0), // 終了日
        // max: Date.UTC(2023, 5, 4),
        labels: {
          formatter: function() {
            return Highcharts.dateFormat('%H', this.value);
          }
        }
      },
      yAxis: {
        type: 'category',
        grid: {
          columns: [{
              title: {
                  text: '工場'
              },
              categories: ["L1"]
          }, {
              title: {
                  text: '週'
              },
              categories: ["第1週"]
          }, {
              title: {
                  text: 'From'
              },
              categories: ["5/29((月)"]
          }, {
              title: {
                  text: 'To'
              },
              categories: ["6/4(金)"]
          }]
        }
      },
      credits:{  
        enabled: false,  
      }  
    };

    setChartOptions(options);
  }, []);

  return (
    chartOptions && (
      <>
      <div className="scrolling-container">
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={'ganttChart'}
          options={chartOptions}
          containerProps={{ id: 'container' }}
        />
      </div>
      </>
      
    )
  );
};

export default WeeklyGantt;
