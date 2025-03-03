import React from "react";
import DeviceForm from "./common/DeviceForm";

import { useDeviceContext } from "../context/DeviceContext";

import { DeviceFormState, ActionType } from "../types/types";

interface CreateDeviceFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateDeviceForm: React.FC<CreateDeviceFormProps> = ({
  isOpen,
  onClose
}) => {
  const { createDevice } = useDeviceContext();

  const handleCreate = async (deviceData: DeviceFormState) => {
    const formattedDeviceData = {
      name: deviceData.name,
      data: {
        price: deviceData.price ?? undefined,
        category: deviceData.category ?? undefined,
        color: deviceData.color ?? undefined,
        storage: deviceData.storageSize
          ? `${deviceData.storageSize} ${deviceData.storageUnit}`
          : undefined,
      },
    };
    await createDevice(formattedDeviceData);
    onClose();
  };

  return (
    <DeviceForm
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleCreate}
      actionType={ActionType.Create}
    />
  );
};

export default CreateDeviceForm;
