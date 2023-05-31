import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './App.css';
import dayjs from 'dayjs';
import data from './store/driver-positions.json';
import L from 'leaflet';
import marker from './assets/marker-icon.png';

function App() {
  const boundsArr = [];
  data.positions.map((position) => {
    return boundsArr.push([position.latitude, position.longitude]);
  });

  const myIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor: [-0, -0],
    iconSize: [10, 10],
  });

  return (
    <div id="container">
      <h1>{data.driver.name}'s Route</h1>
      <p>
        <span>Additional Driver Info:</span>
        <span>ID: {data.driver.id}</span>
        <span>
          Contact: +{data.driver.phone.countryCallingCode}{' '}
          {data.driver.phone.nationalNumber}
        </span>
        <span>
          OS & Version: {data.driver.os} {data.driver.version}
        </span>
      </p>
      <MapContainer bounds={boundsArr}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.positions.map((position) => (
          <Marker
            icon={myIcon}
            position={[position.latitude, position.longitude]}
          >
            <Popup>
              {dayjs(position.timestamp).format('MM/DD/YYYY HH:mm:ss A')}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
