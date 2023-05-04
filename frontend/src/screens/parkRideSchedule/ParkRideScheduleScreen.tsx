import React, { useEffect, useState } from 'react'
import './ParkRideScheduleScreen.css';
import CircularSlider from '@fseehawer/react-circular-slider';
import HeaderPark from '../../components/Header/HeaderPark';
import { useDispatch } from 'react-redux';
import { saveParkRideNotification } from '../../backend/actions/parkActions';
import { useNavigate, useParams } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { ParkActionTypes } from '../../backend/constants/parkContants';
import { FaRegDotCircle } from 'react-icons/fa';
import LoadingViewFull from '../../components/Loading/LoadingViewFull';

export default function ParkRideScheduleScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { parkId, attractionId, time } = useParams();
  const [timeSelected, setTimeSelected] = useState<number>(0);

  const handleSaveParkRideNotification = () => {
    dispatch(saveParkRideNotification(parkId || '', attractionId || '', timeSelected));
  }

  const parkRideSaves = useTypedSelector(state => state.parkRideSaves);
  const { data: parkRideSavesData, loading } = parkRideSaves;

  useEffect(() => {
    if (time) {
      const timeFormatted = parseInt(time) - (parseInt(time) * 0.3);
      setTimeSelected(timeFormatted);
    }
  }, [time]);

  useEffect(() => {
    if (parkRideSavesData && parkRideSavesData.success) {
      alert(parkRideSavesData.messages[0]);
      dispatch({ type: ParkActionTypes.PARK_SAVE_RESET });
      navigate(-1);
    }
  }, [parkRideSavesData, navigate, dispatch]);

  return (
    <div>
      <HeaderPark title={'Criar alerta'} hasArrowBack />
      <div className='park-ride-schedule-background'>
        <div className='park-ride-schedule-slider'>
          <CircularSlider
            width={250}
            label=" "
            labelColor="#3f82ff"
            knobColor="#3f82c1"
            progressColorFrom="#3f82ff"
            progressColorTo="#3f82c1"
            progressSize={24}
            trackColor="#eeeeee"
            trackSize={24}
            max={200}
            dataIndex={timeSelected}
            knobSize={50}
            onChange={ (value: number) => { setTimeSelected(value); } }
          >
            <FaRegDotCircle height={28} width={28} color={'#fff'} x={17} y={17} />
          </CircularSlider>
        </div>
        <button className='park-ride-schedule-button' onClick={handleSaveParkRideNotification}>Notificar</button>
      </div>

      <LoadingViewFull show={loading || false} />
    </div>
  )
}
