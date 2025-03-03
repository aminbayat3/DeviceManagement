import React, { useState, useEffect } from "react";
import { Device } from "../../types/types";
import {
  StorageUnit,
  DeviceFormState,
  DeviceCategory,
  ActionType,
} from "../../types/types";

import { parseStorage, validateDeviceForm } from "../../utils/utils";

type DeviceFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (device: DeviceFormState) => void;
  actionType: ActionType;
  initialData?: Device | null;
};

const POPULAR_COLORS = [
  "Black",
  "White",
  "Silver",
  "Gray",
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Purple",
  "Pink",
];

const INITIAL_DEVICE_VALUE: DeviceFormState = {
  name: "",
  price: null,
  category: DeviceCategory.Other,
  color: "Black",
  storageSize: null,
  storageUnit: StorageUnit.GB,
};

const DeviceForm: React.FC<DeviceFormProps> = ({
  isOpen,
  onClose,
  onSave,
  actionType,
  initialData,
}) => {
  const [device, setDevice] = useState<DeviceFormState>(INITIAL_DEVICE_VALUE);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

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
      color: (initialData.color as string) || "Black",
      storageSize,
      storageUnit,
    });
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDevice((prevDevice) => ({ ...prevDevice, [name]: value }));
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
    setErrors(validateDeviceForm({ ...device, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateDeviceForm(device);
    setErrors(validationErrors);
    setTouched({ name: true, price: true, storageSize: true }); 
    if (Object.keys(validationErrors).length > 0) return;
    onSave(device);
    setDevice(INITIAL_DEVICE_VALUE);
    setTouched({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">
          {actionType === ActionType.Create ? "Add New Device" : "Edit Device"}
        </h2>

        <form onSubmit={handleSubmit}>
          {touched.name && errors.name && (
            <p className="text-red-500 text-sm">{errors.name}</p>
          )}
          <input
            className={`w-full p-2 border rounded-md mb-3 ${
              touched.name && errors.name ? "border-red-500" : "border-gray-300"
            }`}
            type="text"
            name="name"
            placeholder="Name"
            value={device.name}
            onChange={handleChange}
            maxLength={50}
          />

          {touched.price && errors.price && (
            <p className="text-red-500 text-sm">{errors.price}</p>
          )}
          <input
            className={`w-full p-2 border rounded-md mb-3 ${
              touched.price && errors.price
                ? "border-red-500"
                : "border-gray-300"
            }`}
            type="number"
            name="price"
            min="1"
            max="10000000"
            placeholder="Price"
            value={device.price ?? ""}
            onChange={handleChange}
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

          <select
            className="w-full p-2 border rounded-md mb-3"
            name="color"
            value={device.color}
            onChange={handleChange}
          >
            {POPULAR_COLORS.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>

          {touched.storageSize && errors.storageSize && (
            <p className="text-red-500 text-sm">{errors.storageSize}</p>
          )}
          <div className="flex gap-2 mb-5">
            <input
              className={`w-2/3 p-2 border rounded-md ${
                touched.storageSize && errors.storageSize
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              type="number"
              name="storageSize"
              placeholder="Storage Size"
              min="1"
              max="1000000"
              value={device.storageSize ?? ""}
              onChange={handleChange}
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
              data-testid={actionType === ActionType.Create ? "create-button" : "edit-button"}
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
