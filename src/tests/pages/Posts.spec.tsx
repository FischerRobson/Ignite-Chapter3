import { render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import Posts, { getStaticProps } from "../../pages/posts";
import { getPrismicClient } from "../../services/prismic";

const post = {
  slug: "my-new-post",
  title: "My new post",
  excerpt: "excerpt",
  updatedAt: "16 set 2021",
}

const posts = [
  post
];

jest.mock("../../services/prismic");

describe("Posts page", () => {
  test("render correctly", () => {

    render(
      <Posts posts={posts} />
    );

    expect(screen.getByText("My new post")).toBeInTheDocument();
  });

  test("load initial data (getStaticProps)", async () => {

    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce(
        {
          results: [
            {
              uid: "my-new-post",
              data: {
                title: [
                  { type: "Heading", text: "My new post" },
                ],
                content: [
                  { type: "paragraph", text: "My post content" },
                ],
              },
              last_publication_date: "09-16-2021",
            },
          ]
        })
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "my-new-post",
              title: "My new post",
              excerpt: "My post content",
              updatedAt: "16 de setembro de 2021"
            },
          ]
        },
      })
    );

  });
});