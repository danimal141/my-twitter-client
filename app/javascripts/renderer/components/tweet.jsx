import React from 'react';
import T from '../services/twitter';

export default class Tweet extends React.Component {
  render() {
    const isRetweet = this.props.tweet.hasOwnProperty('retweeted_status');
    const status = isRetweet ? this.props.tweet.retweeted_status : this.props.tweet;
    const media = status.entities.media || [];
    const firstImage = media.find(item => { item.type === 'photo' });

    return(
      <li className='list-group-item'>
        <img
          src={status.user.profile_image_url_https}
          className='img-rounded media-object pull-left'
          width='32'
          height='32'/>
        <div className='media-body'>
          <strong className='media-body__user-name'>{status.user.name}</strong>
          <span className='media-body__user-screen-name'>@{status.user.screen_name}</span>
          <p className='media-body__text'>{status.text}</p>
          {firstImage ? <img src={firstImage.media_url_https} className='img-rounded media-object media-body__img' /> : null}
          {isRetweet ? <span className='icon media-body__icon-retweet'>Retweeted by {this.props.tweet.user.name}</span> : null}
        </div>
      </li>
    );
  }
}
