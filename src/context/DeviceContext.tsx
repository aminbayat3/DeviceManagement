import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
} from "react";
import { useApi } from "../hooks/useApi";

import { formatDeviceData } from "../utils/utils";
import { DeviceApiResponse, Device } from "../types/types";

interface DeviceContextProps {
  deviceList: Device[];
  fetchDevices: () => Promise<void>;
  createDevice: (deviceData: Omit<Device, "id">) => Promise<void>;
  updateDevice: (id: string, deviceData: Omit<Device, "id">) => Promise<void>;
  deleteDevice: (id: string) => Promise<void>;
}

const DeviceContext = createContext<DeviceContextProps | undefined>(undefined);

export const DeviceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [deviceList, setDeviceList] = useState<Device[]>([]);
  const { apiRequest } = useApi<DeviceApiResponse[]>("/objects");

  const fetchDevices = async () => {
    const response = await apiRequest("GET");
    if(response) setDeviceList(formatDeviceData(response))
  };

  const createDevice = async (deviceData: Omit<Device, "id">) => {
    await apiRequest("POST", deviceData);
    await fetchDevices();
  };

  const updateDevice = async (id: string, deviceData: Omit<Device, "id">) => {
    await apiRequest("PUT", deviceData, {}, `/objects/${id}`);
    await fetchDevices();
  };

  const deleteDevice = async (id: string) => {
    await apiRequest("DELETE", undefined, {}, `/objects/${id}`);
    await fetchDevices();
  };

  return (
    <DeviceContext.Provider
      value={{
        deviceList,
        fetchDevices,
        createDevice,
        updateDevice,
        deleteDevice,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};

export const useDeviceContext = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error("useDeviceContext must be used within a DeviceProvider");
  }
  return context;
};
