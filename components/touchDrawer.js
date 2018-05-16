'use strict';

/***********************************************************************************************************************************************
 * DRAWERS UI - COMPONENTS - TOUCH DRAWER
 ***********************************************************************************************************************************************
 * @description
 */

import React from 'react';
import Classnames from 'classnames';

/**
 * Drawer Component
 */

export default class TouchDrawer extends React.Component {
  constructor() {
    super();

    this.state = {};

    this.drawerContainer = React.createRef();
  }

  // Set position.
  setPosition = e => {
    e.preventDefault();

    const newX = e.touches[0].clientX;

    if (newX - this.startX + this.oldTransform < 0 && newX - this.startX + this.oldTransform > -276) {
      this.currentPosition = newX;
    }
  }

  isOpen = false;
  isDragging = false;
  isFullscreen = false;
  oldTransform = -276;

  // Start dragging.
  startDrag = e => {
    this.isDragging = true;
    
    // this.oldTransform = this.isOpen ? 0 : -276;
    if(this.isOpen || this.isOpen && this.isFullscreen) {
      this.oldTransform = 0;
    }
    else {
      this.oldTransform = -276;
    }

    this.drawerContainer.current.classList.remove('touch-drawer-open', 'touch-drawer-fullscreen', 'touch-drawer-closed');
    this.drawerContainer.current.style.transform = `translateX(${this.oldTransform}px)`;
    this.startX = e.touches[0].clientX;
    this.currentPosition = this.startX;
    this.update();
  }

  // End dragging.
  endDrag = () => {
    this.startX = false;
    this.isDragging = false;

    if(this.isOpen === false) {
      if (this.currentTransform > -180) {
        this.isOpen = true;
      }
      if (this.currentTransform > -5) {
        this.isFullscreen = true;
      }
    }
    else if (this.currentTransform < -100) {
      this.isOpen = false;
    }

    this.drawerContainer.current.style.transform = '';
    this.updateClasses();
  }

  // Update CSS classes.
  updateClasses = () => {
    if (this.isOpen) {
      this.drawerContainer.current.classList.remove('touch-drawer-closed');
      this.drawerContainer.current.classList.add('touch-drawer-open');
    }
    else if (this.isFullscreen) {
      this.drawerContainer.current.classList.remove('touch-drawer-closed');
      this.drawerContainer.current.classList.add('touch-drawer-fullscreen');
    }
    else {
      this.drawerContainer.current.classList.add('touch-drawer-closed');
      this.drawerContainer.current.classList.remove('touch-drawer-open', 'touch-drawer-fullscreen');
    }
  }

  // Update animation frames.
  update = () => {
    if (this.isDragging) {
      const currentTransform = this.currentPosition - this.startX + this.oldTransform;

      if (currentTransform < 0 && currentTransform > -276) {
        this.currentTransform = currentTransform;
        this.drawerContainer.current.style.transform = `translateX(${this.currentTransform}px)`;
      }
      window.requestAnimationFrame(this.update);
    }
  }

  render() {
    return (
      <div
        ref={this.drawerContainer}
        onTouchStart={this.startDrag}
        onTouchEnd={this.endDrag}
        onTouchMove={this.setPosition}
        className="touch-drawer touch-drawer-closed"
      >
        <div className="touch-drawer-content">Drawer</div>
      </div>
    )
  }
}
