import type { SVGProps } from 'react';
interface BuildingProps extends SVGProps<SVGSVGElement> {
  width?: string | number;
  height?: string | number;
  className?: string;
}

const Building = ({ width = 16, height = 16, className, ...props }: BuildingProps) => {
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
        d="M1.66669 18.3242H18.3334"
        stroke="#8E95A4"
        stroke-width="1.25"
        stroke-linecap="round"
      />
      <path
        d="M15 7.49219H11.6667C9.59835 7.49219 9.16669 7.92385 9.16669 9.99219V18.3255H17.5V9.99219C17.5 7.92385 17.0684 7.49219 15 7.49219Z"
        stroke="#8E95A4"
        stroke-width="1.25"
        stroke-linejoin="round"
      />
      <path
        d="M12.5 18.3268H2.5V4.16016C2.5 2.09182 2.93167 1.66016 5 1.66016H10C12.0683 1.66016 12.5 2.09182 12.5 4.16016V7.49349"
        stroke="#8E95A4"
        stroke-width="1.25"
        stroke-linejoin="round"
      />
      <path
        d="M2.5 4.99219H5M2.5 8.32552H5M2.5 11.6589H5"
        stroke="#8E95A4"
        stroke-width="1.25"
        stroke-linecap="round"
      />
      <path
        d="M12.5 10.8242H14.1667M12.5 13.3242H14.1667"
        stroke="#8E95A4"
        stroke-width="1.25"
        stroke-linecap="round"
      />
      <path
        d="M13.3333 18.3242V15.8242"
        stroke="#8E95A4"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Building;
