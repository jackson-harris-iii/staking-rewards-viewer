# staking-rewards-viewer

## Project Description :page_facing_up:

This project is a front-end viewer for The [staking-rewards-collector](https://github.com/w3f/staking-rewards-collector). It is an MVP built as a proposal for The [Front-End for Staking Rewards Collector](https://github.com/w3f/General-Grants-Program/blob/master/rfps/staking-rewards-collector-front-end.md) W3F grant propsed by JonasW3F.

## Mockup :crystal_ball:

![Mockup](mockup.png)

## Deliverables :nut_and_bolt:
- **Implementation of a user interface**:
  - **Query input parameters (from the users)**:
    - Addresses (multiple ones are supported by the code).
    - Start and end date
    - Does the user want price data linked to staking rewards?
    - What are the startBalances of each address?

  - **Data output viewer**:
    - The code produces a .csv and .json file which should be displayed in the browser.
    - Visualization for the varying number of input addresses.
    - Some sorting based on network / amount.
    - Search for specific entries like dates.
    - Option to download to local storage.
  - **Help page / buttons:**
    - Both the input query and output viewer should have several help buttons to give explanations for all users.

- **Compatibility**:
  - It should be easy to extend the underlying script and the UI should be flexible enough to incorporate that (e.g., adding another column in the data output).
- **Hosting**
    - Centralized and preferably decentralized (IPFS).
- **Testing**
    - Test if the code behaves as expected.
