"use client";

import Bounded from "@/components/bounded";
import Marquee from "@/components/ui/marquee";
import { Button } from "@/components/ui/button";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import { ReactNode } from "react";
/**
 * Props for `Sponsors`.
 */
export type SponsorsProps = SliceComponentProps<Content.SponsorsSlice>;

/**
 * Component for "Sponsors" Slices.
 */
const Sponsors = async ({ slice }: SponsorsProps) => {
  const client = createClient();
  const sponsors = await client.getSingle("sponsors");
  const categories = [...new Set(sponsors.data.sponsors.map((sponsor) => sponsor.category))];

  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      {slice.variation === "full" ? (
        <div className="flex flex-col gap-16 pt-12">
          {categories.map((category) => (
            <div key={category}>
              <h2 className="text-center text-xl md:text-3xl font-semibold leading-8">
                {category}
              </h2>

              <SponsorGrid>
                {sponsors.data.sponsors
                  .filter((sponsor) => sponsor.category === category)
                  .map((sponsor) =>
                    // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
                    sponsor.highlight ? (
                      <HighlightedSponsor key={sponsor.name} sponsor={sponsor} />
                    ) : (
                      <SponsorCard key={sponsor.name} sponsor={sponsor} />
                    ),
                  )}
              </SponsorGrid>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col">
          <h2 className="text-center mb-12 md:mb-28 text-lg font-semibold leading-8">
            {slice.primary.title}
          </h2>
          <SponsorCarousel sponsors={sponsors.data.sponsors} />
          <div className="flex justify-center mt-12">
            <Button variant="link" asChild>
              <PrismicNextLink field={slice.primary.sponsors_page}>View More</PrismicNextLink>
            </Button>
          </div>
        </div>
      )}
    </Bounded>
  );
};

const SponsorGrid = ({ children }: { children: ReactNode[] }) => {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">{children}</div>
    </div>
  );
};

const SponsorCard = ({ sponsor }: { sponsor: Content.SponsorsDocumentDataSponsorsItem }) => {
  return (
    <PrismicNextLink
      field={sponsor.link}
      className="p-4 flex items-center justify-center shadow-md bg-white/10 rounded-lg ring-2 ring-accent/90"
    >
      <PrismicNextImage field={sponsor.logo} className="object-contain h-20 w-auto" />
    </PrismicNextLink>
  );
};

const HighlightedSponsor = ({ sponsor }: { sponsor: Content.SponsorsDocumentDataSponsorsItem }) => {
  return (
    <PrismicNextLink
      field={sponsor.link}
      className="p-4 flex col-span-full justify-center shadow-md bg-white/80 rounded-lg ring-8 ring-secondary/90"
    >
      <PrismicNextImage field={sponsor.logo} className="object-contain h-48 w-auto" />
    </PrismicNextLink>
  );
};

const SponsorCarousel = ({
  sponsors,
}: { sponsors: Content.SponsorsDocumentDataSponsorsItem[] }) => {
  return (
    <div className="relative max-w-[100vw] w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover>
        {sponsors.slice(0, sponsors.length / 2).map((sponsor) => (
          <div
            className="flex items-center justify-center max-w-52"
            style={{ boxSizing: "border-box" }}
            key={sponsor.name}
          >
            <PrismicNextLink field={sponsor.link}>
              <PrismicNextImage
                field={sponsor.logo}
                className="object-contain h-20 w-auto bg-slate-300/10 p-4 rounded-md hover:bg-slate-300/40 transition-colors duration-300"
                style={{ filter: "drop-shadow(-3px -3px 6px rgba(255,255,255,0.2))" }}
              />
            </PrismicNextLink>
          </div>
        ))}
      </Marquee>
      <Marquee reverse>
        {sponsors.slice(sponsors.length / 2).map((sponsor) => (
          <div
            className="flex items-center justify-center max-w-52"
            style={{ boxSizing: "border-box" }}
            key={sponsor.name}
          >
            <PrismicNextLink field={sponsor.link}>
              <PrismicNextImage
                field={sponsor.logo}
                className="object-contain h-20 w-auto bg-slate-300/10 p-4 rounded-md hover:bg-slate-300/40 transition-colors duration-300"
                style={{ filter: "drop-shadow(-3px -3px 6px rgba(255,255,255,0.2))" }}
              />
            </PrismicNextLink>
          </div>
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-60 bg-gradient-to-r from-white dark:from-background" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background" />
    </div>
  );
};

export default Sponsors;
