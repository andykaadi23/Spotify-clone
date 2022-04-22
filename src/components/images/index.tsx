import "./style.css";

interface ImageProps{
  src: string
}

const ImageComponent: React.FC<ImageProps> = (props: ImageProps) => (
  <div className="img">
    <img src={props.src} alt="cover" />
  </div>
);

export default ImageComponent;