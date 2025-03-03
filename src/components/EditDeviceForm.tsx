import React from "react";
import DeviceForm from "./common/DeviceForm";
import { useDeviceContext } from "../context/DeviceContext";

import {
  DeviceFormState,
  ActionType,
  Device,
} from "../types/types";

interface EditDeviceFormProps {
  isOpen: boolean;
  onClose: () => void;
  editingDevice: Device | null;
}

const EditDeviceForm: React.FC<EditDeviceFormProps> = ({
  isOpen,
  onClose,
  editingDevice,
}) => {
  const { updateDevice } = useDeviceContext();

  const handleEdit = async (updatedDevice: DeviceFormState) => {
    const formattedDeviceData = {
      name: updatedDevice.name,
      data: {
        price: updatedDevice.price ?? undefined,
        category: updatedDevice.category ?? undefined,
        color: updatedDevice.color ?? undefined,
        storage: updatedDevice.storageSize
          ? `${updatedDevice.storageSize} ${updatedDevice.storageUnit}`
          : undefined,
      },
    };
    if (!editingDevice) return;
    await updateDevice(editingDevice.id, formattedDeviceData);
    onClose();
  };

  return (
    <DeviceForm
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleEdit}
      actionType={ActionType.Edit}
      initialData={editingDevice}
    />
  );
};

export default EditDeviceForm;
