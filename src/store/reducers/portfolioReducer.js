import { METADATA } from '../../common/metadata';
import { CREATE_PORTFOLIO, FETCH_PORTFOLIO, EDIT_PORTFOLIO } from '../actions/actionTypes';

const initialState = {
  portfolioList: { ...METADATA.default, data: null }
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PORTFOLIO.SUCCESS:
      const currentPortfolio = { ...state.portfolioList };
      if (currentPortfolio.data) {
        currentPortfolio.data.list.push(action.portfolio);
      } else {
        currentPortfolio.data = {
          total_count: 1,
          total_pages: 1,
          list: [action.portfolio]
        };
      }
      return { ...state, portfolioList: { ...currentPortfolio, ...METADATA.success } };

    case FETCH_PORTFOLIO.REQUEST:
      return { ...state, portfolioList: { ...state.portfolioList, ...METADATA.request } };

    case FETCH_PORTFOLIO.SUCCESS:
      return { ...state, portfolioList: { data: action.portfolioList, ...METADATA.success } };

    case FETCH_PORTFOLIO.FAILURE:
      return { ...state, portfolioList: { ...state.portfolioList, ...METADATA.error } };

    case EDIT_PORTFOLIO.REQUEST:
      return { ...state, portfolioList: { ...state.portfolioList, ...METADATA.request } };

    case EDIT_PORTFOLIO.SUCCESS:
      const portfolioList = { ...state.portfolioList };
      const data = { ...portfolioList.data };
      const list = [...data.list];
      const editedPortfolio = action.portfolio;

      const index = list.findIndex(portfolio => portfolio.id === editedPortfolio.id);
      list[index] = editedPortfolio;

      data.list = list;
      portfolioList.data = data;

      return { ...state, portfolioList: { ...portfolioList, ...METADATA.success } };

    case EDIT_PORTFOLIO.FAILURE:
      return { ...state, portfolioList: { ...state.portfolioList, ...METADATA.error } };

    default:
      return state;
  }
};

export default commonReducer;
