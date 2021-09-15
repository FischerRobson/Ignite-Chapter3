import { render, screen, fireEvent } from "@testing-library/react";
import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { mocked } from "ts-jest/utils";
import { SubscribeButton } from ".";

jest.mock("next-auth/client");
jest.mock("next/router");

describe("SubscribeButtonComponent", () => {
  test("render correctly", () => {

    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(
      <SubscribeButton />
    );

    expect(screen.getByText("Subscribe now")).toBeInTheDocument();
  });

  test("redirect user to signIn when not authenticated", () => {
    const signInMocked = mocked(signIn);

    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(
      <SubscribeButton />
    );

    const subscribeButton = screen.getByText("Subscribe now");

    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalled();
  });

  test("redirect to post when user already is subscripted", () => {
    const useRouterMocked = mocked(useRouter);
    const useSessionMocked = mocked(useSession);
    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce([{
      user: {
        name: "Jhon Doe",
        email: "jhondoe@gmail.com",
      },
      activeSubscription: "fake-active-subscription",
      expires: "fake"
    }, false]);

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any); //para ignorar as outras funcoes que nao sao utilizadas no componente

    render(
      <SubscribeButton />
    );

    const subscribeButton = screen.getByText("Subscribe now");

    fireEvent.click(subscribeButton);

    expect(pushMock).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith("/posts");
  });

});

