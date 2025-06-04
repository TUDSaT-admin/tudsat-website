"use client"

import { useState, useMemo } from "react"
import Bounded from "@/components/bounded";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Button } from "@/components/ui/button";

/**
 * Props for `CamGroundstation`.
 */
export type CamGroundstationProps = SliceComponentProps<Content.CamGroundstationSlice>;

const camResolutionsArray = ["2k", "1080p", "720p"] as const
type camResolutions = typeof camResolutionsArray[number]

/**
 * Component for "CamGroundstation" Slices.
 */
const CamGroundstation = ({ slice }: CamGroundstationProps): JSX.Element => {
  const [resolution, setResolution] = useState<camResolutions>("1080p")

  const url = useMemo(() => {
    if (resolution === "2k") {
      return "https://cam-groundstation.tudsat.space/11?action=play&media=mjpeg"
    } else if (resolution === "1080p") {
      return "https://cam-groundstation.tudsat.space/12?action=play&media=mjpeg"
    }
    return "https://cam-groundstation.tudsat.space/13?action=play&media=mjpeg"
  }, [resolution])

  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <iframe
        title="Groundstation Livestream"
        src={url}
        style={{
          border: "none",
          height: "max-content",
        }}
        className="w-full aspect-video"
      />
      <br />
      <div className="flex gap-2 items-center">
        <Button onClick={() => setResolution("2k")} disabled={resolution === "2k"}>
          2k
        </Button>
        <Button onClick={() => setResolution("1080p")} disabled={resolution === "1080p"}>
          1080p
        </Button>
        <Button onClick={() => setResolution("720p")} disabled={resolution === "720p"}>
          720p
        </Button>
      </div>
    </Bounded>
  );
};

export default CamGroundstation;
