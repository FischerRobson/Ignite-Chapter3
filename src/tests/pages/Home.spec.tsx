import { render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import Home, { getStaticProps } from "../../pages";
import { stripe } from "../../services/stripe";

jest.mock("next/router");
jest.mock("next-auth/client", () => {
  return {
    useSession() {
      return [null, false];
    }
  }
});
jest.mock("../../services/stripe");

describe("Home page", () => {
  test("renders correctly", () => {
    render(
      <Home product={{ priceId: "fake", amount: 10 }} />
    );

    expect(screen.getByText("for 10 month")).toBeInTheDocument();
  });

  test("load initial data (getStaticProps)", async () => {
    const retriveStripePricesMocked = mocked(stripe.prices.retrieve);

    retriveStripePricesMocked.mockResolvedValueOnce({
      id: 'fake-id',
      unit_amount: 1000
    } as any); //resolved para funcoes assincronas

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: "fake-id",
            amount: "$10.00",
          },
        },
      })
    );

  });
});