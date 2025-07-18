import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { avatar, avatarnone, logo, sun, thirdweb } from '../assets';
import { useStateContext } from '../context';
import { CustomButton } from './';
import { navlinks } from '../constants';
import { Tooltip, Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Atropos from 'atropos/react';
import toast, { Toaster } from 'react-hot-toast';
import './sidebar.css'

const unavailableToast = () => toast('This feature is unavailable');
const connectWalletIcon = <FontAwesomeIcon icon={faEnvelope} />

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div className={`w-[48px] h-[48px] rounded-[10px] ${isActive && isActive === name && 'bg-[#1c1c24]'} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`} onClick={handleClick}>
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className="w-3/4 h-3/4" />
    ) : (
      <img src={imgUrl} alt="fund_logo" className={`hover:grayscale-0 hover:cursor-pointer w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`} />
    )}
  </div>
)

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const { connect, address } = useStateContext();

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link className="transition-all mt-2" to="/">
        <Icon styles="bg-[#1c1c24]" imgUrl={logo} />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#0f0f14] rounded-[20px] w-[70px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Atropos activeOffset={1} shadowScale={1} rotateYMax={-8} rotateXMax={-8} shadow={false} highlight={false} className="mobile:hidden rounded-xl hover:transition-all hover:shadow-[0_0px_35px_0px_rgba(0,0,0,0.3)] transition-all atropos-banner">
            <Icon className="sidebar__links-container"
            key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if(!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
            </Atropos>
          ))
          }
        </div>
        {/* ======================= BOTTOM SIDEBAR BUTTONS ======================= */}
        <div className="flex flex-col justify-center items-center gap-4">
        {/* CONNECT WALLET BUTTON */}
        <CustomButton
          btnType="button"
          title={address ? 'Create' : 'Connect'}
          styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
          handleClick={() => {
            if(address) navigate('create-campaign')
            else connect()
          }}
        />
        {/* PROFILE PICTURE */}
        <div className="bg-[#0f0f14] shadow-secondary w-[48px] h-[48px] rounded-[10px] flex justify-center items-center cursor-pointer">
        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#1c1c24] flex justify-center items-center cursor-pointer">
            <img src={address ? `${avatar}` : `${avatarnone}`} alt="user" className="w-[60%] h-[60%] object-contain" />
          </div>
        </Link>
        </div>

        <div className="bg-[#0f0f14] shadow-secondary w-[48px] h-[48px] rounded-[10px] flex justify-center items-center cursor-pointer">
            <Tooltip className="shadow-md bg-[#0f0f14] ml-[1rem] font-bold" content="Light" placement="right">
              <Button variant="gradient">
                <img src={sun} alt="Light Mode" />
              </Button>
            </Tooltip>
        </div>
        </div>

      </div>
    </div>
  )
}

export default Sidebar