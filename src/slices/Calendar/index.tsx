"use client";

import { useMemo } from "react";
import Bounded from "@/components/bounded";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import FullCalendar from "@fullcalendar/react";
import iCalendarPlugin from "@fullcalendar/icalendar";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventSourceInput } from "@fullcalendar/core/index.js";
import { useRouter } from "next/navigation";

/**
 * Props for `Calendar`.
 */
export type CalendarProps = SliceComponentProps<Content.CalendarSlice>;

/**
 * Component for "Calendar" Slices.
 */
const Calendar = ({ slice }: CalendarProps) => {
  const router = useRouter();

  const eventSource = useMemo<EventSourceInput>(() => {
    if (slice.variation === "trace") {
      return {
        url: `/api/calendar/wqoMRmsWDGxo2t2T`,
        format: "ics",
        color: "#007243",
      };
    }
    if (slice.variation === "rapid") {
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
  }, [slice.variation]);

  const link = useMemo(() => {
    if (slice.variation === "trace") {
      return "https://cloud.bvsr.space/apps/calendar/p/wqoMRmsWDGxo2t2T";
    }
    if (slice.variation === "rapid") {
      return "https://cloud.bvsr.space/apps/calendar/p/SFd5igN2ycteTbg3";
    }
    return "https://cloud.bvsr.space/apps/calendar/p/TdefRGrLJDJAypKj";
  }, [slice.variation]);

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="w-full bg-primary text-primary-foreground rounded-lg p-4 max-h-screen">
        <FullCalendar
          plugins={[iCalendarPlugin, timeGridPlugin]}
          initialView="timeGridWeek"
          events={eventSource}
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          editable={false}
          selectable={false}
          selectMirror={false}
          nowIndicator={true}
          navLinks={false}
          weekNumbers={true}
          weekNumberCalculation="ISO"
          customButtons={{
            link: {
              text: "View full calendar",
              click: () => {
                router.push(link);
              },
            },
          }}
          headerToolbar={{
            start: "link",
            center: "title",
            end: "today prev,next",
          }}
        />
      </div>
    </Bounded>
  );
};

export default Calendar;
