import React from 'react';
import { Navbar } from './Navbar';
import { Userinfo } from './UserInfo';
import './Header.module.css';

export const Header: React.FC = () => {
   return (
       <>
       <Navbar />
       <Userinfo />
       </>
   )
}