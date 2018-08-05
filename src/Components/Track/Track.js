import React from 'react';
import ReactDOM from 'react-dom';
import './Track.css';

class Track extends React.Component {

  constructor(props) {
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.trackDuration = this.trackDuration.bind(this);
    this.checkExplicit = this.checkExplicit.bind(this);
    this.previewSong = this.previewSong.bind(this);
  }

  renderAction() {
    if(this.props.isRemoval) {
      return(<a onClick={this.removeTrack}>-</a>);
    } else {
      return(<a onClick={this.addTrack}>+</a>);
    }
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }
  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  trackDuration() {
    let duration = this.props.track.duration;
    let seconds = (Math.round(duration/1000))%60;
    let minutes = Math.floor((Math.round(duration/1000))/60);
    if(seconds===0) {
      seconds = '00';
    } else if(seconds < 10) {
      let place = seconds;
      seconds = `0${place}`;
    } else {
      seconds = (Math.round(duration/1000))%60;;
    }
    return `Track Length: ${minutes}:${seconds}`;
  }

  checkExplicit() {
    if(!this.props.track.explicit){
    } else {
      return '| explicit';
    }
  }

  previewSong() {
    if(!this.props.track.preview_url) {
      return 'This song does not contain a preview.';
    } else {
      return (
        <audio controls>
          <source src={this.props.track.preview_url}/>
        </audio>);
    }
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <div className="trackPreview">
            <img src={this.props.track.albumArt} alt="test"/>
            <p>{this.trackDuration()} {this.checkExplicit()}</p>
            {this.previewSong()}
          </div>
          <div className="trackInfo">
            <h3>
              {this.props.track.name}
            </h3>
            <p>
            {this.props.track.artist} | {this.props.track.album}
            </p>
          </div>
        </div>
        <p className="Track-action">
          {this.renderAction()}
        </p>
      </div>
    );
  }
}

export default Track;
