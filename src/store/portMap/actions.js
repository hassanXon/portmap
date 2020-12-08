import ApiService from '../../services/api.service';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_HARBOURS = 'SET_HARBOURS';
export const SET_FILTERS = 'SET_FILTERS'

// ------------------------------------
// Actions
// ------------------------------------
export function fetchHarbors (bounds, type) {
  return async (dispatch) => {
    const response = await ApiService.getHarbors({
      portType: type,
      minlat: bounds._southWest.lat,
      minlon: bounds._southWest.lng,
      maxlat: bounds._northEast.lat,
      maxlon: bounds._northEast.lng,
    });
    const data = await response.json();
    dispatch({
      type: SET_HARBOURS,
      payload: { harbors: data.ports, harborType: type}
    })
  };
}
