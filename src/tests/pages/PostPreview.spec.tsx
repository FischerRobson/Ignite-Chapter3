import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { mocked } from "ts-jest/utils";
import Post, { getStaticProps } from "../../pages/posts/preview/[slug]";
import { getPrismicClient } from "../../services/prismic";

const post = {
  slug: "my-new-post",
  title: "My new post",
  content: "<p>content</p>",
  updatedAt: "16 set 2021",
}

jest.mock("../../services/prismic");
jest.mock("next-auth/client");
jest.mock("next/dist/client/router");

describe("Post preview page", () => {
  test("render correctly", () => {

    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([null, false]);

    render(
      <Post post={post} />
    );

    expect(screen.getByText("My new post")).toBeInTheDocument();
    expect(screen.getByText("content")).toBeInTheDocument();
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument();
  });

  test("redirects user to full post when user is subscribed", async () => {

    const useSessionMocked = mocked(useSession);
    const useRouterMocked = mocked(useRouter);
    const pushMocked = jest.fn();

    useSessionMocked.mockReturnValueOnce([
      { activeSubscription: "fake-active-subscription" },
      false,
    ] as any);

    useRouterMocked.mockReturnValueOnce({
      push: pushMocked,
    } as any);

    render(<Post post={post} />);

    expect(pushMocked).toHaveBeenCalledWith("/posts/my-new-post");

  });

  test("load initial data (getStaticProps)", async () => {

    const getPrismicClientMocked = mocked(getPrismicClient);
    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            { type: "Heading", text: "My new post" },
          ],
          content: [
            { type: "paragraph", text: "My post content" },
          ],
        },
        last_publication_date: "09-16-2021"
      })
    } as any);

    const response = await getStaticProps({
      req: {
        cookies: {}
      },
      params: {
        slug: "my-new-post"
      }
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: "my-new-post",
            title: "My new post",
            content: "<p>My post content</p>",
            updatedAt: "16 de setembro de 2021"
          }
        }
      })
    );
  });

});