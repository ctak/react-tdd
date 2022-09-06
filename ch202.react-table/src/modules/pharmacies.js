import * as pharmaciesAPI from '../api/pharmacies';
import {
  createPromiseThunk,
  reducerUtils,
  handleAsyncActions,
} from '../lib/asyncUtils';

/* action type */

const GET_PHARMACIES = 'pharmacies/GET_PHARMACIES';
const GET_PHARMACIES_SUCCESS = 'pharmacies/GET_PHARMACIES_SUCCESS';
const GET_PHARMACIES_ERROR = 'pharmacies/GET_PHARMACIES_ERROR';

const GET_PHARMACY = 'pharmacies/GET_PHARMACY';
const GET_PHARMACY_SUCCESS = 'pharmacies/GET_PHARMACY_SUCCESS';
const GET_PHARMACY_ERROR = 'pharmacies/GET_PHARMACY_ERROR';

export const getPharmacies = createPromiseThunk(GET_PHARMACIES, pharmaciesAPI.getPharmacies);
export const getPharmacy = createPromiseThunk(GET_PHARMACY, pharmaciesAPI.getPharmacyById);

const initialState = {
  pharmacies: reducerUtils.initial(),
  pharmacy: reducerUtils.initial(),
}

export default function pharmacies(state = initialState, action) {
  switch (action.type) {
    case GET_PHARMACIES:
    case GET_PHARMACIES_SUCCESS:
    case GET_PHARMACIES_ERROR:
      return handleAsyncActions(GET_PHARMACIES, 'pharmacies', true)(state, action);
    case GET_PHARMACY:
    case GET_PHARMACY_SUCCESS:
    case GET_PHARMACY_ERROR:
      return handleAsyncActions(GET_PHARMACY, 'pharmacy')(state, action);
    default:
      return state;
  }
}