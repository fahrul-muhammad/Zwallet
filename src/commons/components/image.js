import { useState } from "react";
import Image from "next/image";
import Default from "../../commons/images/dummy-profile.png";

export const ImageComponent = (props) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const onImageLoaded = () => {
    setLoaded(true);
  };

  const onImageError = () => {
    setError(true);
  };

  /* 
  this.state.isError == val.id ? Default : process.env.NEXT_PUBLIC_IMAGE + val.image
  */

  let imgSrc = props.image === null ? Default : !error ? process.env.NEXT_PUBLIC_IMAGE + props.image : Default;

  return (
    <>
      <Image
        src={imgSrc}
        onLoad={() => {
          onImageLoaded();
        }}
        onError={() => {
          onImageError();
        }}
        width={props.width}
        height={props.height}
        alt="Images"
      />
    </>
  );
};
