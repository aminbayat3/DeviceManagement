import React, { useState, useMemo } from "react";
import { Device } from "../types/types";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

type DeviceListProps = {
  devices: Device[];
  onEditDevice: (device: Device) => void;
  onDeleteDevice: (device: Device) => void;
  onAddDevice: () => void;
};

const DeviceList: React.FC<DeviceListProps> = ({ devices, onEditDevice, onDeleteDevice, onAddDevice }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDevices = useMemo(() => {
    if (!searchTerm) return devices;

    return devices.filter(
      (device) =>
        device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (device.category?.toLowerCase() ?? "").includes(
          searchTerm.toLowerCase()
        )
    );
  }, [devices, searchTerm]);

  return (
    <section className="bg-white shadow-md rounded-lg p-6">
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <input
            type="text"
            placeholder="Search by Name or Category..."
            className="w-full sm:w-2/3 lg:w-1/3 p-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={onAddDevice}
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
          >
            + Add Device
          </button>
        </div>

        <div className="grid grid-cols-6 gap-4 border-b-2 pb-2 font-bold text-gray-700">
          <span>Name</span>
          <span>Price</span>
          <span>Category</span>
          <span>Color</span>
          <span>Storage</span>
          <span className="text-center">Actions</span>
        </div>

        {filteredDevices.length > 0 ? (
          filteredDevices.map((device) => (
            <div
              key={device.id}
              className="grid grid-cols-6 gap-4 items-center py-2 border-b last:border-b-0 text-gray-900"
            >
              <span>{device.name}</span>
              <span>{device.price ? `$${device.price}` : "Not Set"}</span>
              <span>{device.category ?? "Not Set"}</span>
              <span>{device.color ?? "Not Set"}</span>
              <span>{device.capacity ?? "Not Set"}</span>
              <div className="flex gap-3 justify-center">
                <PencilSquareIcon
                  className="h-6 w-6 text-blue-500 hover:text-blue-700 cursor-pointer"
                  onClick={() => onEditDevice(device)}
                />
                <TrashIcon
                  className="h-6 w-6 text-red-500 hover:text-red-700 cursor-pointer"
                  onClick={() => onDeleteDevice(device)}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-4">No devices found.</p>
        )}
      </div>
    </section>
  );
};

export default DeviceList;
