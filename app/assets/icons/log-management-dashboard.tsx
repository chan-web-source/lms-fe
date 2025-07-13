import type { SVG } from '.';

const LogManagement = (props: SVG) => {
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
        d="M13.75 17.0729V18.0253M13.75 17.0729C12.9065 17.0729 12.1634 16.6521 11.7275 16.013M13.75 17.0729C14.5935 17.0729 15.3366 16.6521 15.7725 16.013M11.7275 16.013L10.8337 16.5967M11.7275 16.013C11.4697 15.635 11.3194 15.1806 11.3194 14.692C11.3194 14.2033 11.4697 13.7491 11.7274 13.3711M15.7725 16.013L16.6663 16.5967M15.7725 16.013C16.0302 15.635 16.1806 15.1806 16.1806 14.692C16.1806 14.2033 16.0303 13.7491 15.7726 13.3711M13.75 12.3111C14.5936 12.3111 15.3367 12.732 15.7726 13.3711M13.75 12.3111C12.9064 12.3111 12.1632 12.732 11.7274 13.3711M13.75 12.3111V11.3586M15.7726 13.3711L16.6667 12.7872M11.7274 13.3711L10.8333 12.7872"
        stroke="#ffff"
        strokeWidth={1.25}
        strokeLinecap={'round'}
      />
      <path
        d="M3.33333 3.02527H16.6667"
        stroke="#ffff"
        strokeWidth={1.25}
        strokeLinecap={'round'}
      />
      <path
        d="M3.33333 8.02527H16.6667"
        stroke="#ffff"
        strokeWidth={1.25}
        strokeLinecap={'round'}
      />
      <path
        d="M3.33333 13.0253H7.49999"
        stroke="#ffff"
        strokeWidth={1.25}
        strokeLinecap={'round'}
      />
    </svg>
  );
};

export default LogManagement;
