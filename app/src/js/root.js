import React from 'react';
import Header from './components/header/header';
import Player from './page/player/player';
import MusicList from './page/musiclist/musiclist';
import { MUSIC_LIST } from '../../resources/musiclist';
import { HashRouter as Router, Switch, IndexRoute, Link, Route, hashHistory } from 'react-router-dom';
import Pubsub from 'pubsub-js';

export default class Root extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={App}></Route>
        </Switch>
      </Router>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      musicList: MUSIC_LIST,
      currentMusicItem: MUSIC_LIST[0]
    };
  }
  playMusic(musicItem) {
    $('#player')
      .jPlayer('setMedia', {
        mp3: musicItem.file
      })
      .jPlayer('play');
    this.setState({
      currentMusicItem: musicItem
    });
  }
  playNext(type = 'next') {
    let index = this.findMusicIndex(this.state.currentMusicItem);
    let newIndex = null;
    let musicListLength = this.state.musicList.length
    if (type == 'next') {
      newIndex = (index + 1) % musicListLength;
    } else {
      newIndex = (index - 1 + musicListLength) % musicListLength;
    }
    this.playMusic(this.state.musicList[newIndex]);
  }
  findMusicIndex(musicItem) {
    return this.state.musicList.indexOf(musicItem);
  }
  componentDidMount() {
    let _this = this;
    $('#player').jPlayer({
      supplied: 'mp3',
      wmode: 'window'
    });
    this.playMusic(this.state.currentMusicItem);

    $('#player').bind($.jPlayer.event.ended, (ev) => {
      this.playNext();
    })

    Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
      this.setState({
        musicList: this.state.musicList.filter(item => {
          return item !== musicItem;
        })
      });
    });

    Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
      this.playMusic(musicItem);
    });

    PubSub.subscribe('PLAY_PREV', (msg, musicItem) => {
      this.playNext('prev');
    });
    Pubsub.subscribe('PLAY_NEXT', (msg, musicItem) => {
      this.playNext();
    });
  }
  componentWillMount() {
    Pubsub.unsubscribe('DELETE_MUSIC');
    Pubsub.unsubscribe('PLAY_MUSIC');
    Pubsub.unsubscribe('PLAY_PREV');
    Pubsub.unsubscribe('PLAY_NEXT');
    $('#player').unbind($.jPlayer.event.ended);
  }
  render() {
    return (
      <div id="J_root">
        <Header />
        <Switch>
          <Route exact path={`${this.props.match.url}`} render={props => <Player currentMusicItem={this.state.currentMusicItem} />} />
          <Route
            exact
            path={`${this.props.match.url}list`}
            render={props => <MusicList {...props} currentMusicItem={this.state.currentMusicItem} musicList={MUSIC_LIST} />}
          />
        </Switch>
        {/* <Player currentMusicItem={this.state.currentMusicItem} /> */}
        {/* <MusicList currentMusicItem={this.state.currentMusicItem} musicList={MUSIC_LIST}/> */}
      </div>
    );
  }
}
