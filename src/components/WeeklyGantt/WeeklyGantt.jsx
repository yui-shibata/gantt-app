import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import HighchartsGantt from "highcharts/modules/gantt";
import HC_exporting from 'highcharts/modules/exporting';
import HC_accessibility from 'highcharts/modules/accessibility';
import more from "highcharts/highcharts-more";
import draggable from "highcharts/modules/draggable-points";

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
    var series = [{
      name:'L1工場',
      data: plan
    }
  ];
    const options = {
      series: series,
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            format: '{point.name}<br>{point.production_volume}',
            style: {
              fontWeight: 'normal'
            }
          },
          dragDrop: {
            draggableX: true,
            dragMinX: 60 * 1000, // ドラッグ操作の最小値を1分に設定
          },
          point: {
            events: {
              drag: function (e) {
                // ドラッグされた時の処理
                // e.targetはドラッグされたポイントを表します
                // e.newXには新しいX座標（エポック時間）が含まれています
                console.log('Dragged point:', e.target);
                console.log('New X:', e.newX);
              },
            },
          },
        },
      },
      exporting: {
        buttons: {
          contextButton: {
            enabled: false // PDFエクスポートボタンを無効にする
          }
        }
      },
      xAxis: [{
        type: 'datetime',
        tickInterval: 6 * 3600 * 1000, // 6時間単位
        startOnTick: false,
        labels: {
          formatter: function() {
            var shiftedValue = this.value + (8 * 3600 * 1000);
            return Highcharts.dateFormat('%H', shiftedValue);
          }
        },
        grid: {
          cellHeight: 30
        }
      },
      {
        type: 'datetime',
        tickInterval: 24 * 3600 * 1000, // 1日単位
        labels: {
          formatter: function() {
            return Highcharts.dateFormat('%Y/%m/%d', this.value);
          }
        },
        grid: {
          cellHeight: 30
        }
      }],
      yAxis: {
        categories: ['L1工場'], // y軸のカテゴリを設定
        title: {
          text: null
        },
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
      <div className="weekly-gantt-container">
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
