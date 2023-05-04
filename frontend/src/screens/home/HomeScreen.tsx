import React from 'react'
import './HomeScreen.css'
import AnimalKingdomIcon from '../../assets/AnimalKingdomIcon.png';
import EpcotIcon from '../../assets/EpcotIcon.png';
import HollywoodStudiosIcon from '../../assets/HollywoodStudiosIcon.png';
import MagicKingdomIcon from '../../assets/MagicKingdomIcon.png';
import UniversalIslandOfAdventureIcon from '../../assets/UniversalIslandOfAdventureIcon.png';
import UniversalStudiosIcon from '../../assets/UniversalStudiosIcon.png';
import { Parks } from '../../backend';
import ParkOption from './components/ParkOption';
import HeaderPark from '../../components/Header/HeaderPark';

export interface ParkObject {
  id: string;
  icon: string;
  name: string;
}

export default function HomeScreen() {
  const parksOptions: ParkObject[] = [
    {
      id: Parks.WaltDisneyWorldAnimalKingdom,
      icon: AnimalKingdomIcon,
      name: 'Animal Kingdom',
    },
    {
      id: Parks.WaltDisneyWorldEpcot,
      icon: EpcotIcon,
      name: 'Epcot',
    },
    {
      id: Parks.WaltDisneyWorldHollywoodStudios,
      icon: HollywoodStudiosIcon,
      name: 'Hollywood Studios',
    },
    {
      id: Parks.WaltDisneyWorldMagicKingdom,
      icon: MagicKingdomIcon,
      name: 'Magic Kingdom',
    },
    {
      id: Parks.UniversalIslandsOfAdventure,
      icon: UniversalIslandOfAdventureIcon,
      name: 'Island of Adventure',
    },
    {
      id: Parks.UniversalStudiosFlorida,
      icon: UniversalStudiosIcon,
      name: 'Universal Studios',
    }
  ]

  return (
    <div>
      <HeaderPark 
        title={'Parks'} />
      <div className='home-screen-background'>
        <div className='home-screen-content'>
          <div className='home-screen-parks'>
            {parksOptions.map((park) => {
              return (
                <ParkOption park={park} />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
