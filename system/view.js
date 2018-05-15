'use strict';

/***********************************************************************************************************************************************
 * DRAWERS UI - SYSTEM - VIEW
 ***********************************************************************************************************************************************
 * @description
 */
import Continuum from '@liveaxle/continuum';
import React from 'react';
import Dom from 'react-dom';

/**
 *
 */
export default class View extends Continuum.View {
  constructor(component, config={}) {
    super(component, config);

    this.component = component;
  }


  render(params) {
    Dom.unmountComponentAtNode(document.getElementById('root'));
    this.instance = Dom.render(<this.component params={params} view={this} />, document.getElementById('root'));
  }
}
