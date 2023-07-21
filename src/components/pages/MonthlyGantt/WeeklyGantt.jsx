import React, { useRef, useState ,useEffect} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsGantt from 'highcharts/modules/gantt';
import { useDrag, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

HighchartsGantt(Highcharts);

const WeeklyGantt = ({tasks, plan, initialMin, initialMax, dispatch}) => {
  const [chartOptions, setChartOptions] = useState()
  const chartRef = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'taskbar',
    item: plan,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  
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
          // dragDrop: {
          //   draggableX: true,
          //   draggableY: true,
          //   dragMinX: 60000 // 1分
          // },
          point: {
            drage: {
              update: (e) =>  {
                console.log(e)
                dispatch({
                  type: 'changed',
                  message: e,
                });
              },
            },
          },
        },
      },
      tooltip: {
        formatter: function() {
          var start = new Date(this.point.start);
          var end = new Date(this.point.end);
          var startJST = new Date(start.getTime() + ( 9*3600*1000));
          var endJST = new Date(end.getTime() + ( 9*3600*1000));
          return 'start：' + Highcharts.dateFormat('%Y/%m/%d %H:%M:%S', startJST) +
            '<br/>end：' + Highcharts.dateFormat('%Y/%m/%d %H:%M:%S', endJST);
        }
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
        labels:{
          formatter: function() {
            var shiftedValue = this.value + (8 * 3600 * 1000);
            return Highcharts.dateFormat('%H', shiftedValue);
          }
        },
        grid: {
          cellHeight: 30
        },
        min:initialMin.getTime(),
        max:initialMax.getTime()
      },
      {
        type: 'datetime',
        tickInterval: 24 * 3600 * 1000, // 1日単位
        labels: {
          formatter: function() {
            var shiftedValue = this.value + (8 * 3600 * 1000);
            return Highcharts.dateFormat('%Y/%m/%d', shiftedValue);
          }
        },
        grid: {
          cellHeight: 30
        },
        min:initialMin.getTime(),
        max:initialMax.getTime()
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
  },[tasks]);

  return (
    chartOptions && (
      <DndProvider backend={HTML5Backend}>
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
          <HighchartsReact highcharts={Highcharts} constructorType={'ganttChart'} options={chartOptions} ref={chartRef} />
        </div>
      </DndProvider>
      
    )
  );
};

export default WeeklyGantt;
