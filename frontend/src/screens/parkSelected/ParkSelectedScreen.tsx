import React, { useEffect, useLayoutEffect, useState } from 'react'
import { IoIosCog } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Parks } from '../../backend';
import { getParkDetails } from '../../backend/actions/parkActions';
import { ParkRideModel } from '../../backend/models/ParkRide/ParkRideResponseModel';
import HeaderPark from '../../components/Header/HeaderPark';
import LoadingViewFull from '../../components/Loading/LoadingViewFull';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import ParkSelectedItem from './components/parkSelectedItem/parkSelectedItem';
import './ParkSelectedScreen.css';

export default function ParkSelectedScreen() {
  const dispatch = useDispatch();
  const { parkId } = useParams();

  const [loading, setLoading] = useState<boolean>(false);

  const locationUser = useTypedSelector(state => state.locationUser);
  const { data: userLocationData } = locationUser;

  const [parkRides, setParkRides] = useState<ParkRideModel[]>([]);

  const parkRide = useTypedSelector(state => state.parkRide);
  const { data: parkRideData, loading: loadingParkRide } = parkRide;

  const parkRideSaves = useTypedSelector(state => state.parkRideSaves);
  const { data: parkRideSavesData, loading: loadingParkRideSaves } = parkRideSaves;

  useLayoutEffect(() => {
    if (parkId && userLocationData) {
        dispatch(getParkDetails(parkId as Parks, userLocationData));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, parkId]);

  useEffect(() => {
    if (parkRideData) {
      setParkRides(parkRideData);
    }
  }, [parkRideData]);

  useEffect(() => {
    if (parkRideSavesData && parkRideSavesData.success && userLocationData) {
      dispatch(getParkDetails(parkId as Parks, userLocationData));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parkRideSavesData, dispatch, parkId]);

  useEffect(() => {
    setLoading(loadingParkRide || loadingParkRideSaves || false);
  }, [loadingParkRide, loadingParkRideSaves]);

  return (
    <div>
      <HeaderPark title={parkId ? parkId.split(/(?=[A-Z])/).join(' ') : ''} hasArrowBack />
      <div className='park-selected-content'>
        <div>
          <Link to={`/park/${parkId}/configure`}>
            <div className='park-selected-button-configure-background'>
              <IoIosCog className='park-selected-button-configure-icon' />
              <label className='park-selected-button-configure-label'>Configurar</label>
            </div>
          </Link>
        </div>
        <div className='park-selected-rides'>
          {parkRides.map((park) => {
            return (
              <ParkSelectedItem key={park.id} park={park} parkId={parkId as Parks} userLocation={userLocationData || {latitude: 0, longitude: 0}} />
            )
          })}
        </div>
      </div>
      <LoadingViewFull show={loading || false} />
    </div>
  )
}
