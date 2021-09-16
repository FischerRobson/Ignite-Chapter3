import { render, screen } from "@testing-library/react";
import { getSession } from "next-auth/client";
import { mocked } from "ts-jest/utils";
import Post, { getServerSideProps } from "../../pages/posts/[slug]";
import { getPrismicClient } from "../../services/prismic";

const post = {
  slug: "my-new-post",
  title: "My new post",
  content: "<p>content</p>",
  updatedAt: "16 set 2021",
}

jest.mock("../../services/prismic");
jest.mock("next-auth/client");

describe("Post page", () => {
  test("render correctly", () => {

    render(
      <Post post={post} />
    );

    expect(screen.getByText("My new post")).toBeInTheDocument();
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  test("redirects user if no subscription is found", async () => {

    const getSessionMocked = mocked(getSession);
    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: null,
    });

    const response = await getServerSideProps({
      req: {
        cookies: {}
      },
      params: {
        slug: ""
      }
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: {
          destination: "/",
          permanent: false
        }
      })
    );

  });

  test("load initial data (getServerSideProps)", async () => {

    const getSessionMocked = mocked(getSession);
    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: "fake-subscription",
    });

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

    const response = await getServerSideProps({
      req: {
        cookies: {}
      },
      params: {
        slug: ""
      }
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: "",
            title: "My new post",
            content: "<p>My post content</p>",
            updatedAt: "16 de setembro de 2021"
          }
        }
      })
    );

  });
});