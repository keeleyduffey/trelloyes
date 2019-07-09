import React, {Component} from 'react'
import List from './composition/List'
import './App.css'
import STORE from './store'

const newRandomCard = () => {
  const id = Math.random().toString(36).substring(2, 4)
    + Math.random().toString(36).substring(2, 4);
  return {
    id,
    title: `Random Card ${id}`,
    content: 'lorem ipsum',
  }
}

function omit(obj, keyToOmit) {
  return Object.entries(obj).reduce(
    (newObj, [key, value]) =>
      key === keyToOmit ? newObj : {...newObj, [key]: value},
    {}
  );
}

class App extends Component {
	state = {
    store: STORE
  };

  addNewCard = (listId) => {
		const newCard = newRandomCard();
		const updatedList = this.state.store.lists.filter(list => {
			if (list.id === listId) {
				return list.cardIds.push(newCard.id)
			}
			return list;
		});
		const {allCards} = this.state.store;
		allCards[newCard.id] =  newCard;
		this.setState({
			store: {
        lists: updatedList,
        allCards
      }
		})
  }

  deleteCard = (cardId) => {
		const {allCards, lists} = this.state.store;
		const updatedList = lists.map(list => ({
      ...list,
      cardIds: list.cardIds.filter(id => id !== cardId)
    }));
		
		const updatedCards = omit(allCards, cardId);

		this.setState({
			store: {
				lists: updatedList,
				allCards: updatedCards
			}
		})
  }
	
	render () {
		const {store} = this.state
		return (
	    <main className='App'>
	      <header className="App-header">
	        <h1>Trelloyes!</h1>
	      </header>
	      <div className="App-list">
					{store.lists.map(list => (
            <List
              key={list.id}
              id={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              onClickDelete={this.deleteCard}
              onClickAdd={this.addNewCard}
            />
          ))}
	      </div>
	      
	    </main>
	  );
	}
  
}

export default App;
