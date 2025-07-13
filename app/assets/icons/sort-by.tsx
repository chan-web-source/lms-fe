import type { SVG } from '.';

const Sort = (props: SVG) => {
  return (
    <svg
      {...props.svgProps}
      width="21"
      height="21"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.29 4V13H18.54L15.54 16.75L12.54 13H14.79V4H16.29ZM10.29 14.5V16H3.54004V14.5H10.29ZM11.79 9.25V10.75H3.54004V9.25H11.79ZM11.79 4V5.5H3.54004V4H11.79Z"
        fill="#5B6271"
      />
    </svg>
  );
};

export default Sort;
