import PropertyCard from "./PropertyCard";
import { getProperties } from "@/utils/propertyService";

export default async function PropertyList() {
  const properties = await getProperties()
  return (
    <div>
      [PROPERTIES]
      <div className="flex flex-col gap-2">
        {properties.map((property) => (
          <PropertyCard key={property.property_id} property={property} />
        ))}
      </div>
    </div>
  );
}
