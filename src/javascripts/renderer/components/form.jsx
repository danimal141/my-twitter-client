import { remote } from 'electron';
import React from 'react';
import ReactDOM from 'react-dom';
import T from '../services/twitter';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    return(
      <div className='window'>
        <div className='window-content'>
          <div>
            <textarea
              style={{ width: 300, height: 250 }}
              value={this.state.text}
              onChange={this.handleTextChange.bind(this)}
            />
          </div>
        </div>
        <footer className='toolbar toolbar-footer'>
          <div className='toolbar-actions'>
            <button className='btn btn-primary pull-right' onClick={this.handleSubmit.bind(this)}>Tweet</button>
          </div>
        </footer>
      </div>
    );
  }

  handleTextChange(e) {
    e.preventDefault();
    this.setState({ text: e.target.value });
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
      T.post('statuses/update', { status: this.state.text.trim() })
        .catch(err => {
          console.log(err.stack);
        })
        .then(result => {
          this.setState({ text: '' });
        });
    });
  }
}

ReactDOM.render(<Form />, document.getElementById('root'));
