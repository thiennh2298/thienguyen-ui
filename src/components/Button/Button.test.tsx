import React from "react";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("should render button with specific text", () => {
    render(<Button>Button</Button>);
    expect(screen.getByRole("button").textContent).toBe("Button");
  });
});
