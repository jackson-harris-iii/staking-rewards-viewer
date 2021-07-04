import { render, screen } from "@testing-library/react";
import App from "../../pages/index.js";

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: "Staking Rewards Viewer" })
    ).toBeInTheDocument();
  });
});