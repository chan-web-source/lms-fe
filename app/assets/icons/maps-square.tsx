import type { SVG } from '.';

const MapsSquare = (props: SVG) => {
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
        d="M12.6072 11.4479C12.4667 11.5832 12.2789 11.6589 12.0834 11.6589C11.8879 11.6589 11.7 11.5832 11.5595 11.4479C10.2726 10.2009 8.54793 8.80785 9.38902 6.78541C9.84377 5.6919 10.9354 4.99219 12.0834 4.99219C13.2314 4.99219 14.3229 5.6919 14.7777 6.78541C15.6177 8.80527 13.8973 10.2051 12.6072 11.4479Z"
        stroke="#8E95A4"
        stroke-width="1.25"
      />
      <path
        d="M12.0834 7.91016H12.0909"
        stroke="#8E95A4"
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2.08337 9.99089C2.08337 6.25894 2.08337 4.39296 3.24274 3.23359C4.40212 2.07422 6.26809 2.07422 10 2.07422C13.732 2.07422 15.598 2.07422 16.7574 3.23359C17.9167 4.39296 17.9167 6.25894 17.9167 9.99089C17.9167 13.7228 17.9167 15.5888 16.7574 16.7482C15.598 17.9076 13.732 17.9076 10 17.9076C6.26809 17.9076 4.40212 17.9076 3.24274 16.7482C2.08337 15.5888 2.08337 13.7228 2.08337 9.99089Z"
        stroke="#8E95A4"
        stroke-width="1.25"
      />
      <path
        d="M14.1667 17.4909L2.5 5.82422"
        stroke="#8E95A4"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.33337 11.6602L3.33337 16.6602"
        stroke="#8E95A4"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default MapsSquare;
