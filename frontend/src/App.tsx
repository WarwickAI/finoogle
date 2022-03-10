import { useState } from 'react';

import './App.css';

import { Button, ControlGroup, Divider, H1, IconSize, InputGroup, Spinner } from '@blueprintjs/core';

import EntitySearch from './components/EntitySearch';

import { searchEntity, SearchResult } from './api/search';

const App = () => {
  const [filter, setFilter] = useState<string>('');

  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const onFilterUpdate = (event: React.ChangeEvent<HTMLInputElement>) => setFilter(event.target.value);

  const submitSearch = async () => {
    setSearchResult(null);
    setIsSearching(true);
    
    searchEntity(filter)
      .then(res => res.json())
      .then(res => setSearchResult(res))
      .then(() => setIsSearching(false))
      .catch(err => alert(err));
  }

  return (
    <div className='App'>
      <div className='container'>
        <H1 id='title'>Finoogle</H1>
        <ControlGroup>
          <InputGroup
            large={true}
            leftIcon='search'
            onChange={onFilterUpdate}
            placeholder='Entity name...'
            value={filter}
            rightElement={isSearching ? <Spinner size={IconSize.STANDARD} /> : undefined}
          />
          <Button
            rightIcon='arrow-right'
            intent='success'
            text='Search'
            large={true}
            disabled={isSearching}
            onClick={submitSearch}/>
        </ControlGroup>
        <Divider />
        <EntitySearch
          searchResult={searchResult}
        />
      </div>
    </div>
  );
}

export default App;
