import { fireEvent, render, screen } from "@testing-library/react";
import ImageComponent from "../images";
import ButtonComponent from "../button";
import TitleComponent from "../title";
import AlbumComponent from "../album";

test("Check Image", () => {
  render(<ImageComponent src={"https://i.scdn.co/image/ab67616d00001e02c5716278abba6a103ad13aa7"}/>);
  const trackCover = screen.getByRole("img");
  expect(trackCover).toHaveAttribute("src", "https://i.scdn.co/image/ab67616d00001e02c5716278abba6a103ad13aa7");
});

test("Check Track Title", () => {
  render(<TitleComponent title={"夜に駆ける"}/>);
  const trackTitle = screen.getByTestId("display-title");
  expect(trackTitle).toHaveTextContent("夜に駆ける")
});

test("Check Track Album", () => {
  render(<AlbumComponent artist={"YOASOBI"} album={"夜に駆ける"} />);
  const trackArtist = screen.getByTestId("display-artist");
  const trackAlbum = screen.getByTestId("display-album");
  expect(trackArtist).toHaveTextContent("YOASOBI");
  expect(trackAlbum).toHaveTextContent("夜に駆ける");
});

test("Check Button", () => {
  render(
    <ButtonComponent selected={"spotify:track:3dPtXHP0oXQ4HCWHsOA9js" === "spotify:track:3dPtXHP0oXQ4HCWHsOA9js"} onSelect={() => {}} onDeselect={() => {}} />
  );
  const Button = screen.getByRole("button");
  fireEvent.click(Button);
  expect(Button).toBeDisabled;
});