export interface Device {
  id: string;
  name: string;
  category?: string;
  price?: number;
  color?: string;
  capacity?: string;
  generation?: string;
  year?: number;
  cpuModel?: string;
  hardDiskSize?: string;
  strapColour?: string;
  screenSize?: number;
  description?: string;
}

export enum DeviceCategory {
  Smartphone = "Smartphone",
  Laptop = "Laptop",
  Tablet = "Tablet",
  Smartwatch = "Smartwatch",
  Headphones = "Headphones",
  Other = "Other",
}

export enum StorageUnit {
  GB = "GB",
  TB = "TB",
}

export type DeviceFormState = {
  name: string;
  price: number | null;
  category: DeviceCategory;
  color: string;
  storageSize: number | null;
  storageUnit: StorageUnit;
};

export type DeviceApiResponse = {
  id: string;
  name: string;
  data?: DeviceData;
}

export type DeviceData = Record<string, string | number | undefined>;

export enum ActionType {
  Create = "Create",
  Edit = "Edit",
}

