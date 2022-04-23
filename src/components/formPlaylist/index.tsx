import axios from "axios";
import { useState } from "react";
import { TextField } from "@mui/material";
import { Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const UseStyles = makeStyles({
  btnSubmit: {
    display: "flex",
    padding: "10px 30px",
    "&:hover": {
      backgroundColor: "green",
    },
  },
});

interface FormPlaylistProps {
  userId: string;
  data: string[];
}

const FormPlaylistComponent: React.FC<FormPlaylistProps> = (
  props: FormPlaylistProps
) => {
  const { userId, data } = props;
  const token = `Bearer ${localStorage.getItem('token')}`;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const minimumTitle = 10;
  const minimumDescription = 20;
  const classes = UseStyles();

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleMyPlaylist = () => {
    localStorage.getItem('token') === ' '
      ? alert('Login First!')
      : (window.location.href = '/my-playlist');
  };

  const addToPlaylist = async (playlistId: string) => {
    try {
      const response = await axios.post(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          uris: data
        },
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const submitPlaylist = () => {
      try {
        axios
          .post(
            endpoint,
            {
              name: title,
              description,
              collaborative: false,
              public: false
            },
            {
              headers: {
                Authorization: token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
              }
            }
          )
          .then((response) => {
            addToPlaylist(response.data.id);
          });
      } catch (error) {
        console.error(error);
      }
    };

    setTitleError(false);
    setDescriptionError(false);

    if (title.length < minimumTitle) {
      setTitleError(true);
      alert('Minimum Title 10 Character');
    } else if (description.length < minimumDescription) {
      setDescriptionError(true);
      alert('Minimum Description 20 Character');
    } else {
      submitPlaylist();
      alert('Playlist Created!');
    }
  };

  return (
    <div>
      <form noValidate autoComplete="off">
        <Typography
          variant="h6"
          sx={{
            padding: "10px 30px",
            color: "rgba(249, 211, 180, 1)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Title
        </Typography>
        <TextField
          type="text"
          variant="filled"
          color="primary"
          label="Playlist Title"
          required
          error={titleError}
          onChange={handleTitle}
          sx={{
            marginLeft: 52,
            border: "none",
            color: "#a1a1a1",
            background: "#1f2123",
            width: 400,
            borderRadius: 3,
          }}
        />
        <Typography
          variant="h6"
          sx={{
            marginLeft: 8,
            padding: "10px 30px",
            color: "rgba(249, 211, 180, 1)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Description
        </Typography>
        <TextField
          type="text"
          variant="filled"
          color="primary"
          label="Playlist Description"
          required
          multiline
          rows={3}
          error={descriptionError}
          onChange={handleDescription}
          sx={{
            marginLeft: 52,
            border: "none",
            color: "#a1a1a1",
            background: "#1f2123",
            width: 400,
            borderRadius: 3,
          }}
        />
        <br />
        <Button
          onClick={handleSubmit}
          className={classes.btnSubmit}
          color="primary"
          variant="contained"
          size="large"
          sx={{
            marginTop: 3,
            marginLeft: 52,
          }}
        >
          Create
        </Button>
        <Button 
        onClick={handleMyPlaylist}
        className={classes.btnSubmit}
        color="primary"
        variant="contained"
        size="large"
        sx={{
            marginTop: 3,
            marginLeft: 52,
          }}
        >
          My Playlist
        </Button>
      </form>
    </div>
  );
};

export default FormPlaylistComponent;
