import { render, screen, fireEvent } from "@testing-library/react";
import DeviceForm from "../../common/DeviceForm";
import { ActionType } from "../../../types/types";

describe("DeviceForm Component", () => {
  test("displays validation errors on incorrect input", async () => {
    const handleSave = jest.fn();
    render(
      <DeviceForm
        isOpen={true}
        onClose={jest.fn()}
        onSave={handleSave}
        actionType={ActionType.Create}
      />
    );

    const nameInput = screen.getByPlaceholderText("Name");
    fireEvent.change(nameInput, { target: { value: "a" } }); 
    fireEvent.change(nameInput, { target: { value: "" } }); 
    fireEvent.blur(nameInput); 

    expect(
      await screen.findByText("Device name is required (max 50 chars).")
    ).toBeInTheDocument();
  });

  test("submits form with valid data", async () => {
    const handleSave = jest.fn();
    render(
      <DeviceForm
        isOpen={true}
        onClose={jest.fn()}
        onSave={handleSave}
        actionType={ActionType.Create}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Test Device" },
    });
    fireEvent.change(screen.getByPlaceholderText("Price"), {
      target: { value: "100" },
    });
    fireEvent.change(screen.getByPlaceholderText("Storage Size"), {
        target: { value: "100" },
      });

    fireEvent.click(screen.getByText("Create"));
    expect(handleSave).toHaveBeenCalled();
  });
});
