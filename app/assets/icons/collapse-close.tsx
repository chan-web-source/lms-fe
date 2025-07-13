import type { SVG } from '.';

const CollapseClose = (props: SVG) => {
  return (
    <svg
      {...props.svgProps}
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.1875 6.2627C20.9859 5.3739 20.6544 4.69889 20.1094 4.15389C18.7182 2.76269 16.479 2.76269 12.0006 2.76269C7.5223 2.76269 5.2831 2.76269 3.8919 4.15389C2.5007 5.54519 2.5007 7.78439 2.5007 12.2627C2.5007 16.741 2.5007 18.9802 3.8919 20.3715C5.2831 21.7627 7.5223 21.7627 12.0006 21.7627C16.479 21.7627 18.7182 21.7627 20.1094 20.3715C20.6544 19.8265 20.9859 19.1514 21.1875 18.2627"
        stroke="#2D3139"
        strokeWidth={1.5}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
      <path
        d="M18.5 15.2627L21.5 12.2627L18.5 9.2627M20.5 12.2627L13.5 12.2627"
        stroke="#2D3139"
        strokeWidth={1.5}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
      <path d="M9 21.7646L9 2.7647" stroke="#2D3139" strokeWidth={1.5} />
      <path d="M2.5 15.7646L9 15.7646M2.5 8.7647L9 8.7647" stroke="#2D3139" strokeWidth={1.5} />
    </svg>
  );
};

export default CollapseClose;
