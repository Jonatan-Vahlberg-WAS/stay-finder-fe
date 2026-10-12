import type { Property } from "@/types/property";
import { cn } from "@/utils/cn";
import T from "./typography";

type PropertyCardProps = {
  property: Property;
  className?: string;
};

export default function PropertyCard({
  property,
  className,
}: PropertyCardProps) {
  return (
    <div className={cn("shadow-md p-4 rounded-md", className)}>
      [PROPERTY CARD]
      <T.Header size="lg">
        {property.title}
      </T.Header>
      {JSON.stringify(property, null, 2)}
    </div>
  );
}
