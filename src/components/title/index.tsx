import "./style.css";
import { Typography } from "@mui/material/";

interface TitleProps{
  title: string
}

const TitleComponent: React.FC<TitleProps> = (props: TitleProps) => {
  
  return (
    <Typography     
    variant="h6" 
    data-testid="display-title"
    sx={{
      color: "rgba(249, 211, 180, 1)",
      marginTop: 1,
      fontSize: '16px'
    }}
    >
      {props.title}
    </Typography>
  );
}

export default TitleComponent;
