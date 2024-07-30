import PropTypes from "prop-types";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CalendarWrapper } from "./CustomCalendar.styled";

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
