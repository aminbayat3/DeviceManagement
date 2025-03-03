import { render, screen, fireEvent } from "@testing-library/react";
import CreateDeviceForm from "../../CreateDeviceForm";
import { DeviceProvider } from "../../../context/DeviceContext";
import { StatusProvider } from "../../../context/StatusContext";

describe("CreateDeviceForm Component", () => {
  test("does not submit with missing required fields", async () => {
    const mockOnClose = jest.fn();

    render(
      <StatusProvider>
        <DeviceProvider>
          <CreateDeviceForm isOpen={true} onClose={mockOnClose} />
        </DeviceProvider>
      </StatusProvider>
    );

    fireEvent.click(screen.getByText("Create"));

    expect(
      await screen.findByText("Device name is required (max 50 chars).")
    ).toBeInTheDocument();
  });
 
});
