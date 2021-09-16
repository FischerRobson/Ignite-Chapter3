import { render, screen } from "@testing-library/react";
import { Header } from ".";


jest.mock("next/dist/client/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      }
    }
  }
});

jest.mock("next-auth/client", () => {
  return {
    useSession() {
      return [null, false]
    }
  }
});

describe("HeaderComponent", () => {
  test("header render correctly", () => {
    render(
      <Header />
    );

    screen.logTestingPlaygroundURL(); //url do playground => sugeri querys de seleção de componentes

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Posts")).toBeInTheDocument();
  });

});

