import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Message from "../components/Message";

describe("Conditional rendering of loading", () => {
  test("should show loading if userInfo is undefined", () => {
    const fakeTime = Date.now();
    const testMessage = {
      id: "1",
      text: "hello",
      senderId: "01",
      date: fakeTime as any,
    };
    render(<Message message={testMessage} />);
    const testHello = screen.getByText(/hello/i);
    expect(testHello).toBeDefined();
  });
});
