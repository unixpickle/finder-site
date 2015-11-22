(function() {

  function FinderWindow() {
    this._container = document.createElement('div');
    this._container.innerHTML = WINDOW_CODE;
    this._container.style.position = 'absolute';
    this._container.style.left = 'calc(50% - 450px)';
    this._container.style.width = '900px';

    this._svgElement = this._container.childNodes[0];
    this._svgElement.setAttribute('style', 'width: 100%; height: 100%; position: absolute');

    document.body.appendChild(this._container);
    this._windowShapePath = document.getElementById('window-shape');
    document.body.removeChild(this._container);
    this._defaultPath = this._windowShapePath.getAttribute('d');

    this._currentShowing = null;
  }

  FinderWindow.prototype.element = function() {
    return this._container;
  };

  FinderWindow.prototype.swallowBody = function() {
    var element = document.createElement('div');
    element.style.display = 'inline-block';
    while (document.body.childNodes.length > 0) {
      element.appendChild(document.body.childNodes[0]);
    }
    this.showElement(element);
  };

  FinderWindow.prototype.showElement = function(element) {
    if (this._currentShowing) {
      this._container.removeChild(this._currentShowing);
    }

    element.style.width = '800px';
    element.style.visibility = 'none';
    element.style.position = 'fixed';

    document.body.appendChild(element);
    var height = element.offsetHeight;
    document.body.removeChild(element);

    this._updateElementHeight(height);

    element.style.position = 'absolute';
    element.style.visibility = 'visible';
    element.style.left = '50px';
    element.style.top = '90px';
    this._container.appendChild(element);
    this._currentShowing = element;
  };

  FinderWindow.prototype._updateElementHeight = function(contentHeight) {
    var totalHeight = Math.ceil(contentHeight + 80 + 60);

    this._container.style.height = totalHeight + 'px';

    var newPath = this._defaultPath.replace('400', '' + Math.ceil(contentHeight + 60));
    this._windowShapePath.setAttribute('d', newPath);

    this._svgElement.setAttribute('viewBox', '0 20 900 ' + totalHeight);
  };

  window.FinderWindow = FinderWindow;

  var WINDOW_CODE =
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" \
          viewBox="0 20 900 480"> \
      <defs> \
        <filter id="drop-shadow"> \
          <feOffset in="SourceGraphic" result="offsetOut" dx="0" dy="15" /> \
          <feGaussianBlur in="offsetOut" result="blurOut" stdDeviation="15" /> \
        </filter> \
        <linearGradient id="header-gradient" y1="0%" y2="100%" x1="0%" x2="0%"> \
          <stop stop-color="#ebebeb" offset="0%" /> \
          <stop stop-color="#d5d5d5" offset="100%" /> \
        </linearGradient> \
        <path id="window-shape" \
              d="M50,50 m0,4 a4,4 0 0 1 4,-4 h792 a4,4 0 0 1 4,4 v400 \
                 a4,4 0 0 1 -4,4 h-792 a4,4 0 0 1 -4,-4 z" /> \
      </defs> \
      <use id="shadow" xlink:href="#window-shape" filter="url(#drop-shadow)" \
           fill="black" fill-opacity="0.45" /> \
      <use id="content-background" xlink:href="#window-shape" \
           fill="#f6f6f6" /> \
      <path id="header-background" fill="url(#header-gradient)" \
            stroke="#7d7d7d" stroke-width="1" stroke-opacity="0" \
            d="M50,50 m0,4 a4,4 0 0 1 4,-4 h792 a4,4 0 0 1 4,4 v60 \
               h-800 z" /> \
      <path id="header-separator" fill="#969696" d="M50,114, h800 v1 h-800 z" /> \
      <use id="content-border" xlink:href="#window-shape" \
           transform="translate(-0.5 -0.5) scale(1.00125 1.0024509804)" \
           fill="none" stroke="black" stroke-width="1" stroke-opacity="0.09" /> \
      <!-- Window control buttons --> \
      <circle cx="64" cy="61" fill="#ff5f58" r="6" stroke="#e1463f" stroke-width="1" /> \
      <circle cx="84" cy="61" fill="#ffbd2d" r="6" stroke="#dfa022" stroke-width="1" /> \
      <circle cx="104" cy="61" fill="#28c53e" r="6" stroke="#1aab2b" stroke-width="1" /> \
    </svg>';

})();
