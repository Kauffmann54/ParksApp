import React, { useEffect, useLayoutEffect, useState } from 'react'
import { FaHeart, FaLocationArrow, FaMapMarkerAlt, FaRegHeart } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Parks } from '../../backend';
import { cancelParkRideNotification, getParkDetails, saveParkRideFavorite, saveParkRideVisited } from '../../backend/actions/parkActions';
import { ParkActionTypes } from '../../backend/constants/parkContants';
import { ParkRideModel } from '../../backend/models/ParkRide/ParkRideResponseModel';
import { distance } from '../../backend/utils/calculate';
import HeaderPark from '../../components/Header/HeaderPark';
import LoadingViewFull from '../../components/Loading/LoadingViewFull';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { MessageSendType, sendMessageToNative } from '../../utils/GatewayDevice';
import './AttractionSelectedScreen.css';

export default function AttractionSelectedScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const locationUser = useTypedSelector(state => state.locationUser);
  const { data: userLocationData } = locationUser;

  const parkRide = useTypedSelector(state => state.parkRide);
  const { data: parkRideData, loading: loadingParkRide } = parkRide;

  const parkRideSaves = useTypedSelector(state => state.parkRideSaves);
  const { data: parkRideSavesData, loading: loadingParkRideSaves } = parkRideSaves;

  const { attractionId, parkId } = useParams();

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [distanceCalculated, setDistanceCalculated] = useState<number>(0);
  const [parkSelected, setParkSelected] = useState<Parks>();
  const [parkRideSelected, setParkRideSelected] = useState<ParkRideModel>();
  const [parkVisited, setParkVisited] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (parkId && userLocationData) {
      dispatch(getParkDetails(parkId as Parks, userLocationData));
      setParkSelected(parkId as Parks);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, parkId]);

  useEffect(() => {
    if (attractionId && parkRideData) {
      setParkRideSelected(parkRideData.find((value) => value.id === attractionId));
    }
  }, [attractionId, parkRideData]);

  useEffect(() => {
    if (parkRideSelected) {
      setIsFavorite(parkRideSelected.favorite);
      setParkVisited(parkRideSelected.visited || false);
    }
  }, [parkRideSelected]);

  useEffect(() => {
    if (userLocationData && parkRideSelected) {
      setDistanceCalculated(distance(userLocationData.latitude, userLocationData.longitude, parkRideSelected.meta.latitude, parkRideSelected.meta.longitude, 'M'));
    }
  }, [parkRideSelected, userLocationData]);

  useEffect(() => {
    if (parkRideSavesData && parkRideSavesData.success) {
      alert(parkRideSavesData.messages[0]);
      dispatch({ type: ParkActionTypes.PARK_SAVE_RESET });
      if (userLocationData) {
        dispatch(getParkDetails(parkId as Parks, userLocationData));
      }
    }
  }, [parkRideSavesData, dispatch, userLocationData, parkId]);

  useEffect(() => {
    setLoading(loadingParkRide || loadingParkRideSaves || false);
  }, [loadingParkRide, loadingParkRideSaves]);

  const handleSaveFavorite = () => {
    if (parkSelected && parkRideSelected) {
      dispatch(saveParkRideFavorite(parkSelected, parkRideSelected, !isFavorite));
      setIsFavorite(!isFavorite);
    }
  }

  const handleSaveParkRideVisited = () => {
    if (parkSelected && parkRideSelected) {
      dispatch(saveParkRideVisited(parkSelected, parkRideSelected, !parkVisited));
      setParkVisited(!parkVisited);
    }
  }

  const handleSelectAttraction = () => {
    sendMessageToNative(MessageSendType.LocalStorageHandler, {
      key: 'parkId',
      value: parkId
    });

    sendMessageToNative(MessageSendType.LocalStorageHandler, {
      key: 'rideId',
      value: parkRideSelected?.id
    });
  }

  const handleCancelParkRideNotification = () => {
    dispatch(cancelParkRideNotification(parkId || '', parkRideSelected?.id || ''));
  }

  return (
    <div>
      <HeaderPark title={parkRideSelected?.name || ''} hasArrowBack />
      <div className="attraction-selected-content">
        <img src={`../../assets/${parkId}/${parkRideSelected?.id}.jpeg`} alt={parkRideSelected?.name} className="attraction-selected-image" />
        {isFavorite ? (
          <FaHeart className='attraction-selected-favorite-selected' />
          ) : (
            <FaHeart className='attraction-selected-favorite-empty' />
        )}
        <FaRegHeart className='attraction-selected-favorite' onClick={(e) => {e.preventDefault(); handleSaveFavorite();}} />
        <FaMapMarkerAlt className='attraction-selected-pin' />
        <div className="attraction-selected-details">
          <label className='font-custom attraction-selected-park'>{parkRideSelected?.id.split('_')[0].split(/(?=[A-Z])/).join(' ').toUpperCase()}</label>
          <label className='font-custom attraction-selected-title'>{parkRideSelected?.name}</label>
          <div className='attraction-selected-visited-distance'>
            {parkVisited && (
              <div className='attraction-selected-visited-container'>
                <label className='attraction-selected-visited-label'>Visitado</label>
              </div>
            )}
            <div className='attraction-selected-distance-background'>
              <FaLocationArrow className={`attraction-selected-distance-icon ${distanceCalculated <= 10 ? 'distance-green' : distanceCalculated > 10 && distanceCalculated <= 50 ? 'distance-yellow' : 'distance-red'}`} />
              <label className={`attraction-selected-distance-label ${distanceCalculated <= 10 ? 'distance-green' : distanceCalculated > 10 && distanceCalculated <= 50 ? 'distance-yellow' : 'distance-red'}`}>{`${distanceCalculated.toFixed(2)} m`}</label>
            </div>
          </div>
          <div className={`attraction-selected-wait-time-background ${parkRideSelected?.waitTime ? (parkRideSelected?.waitTime <= 10 ? 'wait-time-green' : parkRideSelected?.waitTime > 10 && parkRideSelected?.waitTime <= 25 ? 'wait-time-blue' : parkRideSelected?.waitTime > 25 && parkRideSelected?.waitTime <= 45 ? 'wait-time-yellow' : 'wait-time-red') : ''}`}>
            <label className='font-custom attraction-selected-wait-time-label'>{parkRideSelected?.waitTime ? parkRideSelected?.waitTime : '--'}</label>
          </div>
        </div>
        
        {parkVisited ? (
          <button className='attraction-selected-button attraction-selected-button-not-visited' onClick={handleSaveParkRideVisited}>Marcar como Não Visitado</button>
        ) : (
          <button className='attraction-selected-button attraction-selected-button-visited' onClick={handleSaveParkRideVisited}>Marcar como Visitado</button>
        )}

        <button className='attraction-selected-button attraction-selected-button-select-attraction' onClick={handleSelectAttraction}>Selecionar atração</button>
        {parkRideSelected?.notificationTime ? (
            <button className='attraction-selected-button attraction-selected-button-not-visited' onClick={handleCancelParkRideNotification}>Cancelar notificação</button>
          ) : (
            <button className='attraction-selected-button attraction-selected-button-select-attraction' onClick={() => {navigate(`/attraction-schedule/${parkRideSelected?.id}/${parkId}/${parkRideSelected?.waitTime}`)}}>Criar alerta</button>
        )}
      </div>

      <LoadingViewFull show={loading || false} />
    </div>
  )
}