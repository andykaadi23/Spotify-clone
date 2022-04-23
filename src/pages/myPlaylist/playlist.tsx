import { Container, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import CardPlaylistComponent from '../../components/cardPlaylist';



interface MyPlaylistProps {
  id: string;
  external_urls: External;
  name: string;
  owner: Owner;
}

interface External {
  spotify: string;
}

interface Owner {
  display_name: string;
}

const MyPlaylistPage: React.FC = () => {
  const token = localStorage.getItem('token');
  const [myPlaylist, setMyPlaylist] = useState([]);

  useEffect(() => {
    const getUserPlaylist = async () => {
      try {
        const response = await axios.get(
          'https://api.spotify.com/v1/me/playlists',
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
          }
        );
        setMyPlaylist(response.data.items);
        console.log(response.data.items);
      } catch (error) {
        console.error(error);
      }
    };

    getUserPlaylist();
  }, []);

  return (
    <Container
    sx={{
      display: 'flex',
      position: 'relative',
      maxHeight: window.innerHeight,
      minHeight: '80vh',
      alignItems: 'center',
      flexDirection: 'column'
    }}
    >
      <Typography 
      variant="h4"
      sx={{
        marginLeft: 30,
        marginTop: 30,
        marginBottom: 20,
        fontWeight: 'bold'
      }}
      >
        My Playlist
      </Typography>
      <div className="card-music">
        {myPlaylist.map((playlist: MyPlaylistProps) => (
          <CardPlaylistComponent
            key={playlist.id}
            playlistTitle={playlist.name}
            owner={playlist.owner.display_name}
            playlist_url={playlist.external_urls.spotify}
          />
        ))}
      </div>
    </Container>
  );
};

export default MyPlaylistPage;