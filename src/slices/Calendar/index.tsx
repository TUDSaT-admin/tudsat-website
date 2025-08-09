"use client";

import { useState, useMemo } from "react";
import Bounded from "@/components/bounded";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Button } from "@/components/ui/button";

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

  const url = useMemo(() => {
    if (calendar === "trace") {
      return "https://cloud.bvsr.space/apps/calendar/p/wqoMRmsWDGxo2t2T";
    }
    if (calendar === "rapid") {
      return "https://cloud.bvsr.space/apps/calendar/p/SFd5igN2ycteTbg3";
    }
    return "https://cloud.bvsr.space/apps/calendar/p/TdefRGrLJDJAypKj";
  }, [calendar]);

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="h-[72rem] flex items-center justify-center">
        <iframe
          title="Calendar"
          src={url}
          style={{
            border: "none",
          }}
          className="w-[72rem] aspect-video"
        />
      </div>
      <div className="flex gap-2 items-center">
        <Button
          onClick={() => setCalendar("default")}
          disabled={calendar === "default"}
        >
          TUDSaT
        </Button>
        <Button
          onClick={() => setCalendar("trace")}
          disabled={calendar === "trace"}
        >
          TRACE
        </Button>
        <Button
          onClick={() => setCalendar("rapid")}
          disabled={calendar === "rapid"}
        >
          RAPID
        </Button>
      </div>
    </Bounded>
  );
};

export default Calendar;
