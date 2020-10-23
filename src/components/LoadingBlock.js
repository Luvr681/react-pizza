import React from "react";
import ContentLoader from "react-content-loader";

function LoadingBlock(props) {
  return (
    <ContentLoader 
      className='pizza-block'
      speed={2}
      width={350}
      height={460}
      viewBox="0 0 280 460"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <circle cx="138" cy="115" r="115" /> 
      <rect x="2" y="244" rx="3" ry="3" width="280" height="26" /> 
      <rect x="6" y="282" rx="3" ry="3" width="280" height="84" /> 
      <rect x="7" y="377" rx="0" ry="0" width="120" height="43" /> 
      <rect x="159" y="377" rx="9" ry="9" width="120" height="43" />
    </ContentLoader>  
  );
}

export default LoadingBlock;

