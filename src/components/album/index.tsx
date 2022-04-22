import { Typography } from "@mui/material/";
import "./style.css";

interface AlbumProps{
  artist: string
  album: string
}

const AlbumComponent: React.FC<AlbumProps> = (props: AlbumProps) => {
  const { artist, album } = props;
  
  return (
    <div>
      <Typography 
      // className={classes.text} 
      variant="h6"
      data-testid="display-artist"
      sx={{
        color: "rgba(249, 211, 180, .7)",
        fontSize: "14px"
      }}
      >
        {artist}
      </Typography>
      <Typography 
      // className={classes.text} 
      variant="h6"
      data-testid="display-album"
      sx={{
        color: "rgba(249, 211, 180, .7)",
        fontSize: "14px",
        marginBottom: 1,
      }}
      >
        {album}
      </Typography>
    </div>
  );
}

export default AlbumComponent;
