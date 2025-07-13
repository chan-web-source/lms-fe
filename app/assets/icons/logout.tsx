import React from 'react';
import type { SVG } from '.';

const Logout = (props: SVG) => {
  return (
    <svg
      {...props.svgProps}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.16667 2.5L8.61451 2.69487C6.46556 3.45333 5.39107 3.83257 4.77887 4.69785C4.16667 5.56313 4.16667 6.70258 4.16667 8.9815V11.0185C4.16667 13.2974 4.16667 14.4368 4.77887 15.3022C5.39107 16.1674 6.46556 16.5467 8.61451 17.3052L9.16667 17.5"
        stroke="#2D3139"
        strokeWidth={1.25}
        strokeLinecap={'round'}
      />
      <path
        d="M17.5 10H9.16667M17.5 10C17.5 9.41652 15.8381 8.3263 15.4167 7.91669M17.5 10C17.5 10.5835 15.8381 11.6738 15.4167 12.0834"
        stroke="#2D3139"
        strokeWidth={1.25}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
    </svg>
  );
};

export default Logout;
