import type { SVG } from '.';

const Sorting = ({ svgProps }: SVG) => {
  return (
    <svg
      {...svgProps}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Up arrow */}
      <path d="M14.1666 7.91667L9.99998 3.75L5.83331 7.91667H14.1666Z" fill={'#444955'} />
      {/* Down arrow */}
      <path d="M14.1666 12.0833L9.99998 16.25L5.83331 12.0833H14.1666Z" fill={'#444955'} />
    </svg>
  );
};

export default Sorting;
