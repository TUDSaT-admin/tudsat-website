import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Announcement`.
 */
export type AnnouncementProps = SliceComponentProps<Content.AnnouncementSlice>;

/**
 * Component for "Announcement" Slices.
 */
const Announcement = ({ slice }: AnnouncementProps): JSX.Element => {
  const currentDate = new Date();
  if (slice.primary.active === false) {
    return <></>;
  }

  if (slice.primary.expiry_date && slice.primary.activation_date) {
    const expiryDate = new Date(slice.primary.expiry_date);
    const activiationDate = new Date(slice.primary.activation_date);
    if (currentDate > expiryDate || currentDate < activiationDate) {
      return <></>;
    }
  }
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-primary text-primary-foreground w-full p-4 flex justify-center"
    >
      <div className="max-w-screen-md text-center">
        <h1 className="text-xl md:text-2xl font-bold mb-2">{slice.primary.title}</h1>
        <PrismicRichText field={slice.primary.description} />
      </div>
    </section>
  );
};

export default Announcement;
