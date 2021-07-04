/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import HomePage from "../pages/index.js";

describe("MyApp", () => {
  it("renders without crashing", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", { name: "Staking Rewards Viewer" })
    ).toBeInTheDocument();
  });
});