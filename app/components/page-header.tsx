import React, { type JSX } from 'react';
import pageHeaderBg from '~/assets/images/page-header-bg.png';

const PageHeader = ({
  title,
  icon,
  gradientColor,
  action,
}: {
  title: string | Array<string>;
  icon: JSX.Element;
  gradientColor?: string;
  action?: any;
}) => {
  const gradient =
    gradientColor ||
    // 'linear-gradient(to right, rgba(103, 21, 19, 0.90) 0.38%, rgba(171, 14, 16, 0.90) 99.97%)';
    ' linear-gradient(to right, rgba(140, 140, 140, 0.9) 0.50%, rgba(100, 100, 100, 0.9) 70%, rgba(80, 80, 80, 0.9) 99.97%) '
  return (
    <div
      className="relative w-full h-30 rounded-2xl overflow-hidden flex items-center px-6"
      style={{
        backgroundImage: `${gradient}, url(${pageHeaderBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center ',
      }}
    >
      <div className="relative z-10 flex text-white text-lg text-[28px] w-full justify-between">
        <div className="flex items-center gap-3">
          {icon}
          {Array.isArray(title) ? (
            <span className="flex items-center gap-1">
              {title.map((item, idx) => (
                <React.Fragment key={item}>
                  <span className={idx === title.length - 1 ? 'font-bold' : 'font-normal'}>
                    {item}
                  </span>
                  {idx !== title.length - 1 && <span className="mx-1 font-normal">/</span>}
                </React.Fragment>
              ))}
            </span>
          ) : (
            <span className="font-normal">{title}</span>
          )}
        </div>
        {action}
      </div>
    </div>
  );
};

export default PageHeader;
