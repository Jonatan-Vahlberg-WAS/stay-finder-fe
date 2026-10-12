import type { Property } from "@/types/property";
import T from "./typography";

type PropertyCardProps = {
  property: Property;
};

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="shadow-md p-4 rounded-md">
      [PROPERTY CARD]
      <T.Header size="lg">
        {property.title}
      </T.Header>
      {JSON.stringify(property, null, 2)}
    </div>
  );
}
