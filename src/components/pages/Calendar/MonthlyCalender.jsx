import styled from 'styled-components';
import {
  addDateBy,
  areDatesSame,
  getMonday,
  getRandamDarkColor,
  range,
  getCalendar,
} from '../../../util/util';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { CiSquareChevRight, CiSquareChevLeft } from 'react-icons/ci';
import moment from 'moment';
import Task from './Task';
import { MOCKEVENTS } from './conts';
import EventItem from './EventItem';
import CalenderColumn from './CalenderColumn';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../../util/ItemTypes';

const block_size = 100;

const MonthlyCalender = () => {
  const { categories, tasks } = MOCKEVENTS;
  const [mondayDate, setMondayDate] = useState(getMonday());
  const [calendars, setCalendars] = useState([]);
  const taskRef = useRef(null);
  const innerWidthRef = useRef(window.innerWidth);
  const innerHeightRef = useRef(window.innerHeight);
  const taskWidthRef = useRef(null);
  const taskHeightRef = useRef(null);
  const [positionId, setPositionId] = useState(0);
  const [category, setCategory] = useState(categories);
  const visibleTaskCount = Math.floor(
    (window.innerHeight - taskRef.current?.offsetHeight - 100 - 20) / 40
  );
  const [dragging, setDragging] = useState(false);
  const [pageX, setPageX] = useState(0);
  const [left, setLeft] = useState('');
  const [width, setWidth] = useState('');
  const elementRef = useRef([]);
  const [taskId, setDisplayTasksId] = useState('');
  const [displayTasks, setDisplayTasks] = useState([]);
  const [leftResizing, setLeftResizing] = useState(false);
  const [rightResizing, setRightResizing] = useState(false);
  const [task, setDraggTask] = useState(false);

  const [{ canDrop, isOver, getClientOffset }, drop] = useDrop(() => ({
    accept: ItemTypes.TASK,
    drop: (item, monitor) => {
      console.log('drop!');
      const delta = monitor.getDifferenceFromInitialOffset()
      const coord = monitor.getSourceClientOffset();
      stopDrag(coord, item, delta)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      getClientOffset: monitor.getClientOffset()
    }),
  }));

  // ウィンドウサイズを取得する関数
  const getWindowSize = () => {
    innerWidthRef.current = window.innerWidth;
    innerHeightRef.current = window.innerHeight;
    if (taskRef.current) {
      taskWidthRef.current = taskRef.current.offsetWidth;
      taskHeightRef.current = taskRef.current.offsetHeight;
    }
  };

  const windowSizeCheck = (event) => {
    let height = lists.length - positionId;
    if (event.deltaY > 0 && height * 40 > visibleTaskCount * 40) {
      setPositionId((prevPositionId) => prevPositionId + 1);
    } else if (event.deltaY < 0 && positionId !== 0) {
      setPositionId((prevPositionId) => prevPositionId - 1);
    }
  };

  const mouseMove = (event, index) => {
    console.log(event.type);
    if (dragging) {
      let diff = pageX - event.pageX;
      const newLeft = left - diff;
      elementRef.current[index].style.left = `${newLeft}px`;
    }
  };

  const dragTask = (draggTask) => {
    setDraggTask(draggTask);
  };

  const dragTaskOver = () => {};

  const stopDrag = (coord, item, delta) => {
    console.log('stopDrag');
    console.log('coord', coord);
    console.log('item', item);
    console.log('delta', delta);
      let diff = pageX - coord.x;
      let days = Math.ceil(diff / 100);
      if (days !== 0) {
        setDisplayTasks((prev) => {
          console.log(prev)
          return prev.map((task) => {
            if (task.list.id === item.list.id && task.list.cat === 'task') {
              const start_date = moment(task.list.start_date)
                .add(-days, 'days')
                .format('YYYY-MM-DD');
              const end_date = moment(task.list.end_date)
                .add(-days, 'days')
                .format('YYYY-MM-DD');
              const left = Math.round(parseInt(item.style.left.replace('px', '')) + delta.x)
              console.log('left', item.style.left)
              const updatedList = { ...task.list, start_date, end_date };
              const updateStyle = {...task.style, 'left':`${left}px`}
              return { ...task, list: updatedList ,style: updateStyle};
            } else {
              return task;
            }
          });
        });
      }

    if (leftResizing) {
      let diff = pageX - event.pageX;
      let days = Math.ceil(diff / block_size);
      if (days !== 0) {
        setDisplayTasks((displayTasks) => {
          return displayTasks.map((task) => {
            if (task.list.id === taskId && task.list.cat === 'task') {
              const start_date = moment(task.list.start_date).add(
                -days,
                'days'
              );
              const end_date = moment(task.list.end_date);
              if (end_date.diff(start_date, 'days') <= 0) {
                task.list.start_date = end_date.format('YYYY-MM-DD');
              } else {
                task.list.start_date = start_date.format('YYYY-MM-DD');
              }
              return task;
            } else {
              return task;
            }
          });
        });
      } else {
        elementRef.current[index].style.width = width;
        elementRef.current[index].style.left = `${left}px`;
      }
    }
    if (rightResizing) {
      let diff = pageX - event.pageX;
      let days = Math.ceil(diff / block_size);
      if (days === 1) {
        elementRef.current[index].style.width = width;
      } else if (days <= 2) {
        days--;
        setDisplayTasks((displayTasks) => {
          return displayTasks.map((task) => {
            if (task.list.id === taskId && task.list.cat === 'task') {
              const end_date = moment(task.list.end_date)
                .add(-days, 'days')
                .format('YYYY-MM-DD');
              const updatedList = { ...task.list, end_date };
              return { ...task, list: updatedList };
            } else {
              return task;
            }
          });
        });
      } else {
        setDisplayTasks((displayTasks) => {
          return displayTasks.map((task) => {
            if (task.list.id === taskId && task.list.cat === 'task') {
              const start_date = moment(task.list.start_date);
              const end_date = moment(task.list.end_date).add(-days, 'days');
              if (end_date.diff(start_date, 'days') < 0) {
                task.list.end_date = start_date.format('YYYY-MM-DD');
              } else {
                task.list.end_date = end_date.format('YYYY-MM-DD');
              }
              return task;
            } else {
              return task;
            }
          });
        });
      }
    }
    setDragging(false);
    setLeftResizing(false);
    setRightResizing(false);
  };

  // カレンダービューの幅と高さを計算する
  const calendarViewWidth = useMemo(() => {
    return innerWidthRef.current - (taskWidthRef.current || 0);
  }, [innerWidthRef.current, taskWidthRef.current]);

  const calendarViewHeight = useMemo(() => {
    return innerHeightRef.current - (taskHeightRef.current || 0) - 100 - 20;
  }, [innerHeightRef.current, taskHeightRef.current]);

  // タスクとカテゴリーのリストを作成する
  const lists = useMemo(() => {
    let listsArr = [];
    categories.map((category) => {
      listsArr.push({ cat: 'category', ...category });
      tasks.map((task) => {
        if (task.category_id === category.id) {
          listsArr.push({ cat: 'task', ...task });
        }
      });
    });
    return listsArr;
  }, [categories, tasks]);

  // カレンダービューに表示するタスクを取得する
  const getDisplayTasks = () => {
    const display_task_number = Math.floor(calendarViewHeight / 40);
    return lists.slice(positionId, positionId + display_task_number);
  };

  useEffect(() => {
    const start_date = moment('2023-7');
    let top = 10;
    let left;
    let between;
    let start;
    let style;

    setDisplayTasks(
      getDisplayTasks().map((list) => {
        style = {};
        if (list.cat === 'task') {
          const date_from = moment(list.start_date);
          const date_to = moment(list.end_date);
          between = date_to.diff(date_from, 'days') + 1;
          start = date_from.diff(start_date, 'days');
          left = start * 100;
          style = {
            top: `${top + 40 * (list.category_id - 1)}px`,
            left: `${left}px`,
            width: `${100 * between}px`,
          };
        }

        return {
          style,
          list,
        };
      })
    );
  }, [lists]);

  useEffect(() => {
    setCalendars(getCalendar());

    window.addEventListener('resize', getWindowSize);
    window.addEventListener('wheel', windowSizeCheck);
    return () => {
      window.removeEventListener('resize', getWindowSize);
      window.removeEventListener('wheel', windowSizeCheck);
    };
  }, [lists.length, positionId, visibleTaskCount]);

  const mouseDownMove = (task, event) => {
    console.log(event.type);
    setDragging(true);
    setPageX(event.pageX);
    setLeft(Number(event.target.style.left.replace('px', '')));
    setDisplayTasksId(task.id);
  };

  const mouseDownResize = (event, task, direction) => {
    direction === 'left' ? setLeftResizing(true) : setRightResizing(true);
    setPageX(event.pageX);
    setWidth(event.target.parentElement.style.width);
    setLeft(Number(event.target.parentElement.style.left.replace('px', '')));
    setDisplayTasksId(task.id);
  };

  const mouseResize = (event, index) => {
    if (leftResizing) {
      let diff = pageX - event.pageX;
      if (parseInt(width.replace('px', '')) + diff > block_size) {
        elementRef.current[index].style.width = `${
          parseInt(width.replace('px', '')) + diff
        }px`;
        elementRef.current[index].style.left = `${left - diff}px`;
      }
    }
    if (rightResizing) {
      let diff = pageX - event.pageX;
      if (parseInt(width.replace('px', '')) - diff > block_size) {
        elementRef.current[index].style.width = `${
          parseInt(width.replace('px', '')) - diff
        }px`;
      }
    }
  };

  return (
    <>
      <div id='gantt-content' className='flex'>
        <div id='gantt-task'>
          <div
            id='gantt-task-title'
            className='flex items-center bg-green-600 text-white h-28'
            ref={taskRef}>
            <div className='border-t border-r border-b flex items-center justify-center font-bold text-xs w-48 h-full'>
              工場
            </div>
          </div>
          <div
            id='gantt-task-list'
            className='overflow-y-hidden'
            style={{ height: `${calendarViewHeight}px` }}>
            {category.map((list, index) => (
              <div
                key={index}
                className='flex h-10 border-b'
                draggable='true'
                onDragStart={() => dragTask(list)}
                onDragOver={() => dragTaskOver(list)}>
                <div className='border-r flex items-center font-bold w-48 text-sm pl-4'>
                  {list.name}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          id='gantt-calendar'
          className='overflow-x-scroll overflow-y-hidden border-l'
          style={{ width: `${calendarViewWidth}px` }}>
          <div id='gantt-date' className='h-28'>
            <div id='gantt-year-month' className='relative h-8'>
              {calendars.map((calendar, index) => (
                <div
                  key={index}
                  style={{
                    position: 'absolute',
                    width: `${calendar.calendar * 100}px`,
                    left: `${calendar.start_block_number * 100}px`,
                  }}
                  className='bg-indigo-700 text-white border-b border-r border-t h-8 absolute font-bold text-sm flex items-center justify-center'>
                  {calendar.date}
                </div>
              ))}
            </div>
            <div id='gantt-day' className='relative h-12'>
              {calendars.map((calendar, calendarIndex) => (
                <React.Fragment key={calendarIndex}>
                  {calendar.days.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className='border-r border-b h-12 absolute flex items-center justify-center flex-col font-bold text-xs'
                      style={{
                        width: `${100}px`,
                        left: `${day.block_number * 100}px`,
                        background:
                          day.dayOfWeek === '土'
                            ? '#DBEAE7'
                            : day.dayOfWeek === '日'
                            ? '#FEE2E2'
                            : 'transparent',
                      }}>
                      <span>{day.day}</span>
                      <span>{day.dayOfWeek}</span>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
            <div id='gantt-day' className='relative h-8'>
              {calendars.map((calendar, calendarIndex) => (
                <React.Fragment key={calendarIndex}>
                  {/* {calendar.days.hours.map((hour, hourIndex) => (
                <div
                  key={hourIndex}
                  className="border-r border-b h-8 absolute flex items-center justify-center flex-col font-bold text-xs"
                  style={{
                    width: `${100}px`,
                    left: `${day.block_number * 100}px`,
                    background: day.dayOfWeek === '土' ? '#DBEAE7' : day.dayOfWeek === '日' ? '#FEE2E2' : 'transparent',
                  }}
                >
                  <span>{day.day}</span>
                  <span>{day.dayOfWeek}</span>
                </div>
              ))} */}
                </React.Fragment>
              ))}
            </div>
            <div id='gantt-height' className='relative'>
              {calendars.map((calendar, index) => (
                <div key={index}>
                  {calendar.days.map((day, dayIndex) => (
                    <CalenderColumn
                      key={dayIndex}
                      day={day}
                      calendarViewHeight={calendarViewHeight}
                      mouseDownMove={mouseDownMove}
                      displayTasks={displayTasks}
                      calendarViewWidth={calendarViewWidth}
                      mouseMove={mouseMove}
                      stopDrag={stopDrag}
                      mouseDownResize={mouseDownResize}
                      mouseResize={mouseResize}
                    />
                  ))}
                </div>
              ))}
            </div>
            {/* <div
              id='gantt-bar-area'
              className='relative'
              style={{
                width: `${calendarViewWidth}px`,
                height: `${calendarViewHeight}px`,
              }}
              ref={drop}
              >
              {displayTasks.map((bar, index) => (
                < Task 
                  key={index} 
                  bar={bar}
                  index={index}
                  // mouseDownMove={mouseDownMove}
                  // mouseMove={mouseMove}
                  // stopDrag={stopDrag}
                  mouseDownResize={mouseDownResize}
                  mouseResize={mouseResize}
                />
              ))}     
            </div> */}
          </div>
        </div>
        {/* <CalenderContents>
      <SevenColGrid>
        {DAYS.map((day, index) => (
          <HeadDay key={index}>
            {day}
            <HourGrid>
            {hours.map((hour, h_index) => {
              if (h_index % 6 === 0) {
                return (
                  <Hour key={h_index} width={HOUR_WIDTH}>
                    {hour.toString().padStart(2, '0')}
                  </Hour>
                );
              }
              return null; // それ以外の場合は何も描画しない
            })}
            </HourGrid>
          </HeadDay>
        ))}
      </SevenColGrid>
      <CalenderBody>
        {range(7).map((day, index) => (
          <StyledDay
          key={index}
          onDoubleClick={(e) => onAddEvent(addDateBy(mondayDate, index), e)}
          >
            {
              range(24).map((hour, h_index) => (
                <StyledHour
                onDragEnter={(e) => onDragEnter(e, addDateBy(mondayDate, index, h_index))}
                onDragEnd={(e) => onDragEnd(e,addDateBy(mondayDate, index, h_index))}
                >
                  {eventArr.map((ev, eventIndex) => (
                    areDatesSame(addDateBy(mondayDate, index, h_index), ev.date) && (
                      <EventItem key={eventIndex} event={ev} hour_pix={HOUR_PIX} onDragStart={onDragStart} />
                    )
                  ))}
                </StyledHour>
              )) 
            }
        </StyledDay>))}
        </CalenderBody>
      </CalenderContents> */}
      </div>
    </>
  );
};

export default MonthlyCalender;
