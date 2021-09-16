import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { Async } from ".";

test("render correctly", async () => {
  render(
    <Async />
  );

  expect(screen.getByText("Hello World")).toBeInTheDocument();
  expect(await screen.findByText("Button", {}, { timeout: 1000 })).toBeInTheDocument(); //espera a render 

  await waitFor(() => {
    return expect(screen.getByText("Button")).toBeInTheDocument();
  }, {
    timeout: 1000
  });

  //await waitForElementToBeRemoved(screen.queryByText("Button")); //para remoção de elementos

});