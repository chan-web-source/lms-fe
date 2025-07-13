import type { SVG } from '.';

const PaymentMethod = (props: SVG) => {
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
        d="M2.78809 13.4916L13.4789 2.80078M15.5263 9.20656L13.6934 11.0395M12.1291 12.5851L11.3135 13.4007"
        stroke="#8E95A4"
        stroke-width="1.25"
        stroke-linecap="round"
      />
      <path
        d="M2.64589 13.4444C1.34069 12.1392 1.34069 10.0231 2.64589 8.71791L8.72475 2.63905C10.0299 1.33386 12.1461 1.33386 13.4512 2.63905L17.3547 6.54258C18.66 7.84778 18.66 9.96391 17.3547 11.2691L11.2759 17.3479C9.97074 18.6532 7.85461 18.6532 6.54942 17.3479L2.64589 13.4444Z"
        stroke="#8E95A4"
        stroke-width="1.25"
      />
      <path
        d="M3.33301 18.3242H16.6663"
        stroke="#8E95A4"
        stroke-width="1.25"
        stroke-linecap="round"
      />
    </svg>
  );
};
export default PaymentMethod;
