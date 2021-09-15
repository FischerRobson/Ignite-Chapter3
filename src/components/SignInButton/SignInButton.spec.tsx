import { render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import { useSession } from "next-auth/client"
import { SignInButton } from ".";

jest.mock("next-auth/client");

describe("SignInButtonComponent", () => {
  test("render correctly when user is not authenticated", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(
      <SignInButton />
    );

    expect(screen.getByText("Sign in with Github")).toBeInTheDocument();
  });

  test("render correctly when user is authenticated", () => {

    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([{
      user: {
        name: "Jhon Doe",
        email: "jhondoe@gmail.com",
      },
      expires: "fake"
    }, false]);

    render(
      <SignInButton />
    );

    expect(screen.getByText("Jhon Doe")).toBeInTheDocument();
  });

});

