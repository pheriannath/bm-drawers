
/***********************************************************************************************************************************************
 * DRAWERS UI- TESTS - UNIT
 ***********************************************************************************************************************************************
 * @description
 */
const path = require('path');
const Mocha = require('mocha');
const fs = require('fs');
const mocha = new Mocha({reporter: 'nyan', fullTrace: false});
const args = require('minimist')(process.argv.slice(2));

// Global Using Helper
global.using = function(mod='') {
  return require(path.join(process.cwd(), mod));
};

// Stub for TDD
global.runner = {
  stub: notYetImplementedStub
};


//
// SPECS
//------------------------------------------------------------------------------------------//
// @description
//
const specs = {
  // require your specs here in order you want them to run
  intro: path.join(__dirname, 'intro.js')
};

//
// RUNNER
//------------------------------------------------------------------------------------------//
// @description
Object.keys(specs).forEach(spec => mocha.addFile(specs[spec]));

// Run specs
mocha.run((failures=0) => {
  // essentially, for CI we can opt in to break the process on test fails,
  //but for dev it's a little tedious
  if(!args['brk-failures']) return;

  process.on('exit', function () {
    process.exit(failures);  // exit with non-zero status if there were failures - mainly for CI.
  });
});


//
// RUNNER HELPERS
//------------------------------------------------------------------------------------------//
// @description
//
function notYetImplementedStub() {
  throw new Error('Test not yet implemented');
}
