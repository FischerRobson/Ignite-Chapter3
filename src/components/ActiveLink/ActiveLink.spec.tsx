import { render, screen } from "@testing-library/react";
import { ActiveLink } from ".";

jest.mock("next/dist/client/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      }
    }
  }
}); //mock do useRouter do Next

describe("ActiveLinkComponent", () => {
  test("active link render correctly", () => {
    const { debug, getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );

    debug();
    expect(getByText("Home")).toBeInTheDocument();
  });

  test("active link is receiving active class", () => {
    // const { debug, getByText } = render(
    //   <ActiveLink href="/" activeClassName="active">
    //     <a>Home</a>
    //   </ActiveLink>
    // );

    // debug();

    render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    )

    expect(screen.getByText("Home")).toHaveClass("active");
  });
});

