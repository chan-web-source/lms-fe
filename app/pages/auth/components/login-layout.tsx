import React from 'react';
import Logo from '~/assets/logo.png';
import LoginBg from '~/assets/images/login-bg.png';
import { Button } from '~/components/ui/button';

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Panel */}
      <div className="w-full lg:w-1/2 pl-11 flex flex-col justify-between pt-6 pb-6">
        <img src={Logo} alt="Logo" className="h-auto w-20 mb-6 ml-6" />

        <div className="max-w-[540px] w-full">{children}</div>

        <footer className="text-med text-black-200">
          © 2025 All Rights Reserved.
        </footer>
      </div>

      {/* Right Panel */}
      <div
        style={{ backgroundImage: `url(${LoginBg})` }}
        className="hidden lg:block w-1/2 bg-no-repeat bg-cover bg-left-top text-white p-12 rounded-l-3xl relative my-3"
      >
        {/* <div className="absolute inset-0 rounded-l-3xl bg-gradient-to-b from-[#671513]/90 to-[#AB0E10]/80 z-0" /> */}
        <div className="absolute inset-0 rounded-l-3xl bg-gradient-to-b from-[#2D3A3F]/90 to-[#1C2427]/80 z-0" />

        <div className="relative z-10 h-full flex flex-col">
          <h2 className="text-[30px] font-medium">LMS Licensing.</h2>
          <p className="text-[65px] font-medium leading-1.1">
            Shaping the Future <br></br> of Finance with  <br /> Equity and Safety
          </p>

          <div className="absolute bottom-4 right-4 text-sm">
            <p className="inline-block mr-2 text-[20px]">Having problems?</p>
            <Button
              className="w-46 rounded-[14px] text-[18px] cursor-pointer"
              onClick={() => window.open('mailto:ask@lms.gov.pg', '_blank')}
            >
              Contact us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
