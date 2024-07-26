import styled from "styled-components";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import PropTypes from "prop-types";

const CalendarWrapper = styled.div`
  .react-calendar {
    background-color: ${({ theme }) => theme.modalBackgroundColor};
    border: 1px solid ${({ theme }) => theme.inputBackground}; /* Sau altă culoare adecvată */
    border-radius: 8px;
    width: 233px;
    height: 254px;
    color: ${({ theme }) => theme.modalTextColor};
    padding: 10px;
  }

  .react-calendar__navigation {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.modalTextColor};
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 14px;

    button {
      transition: transform 0.2s;
      color: ${({ theme }) => theme.modalTextColor};
      min-width: 44px;
      background: none;
      font-size: 14px;
      font-family: "Poppins", sans-serif;
      font-weight: 500;
      padding: 2px 5px;
      &:hover {
        transform: scale(1.2);
        background: none;
        color: ${({ theme }) => theme.modalTextColor};
      }
      &:focus {
        outline: none;
        color: ${({ theme }) => theme.modalTextColor};
      }
      &:active {
        background: none;
        color: ${({ theme }) => theme.modalTextColor};
      }
    }
  }

  .react-calendar__navigation button.react-calendar__navigation__prev2-button,
  .react-calendar__navigation button.react-calendar__navigation__next2-button {
    display: none;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-family: "Poppins", sans-serif;
    color: ${({ theme }) => theme.modalTextColor};
    padding-bottom: 8px;
  }

  .react-calendar__month-view__weekdays__weekday {
    padding: 0;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    visibility: hidden;
  }

  .react-calendar__month-view__days {
    display: flex;
    justify-content: space-between;
    gap: 0;
  }

  .react-calendar__month-view__days__day {
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 1;
    letter-spacing: 0;
    height: auto;
    padding: 0;
    margin: 0;
  }

  .react-calendar__tile {
    background-color: ${({ theme }) => theme.modalBackgroundColor};
    color: ${({ theme }) => theme.modalTextColor};
    border-radius: 50%;
    margin: 0;
    height: 27px;
    width: 27px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    transition: background-color 0.2s, color 0.2s;
  }

  .react-calendar__tile--active {
    background-color: ${({ theme }) => theme.modalCreateBtnAddBackgroundColor};
    color: ${({ theme }) => theme.modalCreateBtnAddColor};
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: ${({ theme }) => theme.modalCreateBtnBackgroundColor};
    color: ${({ theme }) => theme.modalCreateBtnColor};
  }

  .react-calendar__tile--now {
    background: ${({ theme }) => theme.modalCreateBtnAddBackgroundColor};
    border-radius: 50%;
    color: ${({ theme }) => theme.modalCreateBtnAddColor};
  }

  .react-calendar__tile--active:enabled:focus {
    background-color: ${({ theme }) => theme.modalCreateBtnBackgroundColor};
    color: ${({ theme }) => theme.modalCreateBtnColor};
  }
`;

const CustomCalendar = ({ onChange, value }) => {
  const weekdayFormatter = (locale, date) => {
    return date
      .toLocaleDateString(locale, { weekday: "short" })
      .substring(0, 2);
  };

  return (
    <CalendarWrapper>
      <Calendar
        onChange={onChange}
        value={value}
        formatShortWeekday={weekdayFormatter}
      />
    </CalendarWrapper>
  );
};

CustomCalendar.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.instanceOf(Date).isRequired,
};

export default CustomCalendar;
