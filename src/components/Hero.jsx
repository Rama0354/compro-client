import React from 'react'
import Slider from './Slider'

function Hero({slider,refreshSlider,successNotif,failNotif}) {

  return (
    <section className='w-full'>
      <div className='w-full h-48 sm:h-[480px] mt-0 my-3 mx-auto'>
        <Slider slider={slider} refreshSlider={refreshSlider} successNotif={successNotif} failNotif={failNotif}/>
      </div>
    </section>
  )
}

export default Hero