import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ImSearch } from 'react-icons/im';

import {
  SearchWrapper,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from 'components/MoviesSearch/MoviesSearch.styled';

import * as notify from 'services/notifications';

const MoviesSearch = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchQuery = event => {
    let value = event.currentTarget.value.toLowerCase();
    setSearchParams(value !== '' ? { search: value } : {});
  };

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    let query = form.searchQuery.value.toLowerCase();
    if (query.trim() === '') {
      return notify.notificationWarning(notify.EMPTY_QUERY_MESSAGE);
    }
    onSubmit(query);
    setSearchQuery('');
    form.reset();
  };

  useEffect(() => {
    const search = searchParams.get('search') ?? '';
    setSearchQuery(search);
    if (!searchQuery) {
      return;
    }

    onSubmit(search);
  }, [onSubmit, searchParams, searchQuery]);

  return (
    <SearchWrapper>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormInput
          type="text"
          name="searchQuery"
          autoComplete="off"
          placeholder="Search movies"
          onChange={handleSearchQuery}
        />
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          <ImSearch
            style={{
              width: '1.5em',
              height: '1.5em',
              fill: 'rgb(253, 81, 3)',
            }}
          />
        </SearchFormButton>
      </SearchForm>
    </SearchWrapper>
  );
};

export default MoviesSearch;
