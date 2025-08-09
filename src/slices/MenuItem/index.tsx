import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

/**
 * Props for `MenuItem`.
 */
export type MenuItemProps = SliceComponentProps<Content.MenuItemSlice>;

/**
 * Component for "MenuItem" Slices.
 */
const MenuItem = ({ slice }: MenuItemProps) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {slice.primary.label}
      {slice.variation === "withSubMenu" && (
        <PrismicNextLink field={slice.primary.sub_menu}>Link</PrismicNextLink>
      )}
    </section>
  );
};

export default MenuItem;
