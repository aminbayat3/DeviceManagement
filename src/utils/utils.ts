import { Device, DeviceApiResponse, DeviceCategory, StorageUnit, DeviceFormState } from "../types/types";

const colorRegex =
  /\b(black|white|silver|blue|red|green|purple|gray|gold|brown|elderberry|cloudy white)\b/i;

export const formatDeviceData = (items: DeviceApiResponse[]): Device[] => {
  return items.map((item: DeviceApiResponse) => {
    const data = item.data || {};
    let name = item.name.trim();

    const { capacity, cleanedName: nameWithoutCapacity } = extractCapacity(
      name,
      data
    );
    name = nameWithoutCapacity;

    const { color, cleanedName: nameWithoutColor } = extractColor(name, data);
    name = nameWithoutColor;

    const category = data.category || deriveCategory(name);

    name = name.replace(/,\s*$/, "").trim();

    return {
      id: item.id,
      name,
      category,
      price: data.price || (data.Price && parseFloat(data.Price)) || undefined,
      color,
      capacity,
      generation: data.Generation || data.generation || undefined,
      year: data.year || undefined,
      cpuModel: data["CPU model"] || undefined,
      hardDiskSize: data["Hard disk size"] || undefined,
      strapColour: data["Strap Colour"] || undefined,
      screenSize: data["Screen size"] || undefined,
      description: data.Description || undefined,
    };
  });
};

const extractCapacity = (
  name: string,
  data: any
): { capacity?: string; cleanedName: string } => {
  let cleanedName = name;
  let capacity = getCapacityFromData(data) || getCapacityFromName(name);

  if (capacity) {
    const capacityPattern = new RegExp(
      `\\b${capacity.replace(/\s/g, "\\s?")}\\b`,
      "i"
    );
    cleanedName = cleanedName.replace(capacityPattern, "").trim();
  }

  return { capacity, cleanedName };
};

const extractColor = (
  name: string,
  data: any
): { color?: string; cleanedName: string } => {
  let color = data.color || data.Color || undefined;
  let cleanedName = name;

  if (!color) {
    const colorMatch = name.match(colorRegex);
    if (colorMatch) {
      color = colorMatch[0];
      cleanedName = name.replace(colorMatch[0], "").trim();
    }
  }

  return { color, cleanedName };
};

const deriveCategory = (name: string): string | undefined => {
  const lowerName = name.toLowerCase();

  if (
    lowerName.includes("iphone") ||
    lowerName.includes("fold") ||
    lowerName.includes("galaxy") ||
    lowerName.includes("pixel")
  )
    return DeviceCategory.Smartphone;

  if (lowerName.includes("macbook")) return DeviceCategory.Laptop;
  if (lowerName.includes("ipad")) return DeviceCategory.Tablet;
  if (lowerName.includes("watch")) return DeviceCategory.Smartwatch;
  if (lowerName.includes("airpods") || lowerName.includes("beats"))
    return DeviceCategory.Headphones;

  return DeviceCategory.Other;
};

const getCapacityFromData = (data: any): string | undefined => {
  if (data["capacity GB"]) return `${data["capacity GB"]} GB`;
  if (data["capacity TB"]) return `${data["capacity TB"]} TB`;
  if (
    typeof data.Capacity === "string" &&
    data.Capacity.match(/^\d+\s?(GB|TB)$/i)
  ) {
    return data.Capacity;
  }
  if (
    typeof data.storage === "string" &&
    data.storage.match(/^\d+\s?(GB|TB)$/i)
  ) {
    return data.storage;
  }
  return undefined;
};

const getCapacityFromName = (name: string): string | undefined => {
  const capacityRegex = /(\d+)\s?(GB|TB)/i;
  const match = name.match(capacityRegex);
  return match ? `${match[1]} ${match[2]}` : undefined;
};

export const parseStorage = (
  storage: string | undefined
): { storageSize: number | null; storageUnit: StorageUnit } => {
  if (!storage) return { storageSize: null, storageUnit: StorageUnit.GB };

  const storageRegex = /(\d+)\s?(GB|TB)/i;
  const match = storage.match(storageRegex);

  if (match) {
    return {
      storageSize: Number(match[1]),
      storageUnit: match[2] as StorageUnit,
    };
  }

  return { storageSize: null, storageUnit: StorageUnit.GB };
};


export const validateDeviceForm = (
  device: DeviceFormState
): { [key: string]: string } => {
  let errors: { [key: string]: string } = {};

  if (!device.name.trim() || device.name.length > 50)
    errors.name = "Device name is required (max 50 chars).";

  if (device.price === null || device.price < 1)
    errors.price = "Price must be at least 1.";

  if (device.storageSize === null || device.storageSize < 1)
    errors.storageSize = "Storage size must be at least 1.";

  return errors;
};

