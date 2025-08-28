"use client";

import { useState, useMemo } from "react";
import Bounded from "@/components/bounded";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import iCalendarPlugin from "@fullcalendar/icalendar";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventSourceInput } from "@fullcalendar/core/index.js";

/**
 * Props for `Calendar`.
 */
export type CalendarProps = SliceComponentProps<Content.CalendarSlice>;

type CalendarVariation = CalendarProps["slice"]["variation"];
/**
 * Component for "Calendar" Slices.
 */
const Calendar = ({ slice }: CalendarProps) => {
  const [calendar, setCalendar] = useState<CalendarVariation>(slice.variation);

  const eventSource = useMemo<EventSourceInput>(() => {
    if (calendar === "trace") {
      return {
        url: `/api/calendar/wqoMRmsWDGxo2t2T`,
        format: "ics",
        color: "#007243",
      };
    }
    if (calendar === "rapid") {
      return {
        url: `/api/calendar/SFd5igN2ycteTbg3`,
        format: "ics",
        color: "#930D16",
      };
    }
    return {
      url: `/api/calendar/TdefRGrLJDJAypKj`,
      format: "ics",
      color: "#2F4D86",
    };
  }, [calendar]);

  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <div className="w-full aspect-video bg-primary text-primary-foreground rounded-lg p-4">
        <FullCalendar
          plugins={[dayGridPlugin, iCalendarPlugin, timeGridPlugin]}
          initialView="timeGridWeek"
          events={eventSource}
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          weekNumbers={true}
          weekNumberCalculation="ISO"
          customButtons={{
            tudsat: {
              text: "TUDSaT",
              click: () => {
                setCalendar("default");
              },
            },
            trace: {
              text: "TRACE",
              click: () => {
                setCalendar("trace");
              },
            },
            rapid: {
              text: "RAPID",
              click: () => {
                setCalendar("rapid");
              },
            },
          }}
          headerToolbar={{
            start: "dayGridMonth,timeGridWeek,timeGridDay",
            center: "title",
            end: "today prev,next",
          }}
          footerToolbar={{
            start: "",
            center: "",
            end: "tudsat,trace,rapid",
          }}
        />
      </div>
    </Bounded>
  );
};

export default Calendar;
