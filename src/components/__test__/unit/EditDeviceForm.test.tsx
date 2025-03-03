import { render, screen } from "@testing-library/react";
import EditDeviceForm from "../../EditDeviceForm";
import { DeviceProvider } from "../../../context/DeviceContext";
import { StatusProvider } from "../../../context/StatusContext";
import { Device } from "../../../types/types";

const mockDevice: Device = {
  id: "201",
  name: "Old Device",
  price: 200,
  color: "Black",
  capacity: "512GB",
};

describe("EditDeviceForm Component", () => {
  test("loads device data into form", async () => {
    render(
      <StatusProvider>
        <DeviceProvider>
          <EditDeviceForm
            isOpen={true}
            onClose={jest.fn()}
            editingDevice={mockDevice}
          />
        </DeviceProvider>
      </StatusProvider>
    );

    expect(screen.getByDisplayValue("Old Device")).toBeInTheDocument();
  });

  
});
