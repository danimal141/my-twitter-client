import React from 'react';
import Tweet from './tweet';

export default class Timeline extends React.Component {
  render() {
    const tweets = this.props.tweets.map(tweet => <Tweet tweet={tweet} key={tweet.id} />);

    return(
      <ul className='list-group'>{tweets}</ul>
    );
  }
}
