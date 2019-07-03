import React from 'react';
import List from './composition/List';
import './App.css';

function App(store) {
  const storeList = store.store.lists.map((list, i) => <List key={'list'+i} header={list.header} cards={list.cardIds.map(id => store.store.allCards[id])} />);

  return (
    <main className='App'>
      <header className="App-header">
        <h1>Trelloyes!</h1>
      </header>
      <div className="App-list">{storeList}</div>
      
    </main>
  );
}

export default App;
