import type { SVGProps } from 'react';
interface LicenseMaintenanceProps extends SVGProps<SVGSVGElement> {
  width?: string | number;
  height?: string | number;
  className?: string;
}

const LicenseMaintenance = ({
  width = 16,
  height = 16,
  className,
  ...props
}: LicenseMaintenanceProps) => {
  return (
    <svg
      {...props}
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8.00002 14.6667H7.00002C4.48584 14.6667 3.22875 14.6667 2.44771 13.8856C1.66665 13.1046 1.66667 11.8475 1.66669 9.33331L1.66671 6.66666C1.66673 4.15252 1.66674 2.89545 2.44779 2.11441C3.22884 1.33337 4.48591 1.33337 7.00002 1.33337H7.66662C10.1808 1.33337 11.4379 1.33337 12.219 2.11442C13 2.89547 13 4.15255 13 6.66671V7.33337"
        stroke="#C0C0C0"
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
      <path
        d="M4.66669 4.66663H10M4.66669 7.99996H7.66669"
        stroke="#C0C0C0"
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
      <path
        d="M11.6667 13.8484C12.8449 13.8484 13.8 12.8716 13.8 11.6666C13.8 10.4616 12.8449 9.48483 11.6667 9.48483M11.6667 13.8484C10.4885 13.8484 9.53333 12.8716 9.53333 11.6666C9.53333 10.4616 10.4885 9.48483 11.6667 9.48483M11.6667 13.8484V14.6666M11.6667 9.48483V8.66663M9.72753 10.4766L9.00027 10.0303M14.3333 13.303L13.6061 12.8567M13.6058 10.4766L14.3331 10.0303M9 13.303L9.7272 12.8567"
        stroke="#C0C0C0"
        strokeLinecap={'round'}
      />
    </svg>
  );
};

export default LicenseMaintenance;
