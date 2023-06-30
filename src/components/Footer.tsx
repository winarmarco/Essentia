import React from 'react'
import { IconType } from 'react-icons';
import { AiOutlineFacebook, AiOutlineInstagram, AiOutlinePhone } from 'react-icons/ai'
import {CiLocationOn} from 'react-icons/ci';
import Container from './Container';

type ProfileData = {
  icon: React.ReactNode,
  profile: string,
}

const profiles: ProfileData[] = [
  {
    icon: <AiOutlineInstagram />,
    profile: "@essentia.au"

  },
  {
    icon: <AiOutlineFacebook />,
    profile: "@essentia.au"
  },
  {
    icon: <AiOutlinePhone />,
    profile: "+61 456 1234",
  },
  {
    icon: <CiLocationOn />,
    profile: "120 A'Beckett Street"
  }
]

const Profile: React.FC<{profileData: ProfileData}> = (props) => {
  return <div className='flex flex-row items-center'>
    <span className='text-2xl'>{props.profileData.icon}</span>
    <span className='ml-2'>{props.profileData.profile}</span>
  </div>
}


const Footer:React.FC = () => {
  return (
    <Container className='py-20 grid grid-cols-2 grid-rows-2 gap-y-10'>
      {profiles.map((profile, index) => {
        return <Profile key={index} profileData={profile}/>
      })}
    </Container>
  )
}

export default Footer