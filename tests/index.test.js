/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor, waitForElementToBeRemoved} from "@testing-library/react";
import HomePage from "../pages/index.js";
import SummaryContainer from "../Components/SummaryContainer";
import DotChart from '../Components/DotChart.js'
import data from './example.json'


describe('Homepage and Header Component Tests', () => {

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

describe('Search Component Tests', () => {

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

    await fireEvent.change(input, { target: { value: 'G1rrUNQSk7CjjEmLSGcpNu72tVtyzbWdUvgmSer9eBitXWf' }});

    expect(input.value).toBe('G1rrUNQSk7CjjEmLSGcpNu72tVtyzbWdUvgmSer9eBitXWf')

  });

  test("adds and removes additional input fields", () => {

    fireEvent.click(screen.getByLabelText("add address field"));

    const inputs = screen.getAllByPlaceholderText("search by wallet address(s)");

    expect(inputs.length).toBe(2);

    fireEvent.click(screen.getByLabelText("remove address field"));

    const updatedInputs = screen.getAllByPlaceholderText("search by wallet address(s)");

    expect(updatedInputs.length).toBe(1);

  });


});

describe('Dot Chart Component Tests', () => {

  test("renders DotChart without crashing", async () => {
    render(<DotChart input_data={['$','usd']}/>)
    await waitFor(() => {
      const chart = screen.getByLabelText("dot-chart-skeleton");
      expect(chart).toBeDefined();
    })
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

    render(<SummaryContainer setToggleExport={setToggleExport} toggleExport={toggleExport} data={data} handleExport={handleExport} currency={currency} isLoading={isLoading} theme={theme}/>);
  })

  test("renders SummaryContainer without crashing", () => {
    expect(
      screen.getByRole("heading", { name: "Summary" })
    ).toBeInTheDocument();
  });

  test("renders Summary Details table results", async () => {

    await waitFor(() => {
      const detailsTableRows = screen.getAllByLabelText("details-table-row");
      // the data array has one object for each address and the last item in the array alwasy contains the request details.
      expect(detailsTableRows.length).toBe(data.length - 1);
    })
  });

  test("renders day details cards for each address", async () => {

    await waitFor(() => {
      const detailsCards = screen.getAllByLabelText("day-details-card");
      // the data array has one object for each address and the last item in the array alwasy contains the request details.
      expect(detailsCards.length).toBe(data.length - 1);
    })
  });

  test("renders download button for export", async () => {

    await waitFor(() => {
      const exportButton = screen.getByText(/EXPORT/i)
      expect(exportButton).toBeTruthy();
    })

  });

});
