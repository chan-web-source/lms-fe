import type { SVGProps } from 'react';
interface RoadLocationProps extends SVGProps<SVGSVGElement> {
  width?: string | number;
  height?: string | number;
  className?: string;
}

const RoadLocation = ({ width = 16, height = 16, className, ...props }: RoadLocationProps) => {
  return (
    <svg
      {...props}
      width={width}
      height={height}
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.4167 12.4922H13.75M10.8334 12.4922H9.16671M6.25004 12.4922H4.58337"
        stroke="#8E95A4"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.99996 1.66016C8.15901 1.66016 6.66663 3.16759 6.66663 5.0271C6.66663 6.09037 7.08329 6.91711 7.91663 7.65557C8.50404 8.17608 9.21563 9.04066 9.64279 9.74141C9.84771 10.0775 10.1375 10.0775 10.3571 9.74141C10.806 9.05457 11.4959 8.17608 12.0833 7.65557C12.9166 6.91711 13.3333 6.09037 13.3333 5.0271C13.3333 3.16759 11.8409 1.66016 9.99996 1.66016Z"
        stroke="#8E95A4"
        stroke-width="1.25"
        stroke-linejoin="round"
      />
      <path
        d="M10 4.99219H10.0075"
        stroke="#8E95A4"
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.8333 6.66016C16.4787 6.78506 16.9656 6.99351 17.357 7.3414C18.3333 8.20935 18.3333 9.60624 18.3333 12.4002C18.3333 15.194 18.3333 16.5909 17.357 17.4589C16.3807 18.3268 14.8093 18.3268 11.6666 18.3268H8.33329C5.19059 18.3268 3.61925 18.3268 2.64293 17.4589C1.66663 16.5909 1.66663 15.194 1.66663 12.4002C1.66663 9.60624 1.66663 8.20934 2.64293 7.3414C3.03428 6.99351 3.52121 6.78506 4.16663 6.66016"
        stroke="#8E95A4"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default RoadLocation;
