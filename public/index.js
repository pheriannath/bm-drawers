'use strict';

/***********************************************************************************************************************************************
 * DRAWERS UI - PUBLIC
 ***********************************************************************************************************************************************
 * @description
 */
 import Continuum from '@liveaxle/continuum';
 import View from '~/system/view';
 import '~/styles/application.scss';

 /**
  * Routes
  * @type {Object}
  */
 import home from './home';
 import touch from './touch';

 /**
  * View List - gets passed to router for binding.
  * @type {Array}
  */
 const views = {
   '/': new View(home),
   '/touch': new View(touch)
 };

 /**
  * Access rules for each route.
  * @type {Object}
  */
 const rules = {
   '/': {protected: false, restricted: false},
   '/touch': {protected: false, restricted: false}
 };

 /**
  * Application Routes
  * @type {[type]}
  */
 const routes = Object.keys(views)
   .map(view => new Continuum.Route(
     view, // path
     views[view].render.bind(views[view]), // handler
     rules[view])); // config

 //
 // ROUTER INIT
 //------------------------------------------------------------------------------------------//
 // @description
 //
 const router = new Continuum.Router();

 // Register each route.
 routes.forEach(route => router.register(route.path, route.load.bind(route)));

 // Start the router.
 router.start();
