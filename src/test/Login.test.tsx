import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
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
});
