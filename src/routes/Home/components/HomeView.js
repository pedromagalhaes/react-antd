import React from 'react'
import DMILogo from '../assets/dmi-logo.jpg'
import './HomeView.scss'

export const HomeView = () => (
  <div>
    <h4>Welcome!</h4>
    <img
      alt='This is DMI!'
      className='dmi-logo'
      src={DMILogo}
    />
  </div>
)

export default HomeView
