'use strict';

const Generator = require('yeoman-generator');
// Const chalk = require('chalk');
// const yosay = require('yosay');

module.exports = class extends Generator {
  // eslint-disable-next-line no-useless-constructor
  constructor (args, opts) {
    super(args, opts);
  }

  _createPromiseChain (promiseBuilders) {
    return new Promise((resolve, reject) => {
      this._chainningPromise(promiseBuilders, null, resolve, reject);
    });
  }

  _chainningPromise (promiseBuilders, parentPromise, mainPromiseResolve, mainPromiseReject) {
    if (!parentPromise) {
      parentPromise = Promise.resolve();
    }

    let isLastOnChain = ((promiseBuilders) && (promiseBuilders.length === 1));

    if ((promiseBuilders) && (promiseBuilders.length > 0)) {
      let nextPromiseBuilder = promiseBuilders.shift();

      parentPromise.then(() => {
        let nextPromise = nextPromiseBuilder();

        if (isLastOnChain) {
          return nextPromise
            .then(mainPromiseResolve)
            .catch(mainPromiseReject);
        }

        this._chainningPromise(promiseBuilders, nextPromise, mainPromiseResolve, mainPromiseReject);

        return nextPromise;
      });
    }

    return parentPromise;
  }
};
