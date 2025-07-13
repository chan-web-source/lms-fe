import type { SVG } from '.';

const Collapse = (props: SVG) => {
  return (
    <svg
      {...props.svgProps}
      width="24px"
      height="24px"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.8125 18.2627C3.01415 19.1515 3.34564 19.8265 3.89059 20.3715C5.28184 21.7627 7.52101 21.7627 11.9994 21.7627C16.4777 21.7627 18.7169 21.7627 20.1081 20.3715C21.4993 18.9802 21.4993 16.741 21.4993 12.2627C21.4993 7.78436 21.4993 5.54519 20.1081 4.15394C18.7169 2.7627 16.4777 2.7627 11.9994 2.7627C7.52101 2.7627 5.28184 2.7627 3.89059 4.15394C3.34564 4.6989 3.01415 5.37395 2.8125 6.26271"
        stroke="#2D3139"
        strokeWidth="1.5"
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
      <path
        d="M5.5 9.2627L2.5 12.2627L5.5 15.2627M3.5 12.2627H10.5"
        stroke="#2D3139"
        strokeWidth="1.5"
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
      <path d="M15 2.76074V21.7607" stroke="#2D3139" strokeWidth="1.5" />
      <path d="M21.5 8.76074H15M21.5 15.7607H15" stroke="#2D3139" strokeWidth="1.5" />
    </svg>
  );
};

export default Collapse;
