import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Message from "../components/Message";

describe("Message component", () => {
  test("shows message when passed valid prop", () => {
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
