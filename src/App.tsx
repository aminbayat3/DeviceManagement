import { useEffect, useState } from "react";

import CreateDeviceForm from "./components/CreateDeviceForm";
import EditDeviceForm from "./components/EditDeviceForm";
import DeviceList from "./components/DeviceList";
import { useApi } from "./hooks/useApi";
import { useModalStatus } from "./hooks/useModalStatus";
import { formatDeviceData } from "./utils/utils";
import { DeviceApiResponse, Device } from "./types/types";

function App() {
  const {
    data,
    loading,
    error,
    apiRequest: fetchDevices,
  } = useApi<DeviceApiResponse[]>("/objects");
  const [deviceList, setDeviceList] = useState<Device[]>([]);
  const [editingDeviceId, setEditingDeviceId] = useState<string | null>(null);

  const {
    modal: isCreateOpen,
    open: openCreate,
    close: closeCreate,
  } = useModalStatus();
  const {
    modal: isEditOpen,
    open: openEdit,
    close: closeEdit,
  } = useModalStatus();

  useEffect(() => {
    const fetchData = async () => {
      await fetchDevices("GET");
    };

    fetchData();
  }, [fetchDevices]);

  useEffect(() => {
    if (data) {
      setDeviceList(formatDeviceData(data));
    }
  }, [data]);

  const refreshDevices = async () => {
    await fetchDevices("GET");
  };

  const handleEditDevice = (id: string) => {
    setEditingDeviceId(id);
    openEdit();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-blue-600 p-4 text-white shadow-md mb-4">
        <h1 className="text-xl font-bold text-center">
          📊 Device Management Dashboard
        </h1>
      </header>

      <main className="container flex-grow mx-auto p-6">
        {loading && (
          <p className="text-center text-gray-600">Loading devices...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        <section aria-labelledby="device-list-heading">
          <DeviceList
            devices={deviceList}
            onEditDevice={handleEditDevice}
            onAddDevice={openCreate}
            refreshDevices={refreshDevices}
          />
        </section>

        <CreateDeviceForm
          open={isCreateOpen}
          onClose={closeCreate}
          refreshDevices={refreshDevices}
        />
        <EditDeviceForm
          open={isEditOpen}
          onClose={closeEdit}
          deviceId={editingDeviceId}
          refreshDevices={refreshDevices}
        />
      </main>

      <footer className="bg-gray-800 text-white text-center p-4 mt-6">
        <p>
          &copy; {new Date().getFullYear()} Device Dashboard. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
