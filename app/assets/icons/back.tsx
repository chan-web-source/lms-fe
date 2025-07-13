import type { SVG } from '.';

const Back = (props: SVG) => {
  return (
    <svg
      {...props.svgProps}
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.47595 14.9961H24.5235"
        stroke="#671513"
        strokeWidth={'1.78571'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
      <path
        d="M11.4281 20.9477C11.4281 20.9477 5.47579 16.5639 5.47577 14.9953C5.47576 13.4268 11.4281 9.04297 11.4281 9.04297"
        stroke="#671513"
        strokeWidth={'1.78571'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
    </svg>
  );
};

export default Back;
