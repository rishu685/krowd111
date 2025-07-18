import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { useStateContext } from '../context';
import { CustomButton } from './';
import { logo, menu, search, thirdweb } from '../assets';
import { navlinks } from '../constants';

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext();

  return (
    <div className="md:z-50 max-w-[100%] mobile:mt-[-10px]] mobile:mb-[1rem] flex md:flex-row flex-col-reverse justify-between mt-[0.35rem] mb-[35px] mobile:gap-[2rem] lg:gap-6">
      <div id="searchBar" className="shadow-[0px_6px_24px_[#0a0a0f]] mobile:rounded-[8px] mx-auto lg:flex-1 flex flex-row w-[98%] py-2 pl-4 pr-2 h-[48px] bg-[#0f0f14] rounded-[100px]">
        <input type="text" placeholder="Search for campaigns..." className="flex w-full font-epilogue font-normal text-[16px] placeholder:text-[#3b3b44] text-white bg-transparent outline-none" />
        
        <div className="mobile:rounded-[8px] w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
          <img src={search} alt="search" className="w-[15px] h-[15px] object-contain"/>
        </div>
      </div>

      {/* Small screen navigation */}
        <div className="mobile:mt-[-15px] mobile:mb-2 w-[96%] mx-auto sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#1c1c24] flex justify-center items-center cursor-pointer">
            <Link className="flex items-center justify-center" to="/">
              <img src={logo} alt="user" className="w-[60%] h-[60%] object-contain" />
              </Link>
          </div>

          <img 
            src={menu}
            alt="menu"
            className="w-[34px] h-[34px] object-contain cursor-pointer"
            onClick={() => setToggleDrawer((prev) => !prev)}
          />

          <div className={`shadow-navbar rounded-xl absolute top-[60px] right-0 left-0 bg-[#0f0f14] z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>
            <ul className="mb-4">
              {navlinks.map((link) => (
                <li
                  key={link.name}
                  className={`flex p-4 ${isActive === link.name && 'bg-[#14141e]'}`}
                  onClick={() => {
                    setIsActive(link.name);
                    setToggleDrawer(false);
                    navigate(link.link);
                  }}
                >
                  <img 
                    src={link.imgUrl}
                    alt={link.name}
                    className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0' : 'grayscale'}`}
                  />
                  <p className={`ml-[20px] font-epilogue font-semibold text-[14px] ${isActive === link.name ? 'text-[#1dc071]' : 'text-[#606070]'}`}>
                    {link.name}
                  </p>
                </li>
              ))}
            </ul>

            <div className="flex mx-4">
            <CustomButton 
              btnType="button"
              title={address ? 'Create a campaign' : 'Connect'}
              styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
              handleClick={() => {
                if(address) navigate('create-campaign')
                else connect();
              }}
            />
            </div>
          </div>
        </div>
    </div>
  )
}

export default Navbar