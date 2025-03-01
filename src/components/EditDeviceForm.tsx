import React, { useEffect, useState } from "react";
import DeviceForm from "./common/DeviceForm";
import { useApi } from "../hooks/useApi";

import { DeviceApiResponse, DeviceFormState, ActionType, Device } from "../types/types";

import { formatDeviceData } from "../utils/utils";

interface EditDeviceFormProps {
  open: boolean;
  onClose: () => void;
  deviceId: string | null;
  refreshDevices: () => void;
}

const EditDeviceForm: React.FC<EditDeviceFormProps> = ({
  open,
  onClose,
  deviceId,
  refreshDevices
}) => {
  const {
    apiRequest,
    data: deviceData,
    loading,
    error,
  } = useApi<DeviceApiResponse[]>(deviceId ? `/objects?id=${deviceId}` : "");

  const [device, setDevice] = useState<Device>({} as Device);

  useEffect(() => {
    if (!deviceId) return;

    const fetchDevice = async () => {
      await apiRequest("GET");
    };

    fetchDevice(); 
  }, [deviceId, apiRequest]);

  useEffect(() => {
    if (deviceData) {
      setDevice(formatDeviceData(deviceData)[0]);
    }
  }, [deviceData]);

  const handleEdit = async (updatedDevice: DeviceFormState) => {
    if (!deviceId) return;
      await apiRequest("PUT", updatedDevice, {}, `/objects/${deviceId}`);
      refreshDevices();
      onClose();
  };

  return (
    <DeviceForm
      open={open}
      onClose={onClose}
      onSave={handleEdit}
      loading={loading}
      error={error}
      actionType={ActionType.Edit}
      initialData={device}
    />
  );
};

export default EditDeviceForm;
