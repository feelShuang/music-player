import React from 'react'
import './progress.less'

export default class Component extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      barColor: '#2f9842'
    }
  }
  changeProgress = (ev) => {
    let progressBar = this.refs.progressBar
		let progress = (ev.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth
    this.props.onProgressChange && this.props.onProgressChange(progress)
  }
  render() {
    return (
      <div className="components-progress" ref="progressBar" onClick={this.changeProgress}>
        <div className="progress" style={{width: `${this.props.progress}%`, backgroundColor: this.state.barColor}}></div>
      </div>
    )
  }
}