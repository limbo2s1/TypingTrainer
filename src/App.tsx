import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';  
import TypingTrainer from './components/TypingTrainer';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <TypingTrainer />
      </div>
    </Provider>
  );
}

export default App;
