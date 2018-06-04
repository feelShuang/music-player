import React from 'react'
import Header from './components/header/header'
import Progress from './components/progress/progress'

let duration = null
export default class Component extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      progress: '-'
    }
  }
  componentDidMount() {
    $('#player').jPlayer({
      ready: function() {
        $(this).jPlayer('setMedia', {
          mp3: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3'
        }).jPlayer('play')
      },
      supplied: 'mp3',
      wmode: 'window'
    })
    $('#player').bind($.jPlayer.event.timeupdate, (e) => {
      duration = e.jPlayer.status.duration
      this.setState({
        progress: Math.round(e.jPlayer.status.currentTime)
      })
    })
  }
  componentWillUnmount() {
    $('#player').unbing($.jPlayer.event.timeupdate)
  }
  progressChangeHandler = (progress) => {
    console.log('from root' + progress)
    // 更新jPlayer
    $('#player ').jPlayer('play', duration * progress);
  }
  render() {
    return (
      <div id="J_root">
        <Header />
        <Progress progress={this.state.progress} onProgressChange={this.progressChangeHandler}/>
      </div>
    )
  }
}