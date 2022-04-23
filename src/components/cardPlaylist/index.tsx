import { Button, Typography } from '@mui/material/';

interface CardProps {
    playlistTitle: string;
    owner: string;
    playlist_url: string;
  } 

const CardPlaylistComponent: React.FC<CardProps> = (props: CardProps) => {
  const { playlistTitle, owner, playlist_url } = props;
  return (
    <div className="card" data-testid="track-component">
      <div className="container">
        <Typography 
        variant="h6" 
        align="center"
        sx={{
            fontWeight: 'bold',
            marginBottom: 10
          }}
        >
          {playlistTitle}
        </Typography>
        <Typography 

        align="center"
        sx={{
            marginBottom: 20
          }}
        >
          owner: {owner}
        </Typography>
        <Button color="primary" variant="contained" href={playlist_url}>
          Go to Playlist
        </Button>
      </div>
    </div>
  );
};

export default CardPlaylistComponent;