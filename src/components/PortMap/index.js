import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import L from 'leaflet';
import resizeListener from 'element-resize-detector';
import uniqueId from 'lodash/uniqueId';
import cruiseIcon from '../assets/cruise.png';
import portIcon from '../assets/port.png';
import ApiService from '../../services/api.service';
import './styles.css';

const LAYER_DEFS = [
  { type: "port", icon: portIcon, name: "Ports" },
  { type: "cruise", icon: cruiseIcon, name: "Cruises" },
];

export default class PortMap extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.mapRef = React.createRef()
  }

  render() {
    // merge our className with any passed to us by our parent
    const className = classnames("portmap--root", this.props.className);

    return <div ref={this.mapRef} className={className} />;
  }

  componentDidMount() {
    const START_LATLNG = [28.913943, -94.131125];
    const START_ZOOM = 7;

    // Initialize the Leaflet map
    this._map = L.map(this.mapRef.current, { trackResize: false }).setView(START_LATLNG, START_ZOOM);

    // Add the basemap tile layer
    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/{z}/{x}/{y}?access_token={accessToken}',
      {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>' +
        ', Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/satellite-streets-v10/tiles/256',
        accessToken: 'pk.eyJ1IjoiYnJhbmRvbmRldiIsImEiOiJjajFwNjNmODAwMDBnMzFwbDJ4N21yZmFmIn0.YC44JxjiM36-I54e-hVQUA'
      })
      .addTo(this._map);

    // Add the port/cruise layers
    this._icons = LAYER_DEFS.map(def => L.icon({
      iconUrl: def.icon,
      iconSize: [25, 25],
      iconAnchor: [25, 25],
      popupAnchor: [0, -25],
    }));
    this._iconLayers = LAYER_DEFS.map(def => new L.LayerGroup());
    this._iconLayers.forEach(l => this._map.addLayer(l));

    // Whenever the user pans, load data for the new bounds
    this._map.on("moveend", () => this.loadLayerData(this._map.getBounds()));

    // resize the map whenever our container element size changes
    resizeListener({ strategy: "scroll" }).listenTo(this.mapRef.current, ev => this._map.invalidateSize());
  }

  componentDidUpdate(prevProps) {
    // make changes to this._map based on changes between this.props and prevProps
  }

  componentWillUnmount() {
    // cancel any open requests so they do not try to update the map after we unmount.
    this._requestId = undefined;
  }

  loadLayerData(bounds) {
    const requestId = this._requestId = uniqueId();
    LAYER_DEFS.forEach(async (def, i) => {
      try {
        const harbors = await this.requestData(bounds, def);

        // check that our request is not stale
        if (requestId === this._requestId) {
          // put this data into the map
          this.renderHarbors(harbors, this._icons[i], this._iconLayers[i]);
        }
      }
      catch (e) {
        console.log("error loading data", e);
      }
    });
  }

  renderHarbors(harbors, icon, layer) {
    layer.clearLayers();
    for (const harbor of harbors) {
      layer.addLayer(this.createMarker(harbor, icon));
    }
  }

  async requestData(bounds, def) {
    const response = await ApiService.getHarbors({
      portType: def.type,
      minlat: bounds._southWest.lat,
      minlon: bounds._southWest.lng,
      maxlat: bounds._northEast.lat,
      maxlon: bounds._northEast.lng,
    });

    const data = await response.json();
    return data.ports;
  }

  createMarker(harbor, icon) {
    return L
      .marker([harbor.latitude, harbor.longitude], {
        icon: icon
      })
      .bindPopup(`<b>${harbor.name}</b><br>city: ${harbor.city}`);
  }
}
