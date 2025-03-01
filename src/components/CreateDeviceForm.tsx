import React from "react";
import DeviceForm from "./common/DeviceForm";

import { useApi } from "../hooks/useApi";

import { DeviceApiResponse, DeviceFormState, ActionType } from "../types/types";


interface CreateDeviceFormProps {
  open: boolean;
  onClose: () => void;
  refreshDevices: () => void;
}

const CreateDeviceForm: React.FC<CreateDeviceFormProps> = ({
  open,
  onClose,
  refreshDevices
}) => {
  const { apiRequest, loading, error } = useApi<DeviceApiResponse[]>("/objects");

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
    await apiRequest("POST", formattedDeviceData);
    refreshDevices();
    onClose();
  };

  return (
    <DeviceForm
      open={open}
      onClose={onClose}
      onSave={handleCreate}
      actionType={ActionType.Create}
      loading={loading}
      error={error}
    />
  );
};

export default CreateDeviceForm;
