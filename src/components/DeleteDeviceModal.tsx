import React from "react";
import { useDeviceContext } from "../context/DeviceContext";

import { Device } from "../types/types";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  deletingDevice: Device;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  deletingDevice,
}) => {
  const { deleteDevice } = useDeviceContext();

  const handleDeleteDevice = async () => {
    await deleteDevice(deletingDevice.id);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
        <p className="mb-5">
          Are you sure you want to delete <strong>{deletingDevice.name}</strong>
          ?
        </p>

        <div className="flex justify-end gap-2">
          <button className="text-gray-500" type="button" onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            type="button"
            onClick={handleDeleteDevice}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
