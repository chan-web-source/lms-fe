import type { SVG } from '.';

const Notifications = (props: SVG) => {
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
        d="M2.10826 11.995C1.93105 13.1226 2.72333 13.9052 3.69337 14.2952C7.41234 15.7905 12.5877 15.7905 16.3066 14.2952C17.2767 13.9052 18.0689 13.1226 17.8917 11.995C17.7828 11.3021 17.2443 10.7251 16.8453 10.1617C16.3227 9.4146 16.2708 8.59977 16.2707 7.73286C16.2707 4.3826 13.4632 1.66669 10 1.66669C6.53677 1.66669 3.72927 4.3826 3.72927 7.73286C3.72919 8.59977 3.67726 9.4146 3.15467 10.1617C2.7557 10.7251 2.21717 11.3021 2.10826 11.995Z"
        stroke="#2D3139"
        strokeWidth={1.25}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
      <path
        d="M7.5 17.5C8.16344 18.0183 9.03958 18.3333 10 18.3333C10.9604 18.3333 11.8366 18.0183 12.5 17.5"
        stroke="#2D3139"
        strokeWidth={1.25}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
    </svg>
  );
};

export default Notifications;
