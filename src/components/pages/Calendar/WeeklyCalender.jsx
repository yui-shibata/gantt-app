import styled from 'styled-components';
import { addDateBy, areDatesSame, getMonday, getRandamDarkColor, range } from '../../../util/util';
import { useState , useRef} from 'react';
import { CiSquareChevRight, CiSquareChevLeft } from "react-icons/ci";
import EventItem from './EventItem';
import { DAYS } from './conts';

const HOUR_WIDTH = 60;
const HOUR_PIX = HOUR_WIDTH/6;

export const WeeklyCalender = ({eventArr, addEvent, onDragEvents}) => {
  console.log(eventArr)
  const [mondayDate, setMondayDate] = useState(getMonday());
  const draggedElDataRef = useRef()
  const draggedElIdRef = useRef()

  const onAddEvent = (date, e) => {
    if (e.currentTarget === e.target) {
      addEvent(date, getRandamDarkColor())
    }
  }


  const onDragStart = (id) => {
    draggedElIdRef.current = id
  }

  const onDragEnter = (e, date) => {
    e.preventDefault();
    draggedElDataRef.current = date
  };

  const onDragEnd = (e) => {
    e.preventDefault();
    const updatedEvents = eventArr.map((event) => {
      if (event.id === draggedElIdRef.current) {
        event.date = draggedElDataRef.current
      }
      return event;
    })
    onDragEvents(updatedEvents)
  }

  const nextWeek = () => setMondayDate(addDateBy(mondayDate, 7));
  const prevWeek = () => setMondayDate(addDateBy(mondayDate, -7));
  const hours = Array.from({ length: 24 }, (_, i) => (i + 8) % 24);

  return (
    <>
      <FlexBox>
        <p>today: {new Date().toDateString()}</p>
        <p>from: {mondayDate?.toDateString()}</p>
        <p>to: {addDateBy(mondayDate, 6).toDateString()}</p>
        <button onClick={prevWeek}><CiSquareChevLeft /></button>
        <button onClick={nextWeek}><CiSquareChevRight /></button>
      </FlexBox>
      <Wrapper>
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
            onDragEnter={(e) => onDragEnter(e, addDateBy(mondayDate, index))}
            onDragEnd={onDragEnd}
            >
              {
                range(24).map((hour) => (
                  <StyledHour>

                  </StyledHour>
                )) 
              }
              {eventArr.map((ev, eventIndex) => (
                areDatesSame(addDateBy(mondayDate, index), ev.date) && (
                  <EventItem key={eventIndex} event={ev} hour_pix={HOUR_PIX} onDragStart={onDragStart} />
                )
              ))}
          </StyledDay>))}
        </CalenderBody>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width:100%;
  height:100vh;
  margin: 5px;
`;

const SevenColGrid = styled.div`
  width:100%;
  display:grid;
  grid-template-columns:repeat(7, 1fr);
`

const HeadDay = styled.span`
  text-align: center;
  background: darkkhaki;
  font-size:1.2rem;
  border:1px solid;
`

const HourGrid = styled.div`
  width:100%;
  display:flex;
  grid-template-columns:repeat(4, 1fr)
`

const CalenderBody = styled.div`
  height: 10%;
  display:grid;
  grid-template-columns:repeat(7, 1fr);
  grid-template-rows:repeat(1, 1fr);
`

const StyledDay = styled.div`
  height: 100%;
  display:flex;
  border:1px solid;
  position: relative;
`

const StyledHour = styled.span`
  position:relative;
  width:100%;
  border-right: 1px solid black;
`

const Hour = styled.span`
  /* width: ${({ width }) => width}px; */
  width:100%;
  display: flex;
  align-items: center;
  border-left: 1px solid;
  margin:0px
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 1.2rem;
  margin-top: 20px;
  button {
    font-size: 1.2rem;
    display: flex;
    align-items: center;
  }
`;