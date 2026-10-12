import type { Property } from "@/types/property";

export type PropertiesFilter = {
    location?: string;
}

export async function getProperties({
    location
}: PropertiesFilter = {}): Promise<Property[]> {
    const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/properties/`)
    if(location) {
        url.searchParams.append("location", location)
    }
  try {
    const response = await fetch(url);
    const properties: Property[] = await response.json();
    return properties;
  } catch (e) {
    return []
  }
}
