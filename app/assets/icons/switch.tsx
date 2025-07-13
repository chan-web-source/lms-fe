import type { SVG } from '.';

const Switch = (props: SVG) => {
  return (
    <svg
      {...props.svgProps}
      width="36"
      height="28"
      viewBox="0 0 36 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 9.99121C2 5.57293 5.58172 1.99121 10 1.99121H22C26.4183 1.99121 30 5.57293 30 9.99121C30 14.4095 26.4183 17.9912 22 17.9912H10C5.58172 17.9912 2 14.4095 2 9.99121Z"
        fill="#0062FF"
      />
      <g filter="url(#filter0_dd_2080_46929)">
        <circle cx="22" cy="9.99121" r="6" fill="white" />
      </g>
      <circle cx="22" cy="9.99121" r="2" fill="#0062FF" />
      <defs>
        <filter
          id="filter0_dd_2080_46929"
          x="8"
          y="-0.00878906"
          width="28"
          height="28"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.054902 0 0 0 0 0.0705882 0 0 0 0 0.105882 0 0 0 0.08 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2080_46929" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="4" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.105882 0 0 0 0 0.109804 0 0 0 0 0.113725 0 0 0 0.06 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_2080_46929"
            result="effect2_dropShadow_2080_46929"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_2080_46929"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Switch;
