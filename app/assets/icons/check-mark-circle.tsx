import type { SVG } from '.';

export const CheckMarkCircle = (props: SVG) => {
  return (
    <svg
      {...props.svgProps}
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.3334 10.2611C18.3334 5.65869 14.6024 1.92773 10.0001 1.92773C5.39771 1.92773 1.66675 5.65869 1.66675 10.2611C1.66675 14.8634 5.39771 18.5944 10.0001 18.5944C14.6024 18.5944 18.3334 14.8634 18.3334 10.2611Z"
        stroke="#8E95A4"
        strokeWidth={'1.25'}
      />
      <path
        d="M6.66675 10.8861C6.66675 10.8861 8.00008 11.6465 8.66675 12.7611C8.66675 12.7611 10.6667 8.38607 13.3334 6.92773"
        stroke="#8E95A4"
        strokeWidth={'1.25'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
    </svg>
  );
};

export default CheckMarkCircle;
