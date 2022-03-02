import { useState } from 'react';

import './App.css';

import { Button, ControlGroup, Divider, H1, InputGroup, Spinner } from '@blueprintjs/core';

import EntitySearch from './components/EntitySearch';
import { searchEntity, SearchResult } from './api/search';

const App = () => {
  const [filter, setFilter] = useState<string>('');

  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);

  const onFilterUpdate = (event: React.ChangeEvent<HTMLInputElement>) => setFilter(event.target.value);

  const submitSearch = async () => {
    setSearchResult(null);
    
    searchEntity(filter)
      .then(res => res.json())
      .then(res => setSearchResult(res))
      .catch(err => alert(err));
  }

  return (
    <div className='App'>
      <div className='container'>
        <H1 id='title'>Finoogle</H1>
        <ControlGroup>
          <InputGroup
            asyncControl={true}
            large={true}
            leftIcon='search'
            onChange={onFilterUpdate}
            placeholder='Entity name...'
            value={filter}
          />
          <Button
            rightIcon='arrow-right'
            intent='success'
            text='Search'
            large={true}
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
