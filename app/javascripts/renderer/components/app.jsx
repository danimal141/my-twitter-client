import React from 'react';
import ReactDOM from 'react-dom';
import T from '../services/twitter';
import Timeline from './timeline';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tweets: [] };
  }

  render() {
    return(
      <div className='window'>
        <div id='window-content' className='window-content'>
          <Timeline tweets={this.state.tweets} />
        </div>
      </div>
    );
  }

  componentDidMount() {
    T.get('statuses/home_timeline')
      .catch(err => {
        console.log(err.stack);
      })
      .then(result => {
        if (result.data.errors) {
          console.log(result.data.errors);
          return;
        }
        this.setState({ tweets: result.data });
        this.connectStream();
      });
  }

  connectStream() {
    const stream = T.stream('user');

    stream.on('error', (error) => {
      throw error;
    });
    stream.on('tweet', (tweet) => {
      const tweets = this.state.tweets;
      const newTweets = [tweet].concat(tweets);
      this.setState({ tweets: newTweets });
    });
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
