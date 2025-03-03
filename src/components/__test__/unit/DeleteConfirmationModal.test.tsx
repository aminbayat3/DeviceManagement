import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DeleteConfirmationModal from "../../DeleteDeviceModal";
import { DeviceProvider } from "../../../context/DeviceContext";
import { StatusProvider } from "../../../context/StatusContext";
import { Device } from "../../../types/types";

const mockDevice: Device = {
  id: "200",
  name: "Old Device",
  price: 200,
  color: "Black",
  capacity: "512GB",
};

describe("DeleteConfirmationModal Component", () => {
  test("closes the modal when clicking Cancel", async () => {
    const mockOnClose = jest.fn();

    render(
      <StatusProvider>
        <DeviceProvider>
          <DeleteConfirmationModal
            isOpen={true}
            onClose={mockOnClose}
            deletingDevice={mockDevice}
          />
        </DeviceProvider>
      </StatusProvider>
    );

    fireEvent.click(screen.getByText("Cancel"));

    await waitFor(() => expect(mockOnClose).toHaveBeenCalled());
  });

  test("displays correct device name in delete modal", () => {
    render(
      <StatusProvider>
        <DeviceProvider>
          <DeleteConfirmationModal
            isOpen={true}
            onClose={jest.fn()}
            deletingDevice={mockDevice}
          />
        </DeviceProvider>
      </StatusProvider>
    );

    expect(
      screen.getByText(/Are you sure you want to delete/i)
    ).toBeInTheDocument();
    expect(screen.getByText(mockDevice.name)).toBeInTheDocument();
  });
});
