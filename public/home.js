'use strict';

/***********************************************************************************************************************************************
 * BEERMATE - PUBLIC - HOME
 ***********************************************************************************************************************************************
 * @description
 */
import React from 'react';
import Components from '~/components';

/**
 * Home Component
 */
export default class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      visible: false,
      fullScreen: false
    };

    // Alias the click methods to prevent them running during render.
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
  }

  // Open/Close the drawer.
  toggleDrawer() {
    this.setState({visible: !this.state.visible});
  }

  // Enter/Leave fullscreen
  toggleFullscreen() {
    this.setState({fullScreen: !this.state.fullScreen});
  }

  render() {
    return (
      <div>
        <button onClick={this.toggleDrawer}>Toggle Drawer</button>
        <button onClick={this.toggleFullscreen}>Toggle Fullscreen</button>
        <Components.Drawer visible={this.state.visible} fullScreen={this.state.fullScreen}></Components.Drawer>
      </div>
    )
  }
}
