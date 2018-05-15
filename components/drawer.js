'use strict';

/***********************************************************************************************************************************************
 * BEERMATE - COMPONENTS - DRAWER
 ***********************************************************************************************************************************************
 * @description
 */

import React from 'react';
import Classnames from 'classnames';

/**
 * Components Export
 */
export default class Drawer extends React.Component {
  constructor() {
    super();

    this.state = {
    }
  }

  componentWillReceiveProps() {

  }

  render () {
    var classes = Classnames({
      'open': this.props.visible,
      'fullscreen': this.props.fullScreen
    }, 'drawer');

    return (
      <div className="drawer-container">
        <div className={classes}>
          <div className="drawer-content">
            <p>I'm a drawer and I'm {this.props.visible ? 'open' : 'closed'}.</p>
            <p>I am {this.props.fullScreen ? 'fullscreen!' : 'not fullscreen.'}</p>
          </div>
        </div>
      </div>
    )
  }
};
