import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DeviceProvider } from "../../../context/DeviceContext";
import { StatusProvider } from "../../../context/StatusContext";
import App from "../../../App";

describe("CreateDeviceForm Component", () => {
  test("creates a new device and displays it in the device list", async () => {
    render(
      <StatusProvider>
        <DeviceProvider>
          <App />
        </DeviceProvider>
      </StatusProvider>
    );

    fireEvent.click(screen.getByText("+ Add Device"));

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "New Device E" },
    });
    fireEvent.change(screen.getByPlaceholderText("Price"), {
      target: { value: "500" },
    });
    fireEvent.change(screen.getByPlaceholderText("Storage Size"), {
      target: { value: "128" },
    });

    fireEvent.click(screen.getByText("Create"));

    await waitFor(() => {
      expect(screen.getAllByText("New Device E")[0]).toBeInTheDocument();
    });
  });
});
