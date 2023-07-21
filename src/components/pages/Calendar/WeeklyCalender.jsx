import styled from 'styled-components';
import { range, addDateBy, areDatesSame, getMonday } from '../../../util/util';
import { useState } from 'react';
import { CiSquareChevRight, CiSquareChevLeft } from "react-icons/ci";
const DAYS = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

const HOUR_WIDTH = 30;
const HOUR_MARGIN_LEFT = 15;

export const WeeklyCalender = () => {
  const [mondayDate, setMondayDate] = useState(getMonday())
  const [events, setEvents] = useState([
    {date:new Date(2023, 6, 21, 10), text:"first hi", howlong:3}
  ]);
  events.map(event => {
    console.log(event.date.getMinutes())
  })
  const hourNow = new Date().getHours();
  const minutesNow = new Date().getMinutes();
  const dayOfWeek  = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

  const nextWeek = () => setMondayDate(addDateBy(mondayDate, 7))
  const prevWeek = () => setMondayDate(addDateBy(mondayDate, -7))

  const onAddEvent = (date) => {
    const text = prompt('text')
    const from = prompt('from')
    const to = prompt('to')

    date.setHours(from)

    setEvents((prev) => [...prev, {text, date, howlong: (to - from)}])
  }

  return (
    <>
      <FlexBox>
        <p>today:{new Date().toDateString()}</p>
        <p>from:{mondayDate?.toDateString()}</p>
        <p>to:{addDateBy(mondayDate, 6).toDateString()}</p>
        <button onClick={prevWeek}><CiSquareChevLeft /></button>
        <button onClick={nextWeek}><CiSquareChevRight /></button>
      </FlexBox>
      <Wrapper>
        <HGrid first={"30px"} cols={1}>
          <HGrid cols={7}>
            {
              DAYS.map((day, index) => (
                <DayWrapper 
                  index={index} 
                  istoday={areDatesSame(new Date(), addDateBy(mondayDate, index))}
                  onDoubleClick={() => onAddEvent(addDateBy(mondayDate, index))}
                >
                <p>{day}</p>
                <VGrid cols={24}>
                  {range(24).map((hour, index) => (
                    <Hour key={index}>{((hour + 8) % 24).toString().padStart(2, '0')}</Hour>
                  ))}
                </VGrid>
                {
                  events.map((event => (
                    areDatesSame(addDateBy(mondayDate, index), event.date) && (
                      <Event
                      howlong={event.howlong}
                      fromleft={event.date.getHours() * HOUR_WIDTH + event.date.getMinutes() * (HOUR_WIDTH / 60 ) - HOUR_WIDTH * 8}>{event.text}
                      </Event>
                    )
                  )))
                }
                </DayWrapper>
              ))
            }
          </HGrid>
        </HGrid>
        <HourLine fromleft={(hourNow * HOUR_WIDTH + minutesNow * (hourNow/60)) + 24 * HOUR_WIDTH * dayOfWeek + (dayOfWeek-1) * 2 + 1 - HOUR_WIDTH * 8}/>
      </Wrapper> 
    </>
  )
}

const Wrapper = styled.div`
/* width:calc(100%-30px); */
/* border:1px solid; */
margin:15px;
position:relative;
`
const HGrid = styled.div`
display:grid;
grid-template-columns: ${({first}) => first || "" } repeat(${({ cols }) => cols}, 1fr);
`

const VGrid = styled.div`
display:grid;
grid-template-columns: repeat(${({ cols }) => cols}, 1fr);
  /* &:first-child{
    margin-left:${HOUR_MARGIN_LEFT}px
  } */
`

const DayWrapper = styled.span`
display:relative;
border:1px solid red;
background:${({istoday}) => istoday? 'red':''}
`

const Hour = styled.span`
width:${HOUR_WIDTH}px;
display:flex;
align-items:center;
`

const HourLine = styled.div`
position:absolute;
width:2px;
height: 100%; /* 縦の高さを100%に指定することで、親要素の高さに合わせて縦に伸びる線となります */
left: ${({ fromleft }) => fromleft}px; 
border:2px solid orange;
top: 0px;
`

const FlexBox = styled.div`
display:flex;
justify-content:space-around;
font-size:1.2rem;
margin-top:20px;
button {
  font-size:1.2rem;
  display: flex;
  align-items: center;
}
`

const Event = styled.div`
  position:relative;
  left:${({fromleft}) => fromleft}px;
  background: green;
  width: ${({howlong}) => howlong * HOUR_WIDTH}px;
  color: white;
  margin: 0px 5px;
  padding: 5px;
  border-radius:6px;
`
