import type { SVG } from '.';

const UserTime = (props: SVG) => {
  return (
    <svg
      {...props.svgProps}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.66667 5.33333C9.66667 3.49239 8.17427 2 6.33333 2C4.49239 2 3 3.49239 3 5.33333C3 7.17427 4.49239 8.66667 6.33333 8.66667C8.17427 8.66667 9.66667 7.17427 9.66667 5.33333Z"
        stroke="#CC6300"
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
      <path
        d="M1.66663 13.3333C1.66663 10.756 3.75597 8.66663 6.33329 8.66663C7.04903 8.66663 7.72709 8.82776 8.33329 9.11569"
        stroke="#CC6300"
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
      <path
        d="M12.6666 12L12 11.6667V10.6667M14.3333 11.6667C14.3333 12.9554 13.2886 14 12 14C10.7113 14 9.66663 12.9554 9.66663 11.6667C9.66663 10.378 10.7113 9.33337 12 9.33337C13.2886 9.33337 14.3333 10.378 14.3333 11.6667Z"
        stroke="#CC6300"
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
    </svg>
  );
};

export default UserTime;
