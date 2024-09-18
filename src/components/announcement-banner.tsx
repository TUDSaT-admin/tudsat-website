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
    <div className="bg-primary text-primary-foreground w-full p-4 flex justify-center">
      <div className="max-w-screen-md text-center">
        <h1 className="text-xl md:text-2xl font-bold mb-2">{title}</h1>
        <PrismicRichText field={description} />
      </div>
    </div>
  );
}
