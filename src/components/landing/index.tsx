import CardComponent from "../card/index";
import React, { useState } from "react";
import axios from "axios";
import FormPlaylistComponent from "../formPlaylist/index";
import "./style.css";
import UserComponent from "../user";
import { TextField } from "@mui/material";
import { Button, Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from 'react';

const UseStyles = makeStyles({
  
  btnSearch: {
    "&:hover": {
      backgroundColor: "green",
    },
    alignContent: "center",
  },
  searchContainer: {
    display: "flex", 
  },
  TrackContainer: {
    paddingLeft: 30,
    paddingRight: 30
  }
});

  interface MusicProps {
    album: Album;
    artists: Artist[];
    id: string;          
    name: string;      
    uri: string;
  }
  
  interface Album {
    images: Image[];
    name: string;
  }
  
  interface Image {
    url: string;
  }
  
  interface Artist {
    name: string;
  }
  
  const CreatePlaylistComponent: React.FC = () => {
  const token = localStorage.getItem("token");
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [trackSelect, setSelectedTrack] = useState<string[]>([]);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const classes = UseStyles();

  const getQuery = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const auth = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .get(`https://api.spotify.com/v1/search?q=${search}&type=track`, auth)
      .then((response) => {
        console.log(response.data.tracks.items);
        setResult(response.data.tracks.items);
      });
  };

  const handleSearch = (query: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(query.target.value);
  };

  const handleSelect = (id: string) => {
    setSelectedTrack([...trackSelect, id]);
  };

  const handleDeselect = (id: string) => {
    const selectedTrack = trackSelect.filter((track) => track !== id);
    setSelectedTrack([...selectedTrack]);
  };

  useEffect(() => {
    const getUserDetail = async () => {
      try {
        const response = await axios.get('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        });
        setUserId(response.data.id);
        setProfilePic(response.data.images[0].url);
        setUserName(response.data.display_name);
      } catch (error) {
        console.error(error);
      }
    };
    getUserDetail();
  }, []);

  return (
      <div className="playlist-layout">
        <Container>
        <div className="grid-playlist">
        <div>
          <Typography 
          variant="h4"
          sx={{
            marginLeft: 42,
            display: 'flex',
            justifyContent: 'center',
            fontWeight: 400,
            color: "rgba(249, 211, 180, 1)",
          }}
          >
            Create Playlist
          </Typography>
          <FormPlaylistComponent
            userId={userId}
            data={trackSelect}
          />
        </div>
        <div className="user-container">
          <UserComponent userName={userName} profilePic={profilePic} />
        </div>
      </div>
      <Container maxWidth={false} disableGutters>
        <form noValidate autoComplete="off" onSubmit={getQuery}>
          <Container
            maxWidth={false}
            disableGutters
            className={classes.searchContainer}
          >
            <TextField              
              type="text"
              variant="filled"
              color="primary"
              label="Search Song"
              onChange={handleSearch}
              data-testid="search-bar"              
              sx={{ width: '71%', 
              marginLeft: 12, 
              marginTop: 8,
              marginRight: 3,
              borderRadius: 3,
              border: 'none',
              color: '#a1a1a1',
              background: '#1f2123',
              
            }}
            />
            <Button
              className={classes.btnSearch}
              onClick={getQuery}
              color="primary"
              variant="contained"
              size="large"
              endIcon={<SearchIcon />}
              data-testid="btn-search"
              sx={{ 
              marginTop: 9,
            }}
            >
              Search
            </Button>
          </Container>
        </form>
      </Container>
      </Container> 
      <br />
      <Container
        className={classes.TrackContainer}
        disableGutters
        maxWidth={false}
      >
      <div className="card-music">
        {result.map((music: MusicProps) => (
          <CardComponent
            key={music.id}
            image_url={music.album.images[1].url}
            title={music.name}
            artist={music.artists[0].name}
            album={music.album.name}
            selected={trackSelect.some((id) => id === music.uri)}
            onSelect={() => handleSelect(music.uri)}
            onDeselect={() => handleDeselect(music.uri)}
          />
        ))}
      </div>
      </Container>
    </div>
  );
};

export default CreatePlaylistComponent;
