import React from 'react'
import './header.less'
import logo from '../../../static/images/logo.png'

export default class Component extends React.Component {
    render() {
        return (
            <div className="components-header row">
                <img src={logo} width="40" alt="" className="-col-auto"/>
                <h1 className="caption">React Music Player</h1>
            </div>
        )
    }
}
