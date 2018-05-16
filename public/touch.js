'use strict';

/***********************************************************************************************************************************************
 * DRAWERS UI - PUBLIC - TOUCH
 ***********************************************************************************************************************************************
 * @description
 */
import React from 'react';
import Components from '~/components';

/**
 * Home Component
 */
export default class Touch extends React.Component {
  constructor() {
    super();

    this.state = {
    };
  }

  // Open/Close the drawer.

  render() {
    return (
      <div>
        <h1>Touch Demo (requires device)</h1>
        <div className="controls">
          <a href="/">Go To Button Demo</a>
        </div>
        <Components.TouchDrawer></Components.TouchDrawer>
      </div>
    )
  }
}
