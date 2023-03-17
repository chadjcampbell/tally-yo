import { expect, it } from "vitest";
import Contact from "../routes/Contact";

it("Is a static contact page", () => {
  const contact = <Contact />;
  expect(contact).toMatchSnapshot();
});
