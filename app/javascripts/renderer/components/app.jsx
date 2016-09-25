import React from 'react';
import ReactDOM from 'react-dom';
import T from '../services/twitter';
import Timeline from './timeline';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tweets: [] };
  }

  render() {
    return(
      <div className='window'>
        <div id='window-content' className='window-content'>
          Render from react.
        </div>
      </div>
    );
  }
}

const root = document.getElementById('root');
ReactDOM.render(<App />, root);
