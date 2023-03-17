import { Box } from "@mui/system";
import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

const Schedule = () => {
  const renderEventcontent = (eventInfo) => {
    return (
      <Box>
        <Box>{eventInfo.timeText}</Box>
        <Box>{eventInfo.event.title}</Box>
      </Box>
    );
  };

  return (
    <Box>
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          start: "",
          center: "title",
          end: "",
        }}
        weekends={false}
        dayHeaderFormat={{ weekday: "short" }}
        allDaySlot={false}
        slotLabelFormat={{
          hour: "numeric",
          minute: "2-digit",
          omitZeroMinute: true,
          meridiem: false,
          hour12: false,
        }}
        slotMinTime="07:40"
        slotMaxTime="22:30"
      />
    </Box>
  );
};

export default Schedule;
