import React, { useState, useEffect } from "react";
import { Device } from "../../types/types";
import {
  StorageUnit,
  DeviceFormState,
  DeviceCategory,
  ActionType,
} from "../../types/types";

import { parseStorage } from "../../utils/utils";

type DeviceFormProps = {
  open: boolean;
  onClose: () => void;
  onSave: (device: DeviceFormState) => void;
  actionType: ActionType;
  loading: boolean;
  error?: string | null;
  initialData?: Device;
};

const INITIAL_DEVICE_VALUE: DeviceFormState = {
  name: "",
  price: null,
  category: DeviceCategory.Other,
  color: "",
  storageSize: null,
  storageUnit: StorageUnit.GB,
};

const DeviceForm: React.FC<DeviceFormProps> = ({
  open,
  onClose,
  onSave,
  actionType,
  initialData,
}) => {
  const [device, setDevice] = useState<DeviceFormState>(INITIAL_DEVICE_VALUE);

  useEffect(() => {
    if (!initialData) {
      setDevice(INITIAL_DEVICE_VALUE);
      return;
    }
  
    const { storageSize, storageUnit } = parseStorage(
      initialData.capacity as string
    );
  
    setDevice({
      name: initialData.name || "",
      price: (initialData.price as number) ?? null,
      category:
        (initialData.category as DeviceCategory) || DeviceCategory.Other,
      color: (initialData.color as string) || "",
      storageSize,
      storageUnit,
    });
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setDevice((prevDevice) => ({ ...prevDevice, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(device);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Add New Device</h2>

        <form onSubmit={handleSubmit}>
          <input
            className="w-full p-2 border rounded-md mb-3"
            type="text"
            name="name"
            placeholder="Name"
            value={device.name}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-2 border rounded-md mb-3"
            type="number"
            name="price"
            min="1"
            max="10000000"
            placeholder="Price"
            value={device.price ?? ""}
            onChange={handleChange}
            required
          />

          <select
            className="w-full p-2 border rounded-md mb-3"
            name="category"
            value={device.category}
            onChange={handleChange}
          >
            {Object.values(DeviceCategory).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <input
            className="w-full p-2 border rounded-md mb-3"
            type="text"
            name="color"
            placeholder="Color"
            value={device.color}
            onChange={handleChange}
            required
          />

          <div className="flex gap-2 mb-5">
            <input
              className="w-2/3 p-2 border rounded-md"
              type="number"
              name="storageSize"
              placeholder="Storage Size"
              min="1"
              max="1000000"
              value={device.storageSize ?? ""}
              onChange={handleChange}
              required
            />
            <select
              className="w-1/3 p-2 border rounded-md"
              name="storageUnit"
              value={device.storageUnit}
              onChange={handleChange}
            >
              {Object.values(StorageUnit).map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button className="text-gray-500" type="button" onClick={onClose}>
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              type="submit"
            >
             {actionType === ActionType.Create ? "Create" : "Edit"} 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeviceForm;
