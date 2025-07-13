import type { SVG } from '.';

const Unit = (props: SVG) => {
  return (
    <svg
      {...props.svgProps}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* stroke="#8E95A4" strokeWidth={"1.25"} */}
      <path
        d="M2.08337 9.99137C2.08337 6.25942 2.08337 4.39345 3.24274 3.23407C4.40212 2.07471 6.26809 2.07471 10 2.07471C13.732 2.07471 15.598 2.07471 16.7574 3.23407C17.9167 4.39345 17.9167 6.25942 17.9167 9.99137C17.9167 13.7233 17.9167 15.5893 16.7574 16.7487C15.598 17.908 13.732 17.908 10 17.908C6.26809 17.908 4.40212 17.908 3.24274 16.7487C2.08337 15.5893 2.08337 13.7233 2.08337 9.99137Z"
        stroke="#8E95A4"
        strokeWidth={'1.25'}
      />
      <path
        d="M9.16663 5.82471H14.1666"
        stroke="#8E95A4"
        strokeWidth={'1.25'}
        strokeLinecap={'round'}
      />
      <path
        d="M5.83337 5.82471H6.66671"
        stroke="#8E95A4"
        strokeWidth={'1.25'}
        strokeLinecap={'round'}
      />
      <path
        d="M5.83337 9.99121H6.66671"
        stroke="#8E95A4"
        strokeWidth={'1.25'}
        strokeLinecap={'round'}
      />
      <path
        d="M5.83337 14.1577H6.66671"
        stroke="#8E95A4"
        strokeWidth={'1.25'}
        strokeLinecap={'round'}
      />
      <path
        d="M9.16663 9.99121H14.1666"
        stroke="#8E95A4"
        strokeWidth={'1.25'}
        strokeLinecap={'round'}
      />
      <path
        d="M9.16663 14.1577H14.1666"
        stroke="#8E95A4"
        strokeWidth={'1.25'}
        strokeLinecap={'round'}
      />
    </svg>
  );
};

export default Unit;
