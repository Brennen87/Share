import axios from '../../axios-api';
import Pathes from '../../common/pathes';
import { CLEAR_TEAM_LIST, FETCH_TEAM, REMOVE_TEAM } from './actionTypes';
import queryString from 'query-string';
import Notify from '../../components/Notification';

const fetchTeamListRequest = () => ({ type: FETCH_TEAM.REQUEST });
const fetchTeamListSuccess = teamList => ({ type: FETCH_TEAM.SUCCESS, teamList });
const fetchTeamListError = error => ({ type: FETCH_TEAM.FAILURE, error });

const removeTeamRequest = () => ({ type: REMOVE_TEAM.REQUEST });
const removeTeamSuccess = teamList => ({ type: REMOVE_TEAM.SUCCESS, teamList });
const removeTeamError = error => ({ type: REMOVE_TEAM.FAILURE, error });

const clearTeams = () => ({ type: CLEAR_TEAM_LIST });

export const fetchTeamList = (params, endpoint) => {
  const query = queryString.stringify(params, { skipNull: true });
  return dispatch => {
    dispatch(fetchTeamListRequest());
    return axios
      .get(Pathes.Team.teamList(endpoint, query))
      .then(
        response => {
          dispatch(fetchTeamListSuccess(response.data));
        },
        error => {
          dispatch(fetchTeamListError(error));
        }
      )
      .catch(() => dispatch(fetchTeamListError({ global: 'Something went wrong' })));
  };
};

export const removeTeammate = (id, type) => {
  return (dispatch, getState) => {
    dispatch(removeTeamRequest());
    return axios
      .post(Pathes.Team.remove, { id, type })
      .then(response => {
        if (response && response.status === 200) {
          Notify.info({ text: 'Deleted successfully' });
          const { data } = getState().teamStore.teamList;
          if (data && data.list) {
            const list = data.list.filter(user => user.id !== id);
            const totalCount = (data && data.total_count - 1) || 0;
            return dispatch(removeTeamSuccess({ ...data, list, total_count: totalCount }));
          }
        }

        if (response && response.status === 400) {
          Notify.info({ text: 'Already deleted' });
        }

        throw new Error('Already deleted');
      })
      .catch(e => dispatch(removeTeamError(e.message)));
  };
};

export const clearTeamList = () => {
  return dispatch => {
    dispatch(clearTeams());
  };
};
