import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import PercentBox from "../components/PercentBox";

const green = "rgb(19, 115, 51)";
const red = "rgb(165, 14, 14)";

describe("PercentBox component", () => {
  test("should display the proper percentage passed", () => {
    render(<PercentBox percent={5} />);
    const percentNum = screen.getByText("5%");
    expect(percentNum).toBeDefined();
  });
  test("should display color green if positive", () => {
    render(<PercentBox percent={5} />);
    const percentNum = screen.getByText("5%");
    const style = window.getComputedStyle(percentNum);
    expect(style.color).toBe(green);
  });
  test("should display color red if negative", () => {
    render(<PercentBox percent={-5} />);
    const percentNum = screen.getByText("-5%");
    const style = window.getComputedStyle(percentNum);
    expect(style.color).toBe(red);
  });
});
