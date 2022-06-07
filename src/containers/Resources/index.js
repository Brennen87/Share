import React from 'react';
import * as classnames from 'classnames';
import SelectField from '../../components/UI/SelectField';
import ResourceCard from '../../components/Cards/ResourceCard';
import { multiValueSelect } from '../../common/selectFieldStyles/multiValueSelect';
import { connect } from 'react-redux';
import { fetchResources, fetchResourceCategories } from '../../store/actions/resourceActions';
import Preloader from '../../components/Preloader';
import Pagination from '../../components/Pagination';
import { ReactComponent as SearchIcon } from '../../assets/icons/icon_search_gray.svg';
import ScreenResolver from '../../components/ScreenResolver';
import './index.scss';

const LIMIT = 8;

const Resources = ({
  resourceCategories,
  dispatchFetchResourceCategories,
  resources,
  dispatchFetchResources
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [selectedCategory, setSelectedCategory] = React.useState();
  const [selectedTag, setSelectedTag] = React.useState();
  const searchInputRef = React.useRef(null);

  React.useEffect(() => {
    dispatchFetchResourceCategories();
    dispatchFetchResources({
      page: 1,
      limit: LIMIT
    });
  }, []);

  React.useEffect(() => {
    if (!dispatchFetchResources) return;

    const params = {
      page,
      limit: LIMIT
    };

    if (searchTerm) {
      params.search = searchTerm;
    }
    if (selectedCategory) {
      params.categories = selectedCategory.value;
    }
    if (selectedTag) {
      params.tags = selectedTag.value;
    }

    dispatchFetchResources(params);
  }, [page, selectedCategory, selectedTag, searchTerm, dispatchFetchResources]);

  const onSelectCategory = category => {
    setPage(1);
    setSelectedTag(null);
    setSearchTerm('');
    searchInputRef.current.value = '';
    setSelectedCategory(category.value ? category : null);
  };

  const onSelectTag = tag => {
    setPage(1);
    setSelectedCategory(null);
    setSearchTerm('');
    searchInputRef.current.value = '';
    setSelectedTag(tag);
  };

  const onSearchInputKeyDown = event => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  const onSearch = () => {
    setPage(1);
    setSearchTerm(searchInputRef.current.value);
  };

  const categoriesList = [
    {
      value: null,
      label: 'All resources'
    },
    ...(resourceCategories?.data ?? []).map(item => ({
      value: item.id,
      label: item.name
    }))
  ];

  const isLoading = resourceCategories.loading || resources.loading;

  const buildTitle = () => {
    const isFiltered = searchTerm || (selectedCategory && selectedCategory.value) || selectedTag;
    if (resources.data && resources.data.list && isFiltered) {
      return `Resources${searchTerm ? ` for "${searchTerm}" term` : ''}${
        selectedCategory ? ` in "${selectedCategory.label}" category` : ''
      }${selectedTag ? ` with "${selectedTag.label}" tag` : ''}`;
    }
    return 'All Resources';
  };

  return (
    <div className="resource">
      <div className="resource__content">
        <div className="resource_top">
          <div className="resource__left">
            <h1 className={classnames('resource__title', selectedTag && 'resource__title_tag')}>
              {buildTitle()}
            </h1>
          </div>
          <div className="resource__right">
            <div className="resource__search">
              <input
                type="text"
                className="search-input"
                placeholder="Search Resources"
                defaultValue={searchTerm}
                ref={searchInputRef}
                onKeyDown={onSearchInputKeyDown}
              />
              <SearchIcon className="search-input__icon" title="Search" onClick={onSearch} />
            </div>
            <div className="resource__categories">
              <SelectField
                styles={multiValueSelect}
                onChange={onSelectCategory}
                placeholder="All Resources"
                options={categoriesList}
                value={selectedCategory}
              />
            </div>
          </div>
        </div>

        <ScreenResolver 
          large={850}
          desktop={

            <div className='resource_bottom'>
              <div className="resource_bottom__left">
    
                {isLoading ? <Preloader className='resource__preloader' /> : null}
                {!isLoading &&
                resources.data &&
                resources.data.list &&
                resources.data.list.map((item, index) => (index % 2 === 0) && (
                  <div key={item.id} className='resource_card'>
                    <ResourceCard
                      searchTerm={searchTerm}
                      highlight
                      truncateDescription
                      type={item.resource_type}
                      title={item.title}
                      describe={item.description}
                      tags={item.tags ?? []}
                      link={item.link}
                      file={item.file}
                      date={new Date(Date.parse(item.created_at)).toDateString().substring(4)}
                      onSelectTag={onSelectTag}
                    />
                  </div>
                ))}
    
              </div>
              <div className="resource_bottom__right">
    
                {isLoading ? <Preloader className='resource__preloader' /> : null}
                {!isLoading &&
                resources.data &&
                resources.data.list &&
                resources.data.list.map((item, index) => (index % 2 === 1) && (
                  <div key={item.id} className='resource_card'>
                    <ResourceCard
                      searchTerm={searchTerm}
                      highlight
                      truncateDescription
                      type={item.resource_type}
                      title={item.title}
                      describe={item.description}
                      tags={item.tags ?? []}
                      link={item.link}
                      file={item.file}
                      date={new Date(Date.parse(item.created_at)).toDateString().substring(4)}
                      onSelectTag={onSelectTag}
                    />
                  </div>
                ))}
    
              </div>
            </div>
          }
          mobile={

            <div className='resource_bottom'>
              <div className="resource_bottom__left">
    
                {isLoading ? <Preloader className='resource__preloader' /> : null}
                {!isLoading &&
                resources.data &&
                resources.data.list &&
                resources.data.list.map(item =>  (
                  <div key={item.id} className='resource_card'>
                    <ResourceCard
                      searchTerm={searchTerm}
                      highlight
                      truncateDescription
                      type={item.resource_type}
                      title={item.title}
                      describe={item.description}
                      tags={item.tags ?? []}
                      link={item.link}
                      file={item.file}
                      date={new Date(Date.parse(item.created_at)).toDateString().substring(4)}
                      onSelectTag={onSelectTag}
                    />
                  </div>
                ))}
    
              </div>
            </div>
          }
        />
          


        {!isLoading ? (
          <div className="resource__pagination">
            <Pagination
              totalPages={(resources.data && resources.data.total_pages) || 0}
              activePage={page}
              onChange={setPage}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  resourceCategories: state.resourceStore.resourceCategoriesList,
  resources: state.resourceStore.resourcesList
});

const mapDispatchToProps = dispatch => ({
  dispatchFetchResourceCategories: () => dispatch(fetchResourceCategories()),
  dispatchFetchResources: query => dispatch(fetchResources(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(Resources);
