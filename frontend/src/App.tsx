import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AttractionSelectedScreen from './screens/attractionSelected/AttractionSelectedScreen';
import HomeScreen from './screens/home/HomeScreen';
import ParkRideScheduleScreen from './screens/parkRideSchedule/ParkRideScheduleScreen';
import ParkSelectedScreen from './screens/parkSelected/ParkSelectedScreen';
import ParkSelectedConfigureScreen from './screens/parkSelectedConfigure/ParkSelectedConfigureScreen';
import { processMessage } from './utils/GatewayDevice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.data.type !== undefined) {
        dispatch(processMessage(event.data.type, event.data.value));
      }
    })
  }, [dispatch]);

  return (
    <div>
      <main>
        <Routes>
          <Route path="*" element={<label>Sem rota</label>} />
          <Route path="/" element={<HomeScreen />} />
          <Route path="/park/:parkId" element={<ParkSelectedScreen />} />
          <Route path="/park/:parkId/configure" element={<ParkSelectedConfigureScreen />} />
          <Route path="/attraction/:attractionId/:parkId" element={<AttractionSelectedScreen />} />
          <Route path="/attraction-schedule/:attractionId/:parkId/:time" element={<ParkRideScheduleScreen />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
