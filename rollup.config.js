
export default {
  entry: './release/index.js',
  dest: './release/bundles/angular-validators.umd.js',
  format: 'umd',
  moduleName: 'angular-validators',
  globals: {
    '@angular/core': 'ng.core',
    '@angular/forms': 'ng.forms',
    '@angular/common': 'ng.common',
    'rxjs/Observable': 'Rx',
    'rxjs/add/operator/map': 'Rx.Observable'
  }
}
