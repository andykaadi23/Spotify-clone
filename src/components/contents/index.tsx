import Title from "../title";
import Album from "../album";

interface ContentProps{
  title: string
  artist: string
  album: string
}

const ContentComponent: React.FC<ContentProps> = (props: ContentProps) => {
  const { title, artist, album } = props;
  return (
    <div className="music-contents">
      <Title title={title} />
      <Album artist={artist} album={album} />
    </div>
  );
}

export default ContentComponent;
