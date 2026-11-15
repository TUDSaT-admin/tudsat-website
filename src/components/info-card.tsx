import { KeyTextField } from "@prismicio/client";
import { RenderIcon } from "./icons";
import { Card } from "./ui/card";

export function InfoCard({
  icon,
  title,
  description,
  isTransparent = false,
}: {
  icon: KeyTextField;
  title: KeyTextField;
  description: KeyTextField;
  isTransparent?: boolean;
}) {
  const WrapperComponent = isTransparent ? "div" : Card;
  return (
    <WrapperComponent className="flex min-w-0 flex-1 items-center p-4">
      <RenderIcon
        // TODO: Asserting while we know it might be wrong is bad.
        name={(icon as string) || "arrowsRight"}
        className="mr-4 h-6 w-6 shrink-0"
      />
      <div className="min-w-0">
        <p className="text-sm font-medium text-muted">{title}</p>
        <p className="text-lg">{description}</p>
      </div>
    </WrapperComponent>
  );
}
