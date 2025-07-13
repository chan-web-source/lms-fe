import type { SVG } from '.';

const EditUnit = (props: SVG) => {
  return (
    <svg
      {...props.svgProps}
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.69086 15.0004C3.69086 9.66908 3.69086 7.00341 5.34709 5.34716C7.00334 3.69092 9.66902 3.69092 15.0004 3.69092C20.3317 3.69092 22.9974 3.69092 24.6537 5.34716C26.3099 7.00341 26.3099 9.66908 26.3099 15.0004C26.3099 20.3318 26.3099 22.9975 24.6537 24.6538C22.9974 26.31 20.3317 26.31 15.0004 26.31C9.66902 26.31 7.00334 26.31 5.34709 24.6538C3.69086 22.9975 3.69086 20.3318 3.69086 15.0004Z"
        stroke="#2D3139"
        strokeWidth={'1.78571'}
      />
      <path
        d="M13.81 9.04736H20.9529"
        stroke="#2D3139"
        strokeWidth={'1.78571'}
        strokeLinecap={'round'}
      />
      <path
        d="M9.0473 9.04736H10.2378"
        stroke="#2D3139"
        strokeWidth={'1.78571'}
        strokeLinecap={'round'}
      />
      <path
        d="M9.0473 15.0005H10.2378"
        stroke="#2D3139"
        strokeWidth={'1.78571'}
        strokeLinecap={'round'}
      />
      <path
        d="M9.0473 20.9526H10.2378"
        stroke="#2D3139"
        strokeWidth={'1.78571'}
        strokeLinecap={'round'}
      />
      <path
        d="M13.81 15.0005H20.9529"
        stroke="#2D3139"
        strokeWidth={'1.78571'}
        strokeLinecap={'round'}
      />
      <path
        d="M13.81 20.9526H20.9529"
        stroke="#2D3139"
        strokeWidth={'1.78571'}
        strokeLinecap={'round'}
      />
    </svg>
  );
};

export default EditUnit;
