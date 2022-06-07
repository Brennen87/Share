import { METADATA } from '../../common/metadata';
import { CLEAR_TEAM_LIST, FETCH_TEAM, REMOVE_TEAM } from '../actions/actionTypes';

const initialState = {
  teamList: { ...METADATA.default, data: null }
};

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TEAM.REQUEST:
      return { ...state, teamList: { ...state.teamList, data: null, ...METADATA.request } };
    case FETCH_TEAM.SUCCESS:
      return { ...state, teamList: { data: action.teamList, ...METADATA.success } };
    case FETCH_TEAM.FAILURE:
      return { ...state, teamList: { ...state.teamList, ...METADATA.error, error: action.error } };
    case REMOVE_TEAM.REQUEST:
      return { ...state, teamList: { ...state.teamList, ...METADATA.request } };
    case REMOVE_TEAM.SUCCESS:
      return { ...state, teamList: { data: action.teamList, ...METADATA.success } };
    case REMOVE_TEAM.FAILURE:
      return { ...state, teamList: { ...state.teamList, ...METADATA.error, error: action.error } };
    case CLEAR_TEAM_LIST:
      return { ...state, teamList: { ...state.teamList, ...METADATA.default, data: null } };
    default:
      return state;
  }
};

export default teamReducer;
