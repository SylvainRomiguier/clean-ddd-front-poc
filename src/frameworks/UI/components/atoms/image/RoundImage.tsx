import "./RoundImage.css";

export const RoundImage:React.FC<{urlString: string}> = ({urlString}) =>  <img
src={urlString}
className="round-image"
alt={urlString}
/>