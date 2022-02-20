import styled, { css } from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;

  > h3 {
    text-align: center;
  }
`;

export const MonthSelectContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const CalendarContainer = styled.div`
  * {
    margin: 0;
    padding: 0;
  }

  background-color: #b6b6b6;
  border: 1px solid #b6b6b6;

  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
  width: 100%;

  > p {
    &:nth-child(-n + 7) {
      background-color: #1c6ca7;
      color: #fff;
      text-align: center;
      text-transform: capitalize;
      padding-top: 3px;
      padding-bottom: 3px;

      span {
        position: unset;
      }
    }
  }
`;

interface DayContainerProps {
  selected: boolean;
  disabled: boolean;
}
export const DayContainer = styled.div<DayContainerProps>`
  background-color: #fff;
  padding-top: 100%;
  position: relative;
  font-weight: bold;
  cursor: pointer;

  &:nth-child(7n + 7),
  &:nth-child(7n + 1) {
    background-color: ${({ selected }) => (selected ? '#c2d6b4' : '#f0f0f0')};
    color: #3c7497;
  }

  span {
    position: absolute;
    top: 2px;
    left: 8px;
  }

  ${(props) =>
    props.selected &&
    css`
      background: #c2d6b4;
    `};

  ${(props) =>
    props.disabled &&
    css`
      > span {
        color: #a7a7a7;
      }
    `};
`;

export const RemindersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  max-height: calc(100% - 20px);
  position: absolute;
  right: 0;
  top: 20px;
  overflow-y: auto;
  padding: 0 2px;
`;

type ReminderProps = {
  color: string;
}
export const ReminderContainer = styled.div<ReminderProps>`
  background-color: ${({color}) => color ? color : 'rgba(28, 108, 167, 0.2)'};
  font-size: 10px;
  margin-top: 4px;
  word-wrap: break-word;
  width: 100%;
  padding: 2px 4px;
`;

export const ActionButton = styled.button`
  position: absolute;
  border-radius: 100%;
  color: #fff;
  background-color: #3c7497;
  bottom: 0;
  right: 0;
  width: 36px;
  height: 36px;
`;