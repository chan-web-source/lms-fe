import type { SVG } from '.';

const DownloadCircle = (props: SVG) => {
  return (
    <svg
      {...props.svgProps}
      width="33"
      height="33"
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5003 29.8327C23.8641 29.8327 29.8337 23.8631 29.8337 16.4993C29.8337 9.13555 23.8641 3.16602 16.5003 3.16602C9.13653 3.16602 3.16699 9.13555 3.16699 16.4993C3.16699 23.8631 9.13653 29.8327 16.5003 29.8327Z"
        stroke="#454545"
        strokeWidth={'2'}
      />
      <path
        d="M16.5003 21.8327V11.166M16.5003 21.8327C15.5667 21.8327 13.8224 19.1736 13.167 18.4993M16.5003 21.8327C17.4339 21.8327 19.1783 19.1736 19.8337 18.4993"
        stroke="#454545"
        strokeWidth={'2'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
    </svg>
  );
};

export default DownloadCircle;
