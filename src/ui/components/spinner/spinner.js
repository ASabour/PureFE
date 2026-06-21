/**
 * spinner.js — loading indicator component.
 * Template imported as raw string — no AMD loader needed.
 *
 * Usage: <loading-spinner params="visible: isLoading"></loading-spinner>
 */
import ko from 'knockout';
import template from './spinner.html?raw';

class SpinnerViewModel {
  /** @param {{ visible: ko.Observable<boolean> }} params */
  constructor(params) {
    this.visible = params?.visible ?? ko.observable(false);
  }
}

ko.components.register('loading-spinner', {
  viewModel: SpinnerViewModel,
  template,                          // ← raw string, NOT { require: '...' }
});
