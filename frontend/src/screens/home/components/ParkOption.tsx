import React from 'react'
import { Link } from 'react-router-dom';
import { ParkObject } from '../HomeScreen';
import './ParkOption.css';

interface Props {
  park: ParkObject;
}

export default function ParkOption(props: Props) {
  return (
    <Link to={`/park/${props.park.id}`} className='park-option-background'>
      <img className='park-option-image' src={props.park.icon} alt={props.park.name} />
      <label className='park-option-name'>{props.park.name}</label>
    </Link>
  )
}