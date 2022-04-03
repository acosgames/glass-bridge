import React from 'react';
import ReactDOM from 'react-dom';
import { GameLoader } from './acosg';
import './index.css';

import GameScreen from './components/GameScreen';

ReactDOM.render(
  <GameLoader component={GameScreen} />,
  document.getElementById('root')
);