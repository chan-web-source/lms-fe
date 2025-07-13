import type { SVG } from '.';

const AddIcon = (props: SVG) => {
  return (
    <svg
      {...props.svgProps}
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.94941 5.94043V11.0419M10.5001 8.49115H5.39868"
        stroke="white"
        strokeWidth={'0.956522'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
      <path
        d="M14.3261 8.49107C14.3261 4.96925 11.4711 2.11426 7.94932 2.11426C4.4275 2.11426 1.57251 4.96925 1.57251 8.49107C1.57251 12.0129 4.4275 14.8679 7.94932 14.8679C11.4711 14.8679 14.3261 12.0129 14.3261 8.49107Z"
        stroke="white"
        strokeWidth={'0.956522'}
      />
    </svg>
  );
};

export default AddIcon;
