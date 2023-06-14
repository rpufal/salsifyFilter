import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

const BUTTON_TEXT = "Clear";
const CATEGORY_PROPERTY_ID = 3;
const OPERATOR_EQUALS_ID = "equals";
const PROPERTY_VALUE_ELECTRONICS = "electronics";

describe("App", () => {
  beforeEach(() => {
    render(<App />);
  });

  describe("Button rendering", () => {
    it("should render the Clear button", () => {
      expect(screen.getByText(BUTTON_TEXT)).toBeDefined();
    });
  });

  describe("Select rendering", () => {
    it("should render the first select element", () => {
      const selectElements = screen.getAllByRole("combobox");
      expect(selectElements).toHaveLength(1);
    });

    it("should render the second select element after choosing a category", () => {
      const selectElementsBefore = screen.getAllByRole("combobox");
      fireEvent.change(selectElementsBefore[0], { target: { value: CATEGORY_PROPERTY_ID } });
      const selectElementsAfter = screen.getAllByRole("combobox");
      expect(selectElementsAfter.length).toBeGreaterThan(selectElementsBefore.length);
    });

    it("should render the third select element after choosing a category and operator", () => {
      const selectElementsBefore = screen.getAllByRole("combobox");
      fireEvent.change(selectElementsBefore[0], { target: { value: CATEGORY_PROPERTY_ID } });
      const selectElementsAfterFirst = screen.getAllByRole("combobox");
      fireEvent.change(selectElementsAfterFirst[1], { target: { value: OPERATOR_EQUALS_ID } });
      const selectElementsAfterFinal = screen.getAllByRole("combobox");
      expect(selectElementsAfterFinal.length).toBeGreaterThan(selectElementsAfterFirst.length);
    });
  });

  describe("Filtering", () => {
    it("should reduce the number of rows after applying the filter", () => {
      const tableRowsBeforeFilter = screen.getAllByTestId("table-row");
      const selectElementsBefore = screen.getAllByRole("combobox");
      fireEvent.change(selectElementsBefore[0], { target: { value: CATEGORY_PROPERTY_ID } });
      const selectElementsAfterFirst = screen.getAllByRole("combobox");
      fireEvent.change(selectElementsAfterFirst[1], { target: { value: OPERATOR_EQUALS_ID } });
      const selectElementsAfterFinal = screen.getAllByRole("combobox");
      fireEvent.change(selectElementsAfterFinal[2], { target: { value: PROPERTY_VALUE_ELECTRONICS } });
      const tableRowsAfterFilter = screen.getAllByTestId("table-row");
      expect(tableRowsAfterFilter.length).toBeLessThan(tableRowsBeforeFilter.length);
    });

    it("should reset the filter and restore the original number of rows after clicking the Clear button", () => {
      const tableRowsBeforeFilter = screen.getAllByTestId("table-row");
      const selectElementsBefore = screen.getAllByRole("combobox");
      fireEvent.change(selectElementsBefore[0], { target: { value: CATEGORY_PROPERTY_ID } });
      const selectElementsAfterFirst = screen.getAllByRole("combobox");
      fireEvent.change(selectElementsAfterFirst[1], { target: { value: OPERATOR_EQUALS_ID } });
      const selectElementsAfterFinal = screen.getAllByRole("combobox");
      fireEvent.change(selectElementsAfterFinal[2], { target: { value: PROPERTY_VALUE_ELECTRONICS } });
      const tableRowsAfterFilter = screen.getAllByTestId("table-row");
      const clearButton = screen.getByText(BUTTON_TEXT);
      fireEvent.click(clearButton);
      const tableRowsAfterClear = screen.getAllByTestId("table-row");
      expect(tableRowsAfterFilter.length).toBeLessThan(tableRowsBeforeFilter.length);
      expect(tableRowsAfterFilter.length).toBeLessThan(tableRowsAfterClear.length);
      expect(tableRowsBeforeFilter.length).toBe(tableRowsAfterClear.length);
    });
  });
});
