import { createClient } from "@/prismicio";
import { PrismicRichText } from "@prismicio/react";
import { AnnouncementDocument } from "../../prismicio-types";

export async function AnnouncementBanner() {
  const client = createClient();
  let announcement: AnnouncementDocument;
  try {
    announcement = await client.getSingle("announcement");
  } catch (e) {
    return <></>;
  }
  const {
    data: { title, description, active, activation_date, expiry_date },
  } = announcement;

  const currentDate = new Date();
  if (active === false) {
    return <></>;
  }

  if (expiry_date && activation_date) {
    const expiryDate = new Date(expiry_date);
    const activiationDate = new Date(activation_date);
    if (currentDate > expiryDate || currentDate < activiationDate) {
      return <></>;
    }
  }
  return (
    <div className="bg-primary/60 backdrop-blur-sm border-b-primary/80 border-b-2 text-primary-foreground w-full p-2 flex justify-center">
      <div className="max-w-screen-md text-center text-sm md:text-md">
        <h1 className="text-lg md:text-md font-bold mb-1">{title}</h1>
        <PrismicRichText field={description} />
      </div>
    </div>
  );
}
