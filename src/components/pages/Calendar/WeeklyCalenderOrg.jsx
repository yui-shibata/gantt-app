import styled from 'styled-components';
import { range, addDateBy, areDatesSame, getMonday } from '../../../util/util';
import { useState } from 'react';
import { CiSquareChevRight, CiSquareChevLeft } from "react-icons/ci";
const DAYS = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

const HOUR_HEIGHT = 30;
const HOUR_MARGIN_TOP = 15;

export const WeeklyCalenderOrg = () => {
  const [mondayDate, setMondayDate] = useState(getMonday())
  const [events, setEvents] = useState([
    {date:new Date(2023, 6, 21, 10), text:"first hi", howlong:3}
    // ,
    // {date:new Date(2023, 6, 21, 20), text:"first hi", howlong:3},
    // {date:new Date(2023, 6, 22, 11), text:"first hi", howlong:3}
  ]);
  events.map(event => {
    console.log(event.date.getMinutes())
  })
  const hourNow = new Date().getHours();
  const minutesNow = new Date().getMinutes();

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
          <VGrid rows={24}>
            {
              range(24).map((hour, index) => <Hour key={index}>{hour}</Hour>)
            }
          </VGrid>
          <HGrid cols={7}>
            {
              DAYS.map((day, index) => (
                <DayWrapper 
                  index={index} 
                  istoday={areDatesSame(new Date(), addDateBy(mondayDate, index))}
                  onDoubleClick={() => onAddEvent(addDateBy(mondayDate, index))}
                >
                <p>{day}</p>
                {
                  events.map((event => (
                    areDatesSame(addDateBy(mondayDate, index), event.date) && (
                      <Event
                      howlong={event.howlong}
                      fromtop={event.date.getHours() * HOUR_HEIGHT + event.date.getMinutes() * (HOUR_HEIGHT / 60)}>{event.text}
                      </Event>
                    )
                  )))
                }
                </DayWrapper>
              ))
            }
          </HGrid>
        </HGrid>
        <HourLine fromtop={hourNow * HOUR_HEIGHT + HOUR_MARGIN_TOP + HOUR_HEIGHT / 2 + minutesNow / 2}/>
      </Wrapper> 
    </>
  )
}

const Wrapper = styled.div`
width:calc(100%-30px);
border:1px solid;
margin:15px;
position:relative;
`
const HGrid = styled.div`
display:grid;
grid-template-columns: ${({first}) => first || "" } repeat(${({ cols }) => cols}, 1fr);
`

const VGrid = styled.div`
display:grid;
grid-template-rows: repeat(${({ rows }) => rows}, 1fr);
  &:first-child{
    margin-top:${HOUR_MARGIN_TOP}px
  }
`

const DayWrapper = styled.span`
display:relative;
border:1px solid red;
background:${({istoday}) => istoday? 'red':''}
`

const Hour = styled.span`
height:${HOUR_HEIGHT}px;
display:flex;
align-items:top;
`

const HourLine = styled.div`
position:absolute;
width:100%;
top: ${({fromtop}) => fromtop}px;
border:2px solid orange;
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
  top:${({fromtop}) => fromtop}px;
  background: green;
  height: ${({howlong}) => howlong * HOUR_HEIGHT}px;
  color: white;
  margin: 0px 5px;
  padding: 5px;
  border-radius:6px;
`
