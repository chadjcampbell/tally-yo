import { describe, expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Login from "../routes/Login";
import { BrowserRouter } from "react-router-dom";

describe("Login page test", () => {
  test("should show header all the time", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const mainHeader = screen.getByText(/Tally Yo!/i);
    expect(mainHeader).toBeDefined();
  });
  test("show button should show password", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const pwInput = screen.getByPlaceholderText("password");
    expect(pwInput).toHaveProperty("type", "password");
    const showButton = screen.getByRole("button", { name: "Show" });
    fireEvent.click(showButton);
    expect(pwInput).toHaveProperty("type", "text");
  });
});
