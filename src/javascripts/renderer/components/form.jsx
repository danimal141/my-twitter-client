import { remote } from 'electron';
import React from 'react';
import ReactDOM from 'react-dom';
import T from '../services/twitter';
import Draft from '../services/draft';
import Screenshot from '../services/screenshot';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '', nativeImage: null };
  }

  render() {
    return(
      <div className='window'>
        <header className='toolbar toolbar-footer'>
          <div className='toolbar-actions'>
            <button
              className='btn btn-default pull-right'
              onClick={this.handleCapture.bind(this)}>
              <span className='icon icon-monitor'></span>
            </button>
          </div>
        </header>
        <div className='window-content'>
          <div>
            <textarea
              style={{ width: 300, height: 250 }}
              value={this.state.text}
              onChange={this.handleTextChange.bind(this)}
              onBlur={this.handleBlur.bind(this)}
            />
          </div>
        </div>
        <footer className='toolbar toolbar-footer'>
          <div className='toolbar-actions'>
            {this.state.nativeImage !== null ? <img className='img-rounded media-object pull-left' src={this.state.nativeImage.toDataURL()} width='32' height='32'/> : null }
            <button className='btn btn-primary pull-right' onClick={this.handleSubmit.bind(this)}>Tweet</button>
          </div>
        </footer>
      </div>
    );
  }

  componentDidMount() {
    Draft.read()
      .catch(err => {
        console.log(err.stack);
      })
      .then(text => {
        this.setState({ text: text });
      });
  }

  handleTextChange(e) {
    e.preventDefault();
    this.setState({ text: e.target.value });
  }

  handleBlur() {
    Draft.write(this.state.text)
      .catch(err => {
        console.log(err.stack);
      });
  }

  handleCapture() {
    Screenshot.capture()
      .catch(err => {
        console.log(err.stack);
      })
      .then(nativeImage => {
        this.setState({ nativeImage: nativeImage });
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    remote.dialog.showMessageBox({
      type: 'question',
      title: 'Confirmation',
      message: 'Are you sure you want to tweet?',
      buttons: ['Yes', 'No'],
      defaultId: 0,
      cancelId: 1
    }, (idx) => {
      if (idx === 1) {
        return;
      }
      this.uploadMedia()
        .then(mediaId => {
          let params = { status: this.state.text.trim() };
          if (mediaId) {
            params.media_ids = [mediaId];
          }
          this.updateStatus(params);
        });
    });
  }

  uploadMedia() {
    return new Promise((onFulfilled, onRejected) => {
      if (this.state.nativeImage === null) {
        onFulfilled();
        return;
      }
      return T.post('media/upload', {
        media_data: this.state.nativeImage.toPng().toString('base64')
      })
      .catch(err => {
        console.log(err.stack);
      })
      .then(result => {
        onFulfilled(result.data.media_id_string);
      });
    });
  }

  updateStatus(params) {
    T.post('statuses/update', params)
      .catch(err => {
        console.log(err.stack);
      })
      .then(result => {
        this.setState({ text: '', nativeImage: null });
      });
  }
}

ReactDOM.render(<Form />, document.getElementById('root'));
