import type { SVGProps } from 'react';
interface AuditProps extends SVGProps<SVGSVGElement> {
  width?: string | number;
  height?: string | number;
  className?: string;
}

const Audit = ({ width = 16, height = 16, className, ...props }: AuditProps) => {
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
        d="M15.8333 8.74349V8.32682C15.8333 5.18412 15.8333 3.61278 14.857 2.63646C13.8807 1.66016 12.3093 1.66016 9.16667 1.66016C6.02397 1.66016 4.45262 1.66016 3.47631 2.63646C2.5 3.61278 2.5 5.18412 2.5 8.32682V13.3268C2.5 14.88 2.5 15.6565 2.75373 16.2691C3.09205 17.0858 3.74096 17.7347 4.55773 18.0731C5.17029 18.3268 5.94686 18.3268 7.5 18.3268"
        stroke="#8E95A4"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.83331 5.82422H12.5M5.83331 9.15755H9.16665"
        stroke="#8E95A4"
        stroke-width="1.25"
        stroke-linecap="round"
      />
      <path
        d="M12.7354 15.8303C12.6863 15.0897 12.5983 14.2982 12.2347 13.4031C11.9246 12.6397 12.011 10.8438 13.75 10.8438C15.489 10.8438 15.5553 12.6397 15.2452 13.4031C14.8815 14.2982 14.8138 15.0897 14.7646 15.8303M17.5 18.3267H10V17.2886C10 16.9165 10.222 16.5895 10.544 16.4873L12.423 15.8908C12.557 15.8482 12.6957 15.8267 12.8351 15.8267H14.6649C14.8043 15.8267 14.943 15.8482 15.077 15.8908L16.956 16.4873C17.278 16.5895 17.5 16.9165 17.5 17.2886V18.3267Z"
        stroke="#8E95A4"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Audit;
