import React from 'react';
import ReactDOM from 'react-dom';

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
    // TODO: Implement
  }

  handleSubmit(e) {
    // TODO: Implement
  }
}

ReactDOM.render(<Form />, document.getElementById('root'));
