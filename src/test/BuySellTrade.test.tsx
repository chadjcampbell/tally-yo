import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import BuySellTrade from "../routes/BuySellTrade";

describe("Conditional rendering of loading", () => {
  test("should show loading if userInfo is undefined", () => {
    render(
      <BrowserRouter>
        <BuySellTrade />
      </BrowserRouter>
    );
    const loadingDiv = screen.getByText(/Loading.../i);
    expect(loadingDiv).toBeDefined();
  });
});
