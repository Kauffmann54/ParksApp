import React, { useState } from 'react'
import { ParkRideModel } from '../../../../backend/models/ParkRide/ParkRideResponseModel';
import './parkSelectedItem.css'
import { FaHeart, FaLocationArrow, FaMapMarkerAlt, FaRegHeart } from 'react-icons/fa';
import { distance } from '../../../../backend/utils/calculate';
import { Parks } from '../../../../backend';
import { saveParkRideFavorite } from '../../../../backend/actions/parkActions';
import { LocationModel } from '../../../../backend/models/Location/LocationResponseModel';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

interface Props {
  park: ParkRideModel;
  parkId: Parks;
  userLocation: LocationModel;
  key?: React.Key;
  style?: React.CSSProperties;
}

export default function ParkSelectedItem(props: Props) {
  const distanceCalculated = distance(props.userLocation.latitude, props.userLocation.longitude, props.park.meta.latitude, props.park.meta.longitude, 'M');

  const dispatch = useDispatch();

  const [isFavorite, setIsFavorite] = useState<boolean>(props.park.favorite);

  const handleSaveFavorite = () => {
    dispatch(saveParkRideFavorite(props.parkId, props.park, !isFavorite));
    setIsFavorite(!isFavorite);
  }

  return (
    <Link to={`/attraction/${props.park.id}/${props.parkId}`}>
      <div key={props.key} style={props.style} className="park-selected-item-content">
        <img src={`../assets/${props.parkId}/${props.park.id}.jpeg`} alt={props.park.name} className="park-selected-item-image" />
        {isFavorite ? (
          <FaHeart className='park-selected-item-favorite-selected' />
          ) : (
            <FaHeart className='park-selected-item-favorite-empty' />
        )}
        <FaRegHeart className='park-selected-item-favorite' onClick={(e) => {e.preventDefault(); handleSaveFavorite();}} />
        <FaMapMarkerAlt className='park-selected-item-pin' />
        <div className="park-selected-item-details">
          <label className='font-custom park-selected-item-park'>{props.park.id.split('_')[0].split(/(?=[A-Z])/).join(' ').toUpperCase()}</label>
          <label className='font-custom park-selected-item-title'>{props.park.name}</label>
          <div className='park-selected-item-visited-distance'>
            {props.park.visited && (
              <div className='park-selected-item-visited-container'>
                <label className='park-selected-item-visited-label'>Visitado</label>
              </div>
            )}
            {props.park.notificationTime && (
              <div className='park-selected-item-notification-container'>
                <label className='park-selected-item-notification-label'>{`Notificar em: ${props.park.notificationTime} min`}</label>
              </div>
            )}
            <div className='park-selected-item-distance-background'>
              <FaLocationArrow className={`park-selected-item-distance-icon ${distanceCalculated <= 10 ? 'distance-green' : distanceCalculated > 10 && distanceCalculated <= 50 ? 'distance-yellow' : 'distance-red'}`} />
              <label className={`park-selected-item-distance-label ${distanceCalculated <= 10 ? 'distance-green' : distanceCalculated > 10 && distanceCalculated <= 50 ? 'distance-yellow' : 'distance-red'}`}>{`${distanceCalculated.toFixed(2)} m`}</label>
            </div>
          </div>
          <div className={`park-selected-item-wait-time-background ${props.park.waitTime ? (props.park.waitTime <= 10 ? 'wait-time-green' : props.park.waitTime > 10 && props.park.waitTime <= 25 ? 'wait-time-blue' : props.park.waitTime > 25 && props.park.waitTime <= 45 ? 'wait-time-yellow' : 'wait-time-red') : ''}`}>
            <label className='font-custom park-selected-item-wait-time-label'>{props.park.waitTime ? props.park.waitTime : '--'}</label>
          </div>
        </div>
      </div>
    </Link>
  )
}