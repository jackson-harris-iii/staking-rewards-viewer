/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor, waitForElementToBeRemoved} from "@testing-library/react";
import HomePage from "../pages/index.js";
import SummaryContainer from "../Components/SummaryContainer";
import data from './example.json'


describe('Homepage and header component tests', () => {

  beforeEach(() => {
    render(<HomePage />);
  })

  test("renders mainpage without crashing", () => {
    expect(
      screen.getByRole("heading", { name: "Staking Rewards Viewer" })
    ).toBeInTheDocument();
  });

  test("renders Polkadot Logo", () => {
    expect(
      screen.getByAltText("Polkadot Logo")
    ).toBeInTheDocument();
  });

  test("renders currency menu options", () => {

    fireEvent.click(screen.getByLabelText(/currency picker/i));

    expect(
      screen.getByText("BTC")
    ).toBeInTheDocument();
  });

});

//write test for search button
describe('search component tests', () => {

  beforeEach(() => {
    render(<HomePage />);
  })

  test("search for invalid wallet address responds with no result", async () => {
    fireEvent.click(screen.getByText('Search'))

    await waitForElementToBeRemoved(() => screen.getByLabelText(/summary container loading spinner/i))

    expect(
      screen.getByText("No Results Found")
    ).toBeInTheDocument();
  });


  test("Valid wallet address is accesible when entered", async () => {

    const input = screen.getAllByPlaceholderText("search by wallet address(s)")[0];

    await fireEvent.change(input, { target: { value: 'G1rrUNQSk7CjjEmLSGcpNu72tVtyzbWdUvgmSer9eBitXWf' } })

    expect(input.value).toBe('G1rrUNQSk7CjjEmLSGcpNu72tVtyzbWdUvgmSer9eBitXWf')
  //   fireEvent.click(screen.getByText('Search'))

  //   await waitForElementToBeRemoved(() => screen.getByLabelText(/summary container loading spinner/i))

  //   expect(
  //     screen.getByRole("heading", { name: "Summary" })
  //   ).toBeInTheDocument();
  });

  test("adds and removes additional input fields", () => {

    fireEvent.click(screen.getByLabelText("add address field"));

    const inputs = screen.getAllByPlaceholderText("search by wallet address(s)");

    expect(inputs.length).toBe(2)

    fireEvent.click(screen.getByLabelText("remove address field"));

    const updatedInputs = screen.getAllByPlaceholderText("search by wallet address(s)");

    expect(updatedInputs.length).toBe(1)

  });


});

describe('Summary Component Tests', () => {


  beforeEach(() => {
    let theme = {pink: '#E7007B'},
    handleExport = HomePage.handleExport,
    toggleExport = HomePage.toggleExport,
    setToggleExport = HomePage.setToggleExport,
    currency = ['$', 'USD'],
    isLoading = false;

    // {data, handleExport, toggleExport, setToggleExport, currency, isLoading, theme}
    render(<SummaryContainer setToggleExport={setToggleExport} toggleExport={toggleExport} data={data} handleExport={handleExport} currency={currency} isLoading={isLoading} theme={theme}/>);
  })

  test("renders SummaryContainer without crashing", () => {
    expect(
      screen.getByRole("heading", { name: "Summary" })
    ).toBeInTheDocument();
  });

});



//write test for new wallet adress entry

//write test to mock search request/render summary

//write test to render daily dot data

//write test for chart interaction

//write out test for modal interaction

//write out test for json interaction

//write out test for currency change