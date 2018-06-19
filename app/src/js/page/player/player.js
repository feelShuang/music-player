import React from 'react';
import Progress from '../../components/progress/progress';
import { Link } from 'react-router-dom';
import './player.less'

let duration = null;
export default class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      volume: 0,
      isPlay: true,
      leftTime: ''
    };
  }
  componentDidMount() {
    $('#player').bind($.jPlayer.event.timeupdate, e => {
      duration = e.jPlayer.status.duration;
      this.setState({
        volume: e.jPlayer.options.volume * 100,
        progress: Math.round(e.jPlayer.status.currentPercentAbsolute),
        leftTime: this.formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
      });
    });
  }
  formatTime(time) {
    time = Math.floor(time);
    let miniutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${miniutes}:${seconds}`;
  }
  componentWillUnmount() {
    $("#player").unbind($.jPlayer.event.timeupdate);
  }
  changeProgressHandler = progress => {
    // 更新jPlayer
    $('#player ').jPlayer('play', duration * progress);
  }
  changeVolumeHandler = progress => {
    $('#player').jPlayer('volume', progress)
  }
  play = () => {
    if (this.state.isPlay) {
      $('#player').jPlayer('pause')
    } else {
      $('#player').jPlayer('play')
    }

    this.setState({
      isPlay: !this.state.isPlay
    })
  }
  playPrev = () => {
    PubSub.publish('PLAY_PREV');
  }
  playNext = () => {
    PubSub.publish('PLAY_NEXT');
  }
  render() {
    return (
      <div className="player-page">
        <h1 className="caption">
          <Link to="/list">我的私人音乐坊 &gt;</Link>
        </h1>
        <div className="mt20 row">
          <div className="controll-wrapper" style={{width: '70%'}}>
            <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
            <h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
            <div className="row mt20">
              <div className="left-time -col-auto">-{this.state.leftTime}</div>
              <div className="volume-container">
                <i className="icon-volume rt" style={{ top: 5, left: -5 }} />
                <div className="volume-wrapper">
                  <Progress progress={this.state.volume} onProgressChange={this.changeVolumeHandler} barColor="#aaa" />
                </div>
              </div>
            </div>
            <div style={{ height: 10, lineHeight: '10px' }}>
              <Progress progress={this.state.progress} onProgressChange={this.changeProgressHandler} />
            </div>
            <div className="mt35 row">
              <div>
                <i className="icon prev" onClick={this.playPrev} />
                <i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.play} />
                <i className="icon next ml20" onClick={this.playNext} />
              </div>
              <div className="-col-auto">
                <i className={`icon repeat-${this.props.repeatType}`} onClick={this.changeRepeat} />
              </div>
            </div>
          </div>
          <div className="-col-auto cover">
            <img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title} />
          </div>
        </div>
      </div>
    );
  }
}
