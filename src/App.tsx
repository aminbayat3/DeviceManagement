import { useEffect, useState } from "react";

import CreateDeviceForm from "./components/CreateDeviceForm";
import EditDeviceForm from "./components/EditDeviceForm";
import DeleteConfirmationModal from "./components/DeleteDeviceModal";
import DeviceList from "./components/DeviceList";
import { useDeviceContext } from "./context/DeviceContext";
import { useStatusContext } from "./context/StatusContext";
import { useModalStatus } from "./hooks/useModalStatus";
import { Device } from "./types/types";

function App() {
  const { fetchDevices, deviceList } = useDeviceContext();
  const { isLoading, error, isSuccessful } = useStatusContext();
  const [editingDevice, setEditingDevice] = useState<Device | null>(null);
  const [deletingDevice, setDeletingDevice] = useState<Device>({} as Device);

  const {
    modal: isCreateFormOpen,
    open: openCreateForm,
    close: closeCreateForm,
  } = useModalStatus();
  const {
    modal: isEditFormOpen,
    open: openEditForm,
    close: closeEditForm,
  } = useModalStatus();
  const {
    modal: isDeleteModalOpen,
    open: openDeleteModal,
    close: closeDeleteModal,
  } = useModalStatus();

  useEffect(() => {
    const fetchAllDevices = async () => {
      await fetchDevices();
    };

    fetchAllDevices();
  }, []);

  const handleEditDevice = (device: Device) => {
    setEditingDevice(device);
    openEditForm();
  };

  const handleDeletePrompt = (device: Device) => {
    setDeletingDevice(device);
    openDeleteModal();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-blue-600 p-4 text-white shadow-md mb-4">
        <h1 className="text-xl font-bold text-center">
          📊 Device Management Dashboard
        </h1>
      </header>

      <main className="container flex-grow mx-auto p-6 flex-col">
      {isLoading && (
            <p role="status" className="text-center text-gray-600">
              Loading...
            </p>
          )}
          {error && (
            <p role="status" className="text-center text-red-500">
              {error}
            </p>
          )}
          {isSuccessful && (
            <p
              className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-3 rounded shadow-md"
              role="status"
            >
              Action completed successfully!
            </p>
          )}
        <section aria-labelledby="device-list-heading">
          <DeviceList
            devices={deviceList}
            onEditDevice={handleEditDevice}
            onDeleteDevice={handleDeletePrompt}
            onAddDevice={openCreateForm}
          />
        </section>

        <CreateDeviceForm isOpen={isCreateFormOpen} onClose={closeCreateForm} />
        <EditDeviceForm
          isOpen={isEditFormOpen}
          onClose={closeEditForm}
          editingDevice={editingDevice}
        />
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          deletingDevice={deletingDevice}
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
