import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
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

const FormPlaylistComponent = (props) => {
  const { userId, data } = props;
  const token = `Bearer ${useSelector((state) => state.token.token)}`;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const minimumTitle = 10;
  const minimumDescription = 20;
  const classes = UseStyles();

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const addToPlaylist = async (playlistId) => {
    try {
      const response = await axios.post(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          uris: data,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
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
              public: false,
            },
            {
              headers: {
                Authorization: token,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
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
      alert("Minimum Title 10 Character");
    } else if (description.length < minimumDescription) {
      setDescriptionError(true);
      alert("Minimum Description 20 Character");
    } else {
      submitPlaylist();
      alert("Playlist Created!");
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
            marginLeft: 64,
            border: "none",
            color: "#a1a1a1",
            background: "#1f2123",
            width: 400,
            boxShadow: "5px 5px 7px #1c1d1f, -5px -5px 7px #222527",
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
          className={classes.textField}
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
            marginLeft: 64,
            border: "none",
            color: "#a1a1a1",
            background: "#1f2123",
            width: 400,
            boxShadow: "5px 5px 7px #1c1d1f, -5px -5px 7px #222527",
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
            marginLeft: 64,
          }}
        >
          Create
        </Button>
      </form>
    </div>
  );
};

export default FormPlaylistComponent;
