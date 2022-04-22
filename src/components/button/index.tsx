import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const UseStyles = makeStyles({
  btnSelect: {},
});

interface ButtonProps{
  selected: boolean
  onSelect: () => void;
  onDeselect: () => void;
}

const ButtonComponent: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { selected, onSelect, onDeselect } = props;
  const value = selected ? "Deselect" : "Select";
  const classes = UseStyles();

  return (
    <Button
      value={selected ? "Deselect" : "Select"}
      onClick={selected ? onDeselect : onSelect}
      className={classes.btnSelect}
      variant="contained"
      size="large"
      color={selected ? "secondary" : "primary"}
      endIcon={selected ? <RemoveCircleIcon /> : <AddCircleIcon />}
    >
      {value}
    </Button>
  );
}

export default ButtonComponent;
