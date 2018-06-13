import React from 'react'
import Header from './components/header/header'
import Player from './page/player/player'
import MusicList from './page/musiclist/musiclist'
import { MUSIC_LIST } from '../../resources/musiclist'
import { HashRouter as Router, Switch, IndexRoute, Link, Route, hashHistory } from 'react-router-dom'

export default class Root extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={App}>
            {/* <IndexRoute component={Player}></IndexRoute> */}
            <Route path={`${props.match.path}/list`} component={MusicList}></Route>
          </Route>
        </Switch>
      </Router>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentMusicItem: MUSIC_LIST[0]
    }
  }
  componentDidMount() {
    $('#player').jPlayer({
      ready: function() {
        $(this).jPlayer('setMedia', {
          mp3: this.state.currentMusicItem.file
        }).jPlayer('play')
      },
      supplied: 'mp3',
      wmode: 'window'
    })
  }
  render() {
    return (
      <div id="J_root">
        <Header />
        {/* { React.cloneElement(this.props.children, this.state) } */}
        {/* <Player currentMusicItem={this.state.currentMusicItem} /> */}
        {/* <MusicList currentMusicItem={this.state.currentMusicItem} musicList={MUSIC_LIST}/> */}
      </div>
    )
  }
}