import React from "react";
import Image from "../images";
import Contents from "../contents";
import Button from "../button/";
import './style.css';

interface CardProps{
  image_url: string
  title: string
  artist: string
  album: string
  selected: boolean
  onSelect: () => void;
  onDeselect: () => void;
}

const CardComponent: React.FC<CardProps> = (props: CardProps) => {
  const { image_url, title, artist, album, selected, onSelect, onDeselect } =
    props;
  return (
    <div className="card" data-testid="track-component">
      <div className="container">
        <Image src={image_url} />
        <Contents title={title} artist={artist} album={album} />
        <Button
          selected={selected}
          onSelect={onSelect}
          onDeselect={onDeselect}
        />
      </div>
    </div>
  );
}

export default CardComponent;
