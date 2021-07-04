/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import HomePage from "../pages/index.js";

describe("Staking Rewards Viewer Homepage", () => {
  it("renders without crashing", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", { name: "Staking Rewards Viewer" })
    ).toBeInTheDocument();
  });

  //write test for search button

  //write test for new wallet adress entry

  //write test to mock search request/render summary

  //write test to render daily dot data

  // write test for chart interaction
});