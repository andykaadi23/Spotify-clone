import { fireEvent, render, screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { Provider } from "react-redux";
import LandingComponent from "..";
import store from "../../redux/store/store";

const tracks = {
  items: [
    {
      album: {
        images: [
          {
            url: "https://i.scdn.co/image/ab67616d0000b273e8b066f70c206551210d902b",
          },
          {
            url: "https://i.scdn.co/image/ab67616d0000b273e8b066f70c206551210d902b",
          },
        ],
        name: "Bohemian Rhapsody (The Original Soundtrack)",
      },
      artists: [
        {
          name: "Queen",
        },
      ],
      id: "7xHATAMD7ezTZGYsNAMr5R",
      name: "Bohemian Rhapsody - Live Aid",
      uri: "spotify:track:7xHATAMD7ezTZGYsNAMr5R",
    },
  ],
};

const server = setupServer(
  rest.get("https://api.spotify.com/v1/search", (req, res, ctx) =>
    res(ctx.json({ tracks }))
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it("Should render track list", async () => {
  render(
    <Provider store={store}>
      <LandingComponent />
    </Provider>
  );
  const btnSearch = screen.getByTestId("btn-search");
  fireEvent.click(btnSearch);
  expect(await screen.findAllByTestId("track-component")).toHaveLength(1);
});
