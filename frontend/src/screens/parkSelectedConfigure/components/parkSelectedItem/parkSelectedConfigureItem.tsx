import React, { useState } from 'react'
import { ParkRideModel } from '../../../../backend/models/ParkRide/ParkRideResponseModel';
import './parkSelectedConfigureItem.css'
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { saveParkRideFavorite } from '../../../../backend/actions/parkActions';
import { Parks } from '../../../../backend';
import { useDispatch } from 'react-redux';

interface Props {
  park: ParkRideModel;
  parkId: Parks;
  key?: React.Key;
  style?: React.CSSProperties;
}

export default function ParkSelectedConfigureItem(props: Props) {
  const [isFavorite, setIsFavorite] = useState<boolean>(props.park.favorite);

  const dispatch = useDispatch();

  const handleSaveFavorite = () => {
    dispatch(saveParkRideFavorite(props.parkId, props.park, !isFavorite));
    setIsFavorite(!isFavorite);
  }

  return (
    <div key={props.key} style={props.style} className="park-selected-configure-item-content">
      <img src={`../../assets/${props.parkId}/${props.park.id}.jpeg`} alt={props.park.name} className="park-selected-configure-item-image" />
      {isFavorite ? (
        <FaHeart className='park-selected-configure-item-favorite-selected' />
        ) : (
          <FaHeart className='park-selected-configure-item-favorite-empty' />
      )}
      <FaRegHeart className='park-selected-configure-item-favorite' onClick={handleSaveFavorite} />
      <div className="park-selected-configure-item-details">
        <label className='font-custom park-selected-configure-item-park'>{props.park.id.split('_')[0].split(/(?=[A-Z])/).join(' ').toUpperCase()}</label>
        <label className='font-custom park-selected-configure-item-title'>{props.park.name}</label>
      </div>
    </div>
  )
}