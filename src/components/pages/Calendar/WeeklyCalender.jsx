import styled from 'styled-components';
import { addDateBy, areDatesSame, getMonday } from '../../../util/util';
import { useState } from 'react';
import { CiSquareChevRight, CiSquareChevLeft } from "react-icons/ci";

const DAYS = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
const LINES = ["L1", "L2"];
const HOUR_WIDTH = 60;
const HOUR_PIX = HOUR_WIDTH / 6;

export const WeeklyCalender = () => {
  const [mondayDate, setMondayDate] = useState(getMonday());
  const [events, setEvents] = useState([
    { date: new Date(2023, 6, 21, 8), text: "first hi", howlong: 6 }
  ]);

  const dayOfWeek  = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

  const nextWeek = () => setMondayDate(addDateBy(mondayDate, 7));
  const prevWeek = () => setMondayDate(addDateBy(mondayDate, -7));
  const hours = Array.from({ length: 24 }, (_, i) => (i + 8) % 24);

  const onAddEvent = (date) => {
    const text = prompt('text');
    const from = prompt('from');
    const to = prompt('to');

    date.setHours(from);

    setEvents((prev) => [...prev, { text, date, howlong: (to - from) }]);
  };

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
        <HGrid first={"30px"} cols={1}>
          <VGrid rows={2}>
            {LINES.map((line, rowIndex) => (
              <p key={rowIndex}>{line}</p>
            ))}
          </VGrid>
          <VGrid rows={2}>
            <HGrid cols={7}>
              {DAYS.map((day, index) => (
                <div key={index}>
                  <p>{day}</p>
                  <HGrid cols={4}>
                  {hours.map((hour, h_index) => {
                    // indexが6の倍数の場合のみHourを表示
                    if (h_index % 6 === 0) {
                      return (
                        <Hour key={h_index} width={HOUR_WIDTH}>
                          {hour.toString().padStart(2, '0')}
                        </Hour>
                      );
                    }
                    return null; // それ以外の場合は何も描画しない
                  })}
                  </HGrid>
                </div>
              ))}
            </HGrid>
            <HGrid cols={7}>
            {DAYS.map((day, index) => (
              <DayWrapper
                key={index}
                onDoubleClick={() => onAddEvent(addDateBy(mondayDate, index))}
              >
                <HGrid cols={24}>
                  {hours.map((hour, h_index) => (
                    <HourLine key={h_index} left={hour * HOUR_PIX + index * (HOUR_WIDTH*4)} />
                ))}
                </HGrid>
                {events.map((event, eventIndex) => (
                  areDatesSame(addDateBy(mondayDate, index), event.date) && (
                    <Event
                      key={eventIndex}
                      howlong={event.howlong}
                      fromleft={(event.date.getHours() - 8) * HOUR_PIX + event.date.getMinutes() * (HOUR_PIX / 60)}
                    >
                      {event.text}
                    </Event>
                  )
                ))}
              </DayWrapper>
            ))}
            </HGrid>
          </VGrid>
        </HGrid>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  /* width:calc(100%-30px); */
  /* border:1px solid; */
  margin: 15px;
  position: relative;
`;

const HGrid = styled.div`
  position: inherit;
  display: grid;
  grid-template-columns: ${({ first }) => first || ""} repeat(${({ cols }) => cols}, 1fr);
`;

const VGrid = styled.div`
  /* position: relative; */
  display: grid;
  grid-template-rows: repeat(${({ rows }) => rows}, 1fr);
`;

const DayWrapper = styled.span`
  display: relative;
  border: 1px solid;
`;

const Hour = styled.span`
  width: ${({ width }) => width}px;
  display: flex;
  align-items: center;
  border-left: 1px solid;
  margin:0px
  /* padding-left: 5px; */
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

const Event = styled.div`
  position: relative;
  left: ${({ fromleft }) => fromleft }px;
  background: #FF9B9B;
  width: ${({ howlong }) => (howlong * HOUR_PIX)}px;
  color: white;
  margin: 0px;
  padding: 5px;
  border-radius: 4px;
  height:100%;
  opacity:0.8;
  border:1px solid #F11A7B;
`;

const HourLine = styled.div`
  position: absolute;
  /* width: 1px; */
  height: 100%;
  left: ${({ left }) => left}px;
  top: 0;
  border: 1px solid;
  margin:0px
`;