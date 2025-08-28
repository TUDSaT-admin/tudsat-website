import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import { buttonVariants } from "./ui/button";
import { Icons } from "./icons";
import { Content } from "@prismicio/client";

export async function Socials() {
  const client = createClient();
  const socials: Content.SettingsDocumentDataSocialsItem[] = (await client.getSingle("settings"))
    .data.socials;

  return (
    <div className="flex gap-1">
      {socials.map((social) => (
        <PrismicNextLink
          field={social.link}
          key={social.social_platform}
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          {social.social_platform === "instagram" && <Icons.instagram />}
          {social.social_platform === "linkedin" && <Icons.linkedin />}
          {social.social_platform === "youtube" && <Icons.youtube />}
          {social.social_platform === "discord" && <Icons.discord />}
          {social.social_platform === "mail" && <Icons.mail />}
        </PrismicNextLink>
      ))}
    </div>
  );
}
