import type { SVG } from '.';

const Unlink = (props: SVG) => {
  return (
    <svg
      {...props.svgProps}
      width="32"
      height="33"
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.9998 23.429H22.6665C26.3484 23.429 29.3332 20.4442 29.3332 16.7624C29.3332 13.0805 26.3484 10.0957 22.6665 10.0957H17.9998M13.9998 23.429H9.33317C5.65128 23.429 2.6665 20.4442 2.6665 16.7624C2.6665 13.0805 5.65128 10.0957 9.33317 10.0957H13.9998"
        stroke="#454545"
        strokeWidth={'2'}
        strokeLinecap={'round'}
      />
      <path
        d="M20.6668 28.7617L18.6668 26.7617M11.3335 28.7617L13.3335 26.7617M11.3335 4.76172L13.3335 6.76172M20.6668 4.76172L18.6668 6.76172"
        stroke="#454545"
        strokeWidth={'2'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
    </svg>
  );
};

export default Unlink;
