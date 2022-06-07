import * as React from 'react';
import * as classnames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import SelectField from '../../../components/UI/SelectField';
import { PROJECT_STATUSES, ROLES } from '../../../common/constants';
import { fetchProjectList } from '../../../store/actions/projectsActions';
import Pagination from '../../../components/Pagination';
import Preloader from '../../../components/Preloader';
import Avatar from '../../../components/Avatar';
import { centToUSD } from '../../../helpers';
import { ProjectStatus } from '../../../components/ProjectStatus';
import OutsideClickHandler from 'react-outside-click-handler/esm/OutsideClickHandler';
import { ProjectDetailIcon } from '../../../components/UI/Icons/ProjectDetailIcon';
import { singleValueSelect } from '../../../common/selectFieldStyles/singleValueSelect';
import NotificationIcon from '../../../components/UI/Icons/NotificationIcons/NotificationIcon';
import './index.scss';

class ProjectsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      limit: 7,
      status: null,
      coworker: null,
      activeMenu: null,
      urlParamsSetToFilters: false
    };
  }

  setFiltersBySearchParams(searchParameters) {
    const isCustomer = this.props.user.role === ROLES.customer;

    if (searchParameters.get('coworkerId') && searchParameters.get('status')) {
      const status = this.optionsFilter(PROJECT_STATUSES).find(
        option => option.value === searchParameters.get('status').toUpperCase()
      );
      const coworker = this.props.usersList[isCustomer ? 'vendors' : 'customers'].find(
        option => option.value === Number(searchParameters.get('coworkerId'))
      );
      this.setState({ urlParamsSetToFilters: true, coworker, status });
    } else if (searchParameters.get('coworkerId')) {
      const coworker = this.props.usersList[isCustomer ? 'vendors' : 'customers'].find(
        option => option.value === Number(searchParameters.get('coworkerId'))
      );
      this.setState({ urlParamsSetToFilters: true, coworker });
    } else if (searchParameters.get('status')) {
      const status = this.optionsFilter(PROJECT_STATUSES).find(
        option => option.value === searchParameters.get('status').toUpperCase()
      );
      this.setState({ urlParamsSetToFilters: true, status });
    }
  }

  componentDidMount() {
    const initialFetchParameters = { ...this.state };
    const searchParameters = new URLSearchParams(this.props.location.search);

    if (searchParameters.get('coworkerId')) {
      initialFetchParameters.coworker = searchParameters.get('coworkerId');
    }
    if (searchParameters.get('status')) {
      initialFetchParameters.status = searchParameters.get('status');
    }
    this.props.fetchProjectsList(initialFetchParameters);
  }

  componentDidUpdate(prevProps, prevState) {
    const { status, coworker, page } = this.state;
    const searchParameters = new URLSearchParams(this.props.location.search);
    if (
      this.props.user &&
      (this.props.usersList?.customers?.length || this.props.usersList?.vendors?.length) &&
      !this.state.urlParamsSetToFilters &&
      (searchParameters.get('coworkerId') || searchParameters.get('status'))
    ) {
      this.setFiltersBySearchParams(searchParameters);
    } else if (
      prevState.status !== status ||
      prevState.page !== page ||
      prevState.coworker !== coworker
    ) {
      const parameters = { ...this.state };
      if (
        (prevState.status !== status || prevState.page !== page) &&
        status &&
        status.label === PROJECT_STATUSES.IN_PROGRESS
      ) {
        parameters.combinedInProgressStatus = true;
      }
      this.props.fetchProjectsList(parameters);
    }
  }

  toggleMenu = id => {
    this.state.activeMenu === id
      ? this.setState({ ...this.state, activeMenu: null })
      : this.setState({ ...this.state, activeMenu: id });
  };

  setFilter = (filterName, selection) => {
    this.setState({ ...this.state, [filterName]: selection, page: 1 });
  };

  optionsFilter = value =>
    Object.keys(value).map(status => ({
      label: value[status],
      value: status
    }));

  render() {
    const { data, loading } = this.props.projectsList;
    const { user, usersList } = this.props;
    const { status, coworker } = this.state;
    const isCustomer = user && user.role === ROLES.customer;
    const coworkerOptions = isCustomer
      ? [{ label: 'All Vendors', value: null }, ...usersList.vendors]
      : [{ label: 'All Customers', value: null }, ...usersList.customers];
    const needNotification = project =>
      isCustomer ? project.notify_customer : project.notify_vendor;

    return (
      <div
        className={classnames(
          'projects_list',
          isCustomer ? 'projects_list__customer' : 'projects_list__vendor'
        )}
      >
        <div className="projects_list__header">
          {isCustomer && (
            <Link to="/projects/create" className="projects_list__header_new">
              New Project
            </Link>
          )}
          <div className="projects_list__filters">
            <SelectField
              styles={window.innerWidth <= 390 ? MobileSelect : singleValueSelect}
              onChange={selection =>
                this.setFilter('coworker', { ...selection, role: user && user.role })
              }
              defaultValue={coworkerOptions[0]}
              value={coworker}
              options={coworkerOptions}
              placeholder={`${isCustomer ? 'All Vendors' : 'All Customers'}`}
              className={classnames({
                color_grey:
                  !coworker ||
                  (coworker && coworker.label === `${isCustomer ? 'All Vendors' : 'All Customers'}`)
              })}
            />

            <SelectField
              styles={window.innerWidth <= 390 ? MobileSelect : singleValueSelect}
              defaultValue={this.optionsFilter(PROJECT_STATUSES)[0]}
              value={status}
              placeholder="All Projects"
              onChange={selection => this.setFilter('status', selection)}
              options={this.optionsFilter(PROJECT_STATUSES).filter(
                statusOption => statusOption.value !== 'PENDING_CANCELLATION'
              )}
              isSearchable={false}
              className={classnames({
                color_grey: !status || (status && status.label === PROJECT_STATUSES.ALL)
              })}
            />
          </div>
        </div>

        <div className="projects_list_table">
          <div className="projects_list_table_header">
            <div className="projects_list_table_header_label">
              {`${isCustomer ? 'Vendor' : 'Customer'}`}
            </div>
            <div className="projects_list_table_header_label">Project Name</div>
            <div className="projects_list_table_header_label">Start Date</div>
            <div className="projects_list_table_header_label">Due On</div>
            <div className="projects_list_table_header_label">Total</div>
            <div className="projects_list_table_header_label">Status</div>
            <div className="projects_list_table_header_label" />
            <div className="projects_list_table_header_label">Details</div>
          </div>

          <div className="projects_list_table_rows">
            {loading ? <Preloader className="projects_list_table_rows__preloader" /> : null}
            {!loading &&
              data &&
              data.list.map(project => (
                <div className="projects_list_table_row" key={project.id}>
                  <div className="projects_list_table_row__user">
                    <Avatar
                      className="projects_list_table_row__user_avatar"
                      sizeSmall
                      online={isCustomer ? project.vendor?.online : project.customer.online}
                      image={isCustomer ? project.vendor?.avatar : project.customer.avatar}
                      alt={isCustomer ? project.vendor?.full_name : project.customer.full_name}
                    />
                    <Link
                      to={`/${isCustomer ? ROLES.vendor : ROLES.customer}/${
                        isCustomer ? project.vendor?.username : project.customer.username
                      }`}
                      className="projects_list_table_row__user_name"
                    >
                      {isCustomer ? project.vendor?.full_name : project.customer.full_name}
                    </Link>
                  </div>
                  <div className="projects_list_table_row__project_name">{project.title}</div>
                  <div className="projects_list_table_row__start_date">{project.start_date}</div>
                  <div className="projects_list_table_row__due">{project.end_date}</div>
                  <div className="projects_list_table_row__total">{`$${centToUSD(
                    ['IN_PROGRESS', 'PENDING_CANCELLATION'].includes(project.status)
                      ? project.cost
                      : project.grand_total || project.cost
                  )}`}</div>
                  <div className="projects_list_table_row__status">
                    <ProjectStatus status={project.status} mustIndent={false}/>
                  </div>

                  <div
                    className={classnames(
                      'projects_list_table_row__dropdown',
                      this.state.activeMenu === project.id &&
                        'projects_list_table_row__dropdown_active'
                    )}
                  >
                    <DropdownIcon id={project.id} onClick={() => this.toggleMenu(project.id)} />
                    <div className="projects_list_table_row__menu">
                      <OutsideClickHandler
                        onOutsideClick={e => !e.target.id && this.toggleMenu(null)}
                        disabled={this.state.activeMenu !== project.id}
                      >
                        <p className="projects_list_table_row__menu_title">Project Name</p>
                        <p className="projects_list_table_row__menu_project">Book 1 - Design</p>
                        <div className="projects_list_table_row__menu_row projects_list_table_row__menu_row_1">
                          <p>Start Date</p>
                          <p>{project.start_date}</p>
                        </div>
                        <div className="projects_list_table_row__menu_row projects_list_table_row__menu_row_2">
                          <p>Due On</p>
                          <p>{project.end_date}</p>
                        </div>
                        <div className="projects_list_table_row__menu_row projects_list_table_row__menu_row_3">
                          <p>Total</p>
                          <p>{`$${centToUSD(project.grand_total || project.cost)}`}</p>
                        </div>
                        <div className="projects_list_table_row__menu_row projects_list_table_row__menu_row_4">
                          <p>Status</p>
                          <ProjectStatus status={project.status} mustIndent={false}/>
                        </div>
                      </OutsideClickHandler>
                    </div>
                  </div>
                  <div className="projects_list_table_row__view">
                    <Link
                      to={`/projects/${project.id}`}
                      className="projects_list_table_row__view_icon"
                    >
                      <ProjectDetailIcon status={project.status} />
                    </Link>
                  </div>
                  {needNotification(project) && (
                    <NotificationIcon
                      style={{ position: 'absolute', top: '-15px', right: '-15px' }}
                    />
                  )}
                </div>
              ))}
          </div>
        </div>

        {!loading ? (
          <div className="projects_list__pagination">
            <Pagination
              totalPages={(data && data.total_pages) || 0}
              activePage={this.state.page}
              onChange={page => {
                this.setState({ ...this.state, page });
              }}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userStore.user,
  projectsList: state.projectStore.projectsList,
  usersList: state.projectStore.usersList
});

const mapDispatchToProps = dispatch => ({
  fetchProjectsList: params => dispatch(fetchProjectList(params))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectsList));

const DropdownIcon = ({ id, onClick }) => (
  <svg
    onClick={onClick}
    id={id}
    width="15"
    height="9"
    viewBox="0 0 15 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.8501 0.901751L14.0987 0.150353C13.9985 0.0500124 13.8832 0 13.7528 0C13.6227 0 13.5074 0.0500124 13.4073 0.150353L7.50008 6.05725L1.59313 0.150511C1.49295 0.0501705 1.37766 0.000157847 1.24742 0.000157847C1.11712 0.000157847 1.00183 0.0501705 0.901698 0.150511L0.150353 0.901962C0.0500125 1.00209 0 1.11738 0 1.24768C0 1.37787 0.0501704 1.49316 0.150353 1.59329L7.15436 8.59746C7.25449 8.69764 7.36984 8.74771 7.50008 8.74771C7.63032 8.74771 7.74546 8.69764 7.84553 8.59746L14.8501 1.59329C14.9503 1.49311 15 1.37782 15 1.24768C15 1.11738 14.9503 1.00209 14.8501 0.901751Z"
      fill="#044C5A"
    />
  </svg>
);

const MobileSelect = {
  ...singleValueSelect,
  input: provided => ({
    ...provided,
    margin: '0',
    paddingBottom: '0',
    paddingTop: '0'
  }),
  control: (provided, state) => ({
    ...provided,
    minHeight: '25px',
    maxHeight: '25px',
    borderColor: '#C0C0C0',
    boxShadow: state.isFocused && 'unset',
    '&:hover': {
      borderColor: '#C0C0C0'
    }
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: '12px',
    lineHeight: '14px',
    borderLeft: '2px solid #FFF',
    backgroundColor: state.isFocused && 'transparent',
    color: state.isFocused && '#000',
    cursor: 'pointer',
    textTransform: 'capitalize',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    '&:hover': {
      color: '#FF8C00',
      borderColor: '#044C5A',
      backgroundColor: 'transparent'
    }
  }),
  placeholder: provided => ({
    ...provided,
    fontSize: '12px',
    lineHeight: '14px',
    whiteSpace: 'nowrap'
  }),
  singleValue: provided => ({
    ...provided,
    fontSize: '12px',
    lineHeight: '14px',
    color: '#000000',
    textTransform: 'capitalize'
  }),
  dropdownIndicator: (provided, { selectProps: { menuIsOpen } }) => ({
    ...provided,
    ...provided,
    color: '#044C5A',
    transform: menuIsOpen && 'rotate(180deg)',
    padding: '0 5px',
    '& svg path': {
      fill: menuIsOpen && '#ff8c00'
    },
    '&:hover': {
      color: '#ff8c00',
      cursor: 'pointer'
    }
  })
};
