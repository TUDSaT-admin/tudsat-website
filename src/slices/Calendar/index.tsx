"use client";

import { useMemo, useState } from "react";
import Bounded from "@/components/bounded";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Button } from "@/components/ui/button";

/**
 * Props for `Calendar`.
 */
export type CalendarProps = SliceComponentProps<Content.CalendarSlice>;

/**
 * Component for "Calendar" Slices.
 */
const Calendar = ({ slice }: CalendarProps) => {
  const [calendar, setCalendar] = useState<CalendarProps["slice"]["variation"]>(
    slice.variation,
  );

  const link = useMemo(() => {
    if (calendar === "trace") {
      return "https://cloud.bvsr.space/apps/calendar/embed/wqoMRmsWDGxo2t2T";
    }
    if (calendar === "rapid") {
      return "https://cloud.bvsr.space/apps/calendar/embed/SFd5igN2ycteTbg3";
    }
    if (calendar === "casimar") {
      return "https://cloud.bvsr.space/apps/calendar/embed/kicMqtXgomEBscYx";
    }
    return "https://cloud.bvsr.space/apps/calendar/embed/TdefRGrLJDJAypKj";
  }, [calendar]);

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <iframe
        title="Calendar"
        style={{
          border: "none",
        }}
        src={link}
        className="w-full aspect-9/16 md:aspect-square xl:aspect-video"
      />
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
        <Button
          onClick={() => setCalendar("casimar")}
          disabled={calendar === "casimar"}
        >
          CASIMAR
        </Button>
      </div>
    </Bounded>
  );
};

export default Calendar;
