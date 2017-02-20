;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-duihao" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M924.284 336.97c-22.551-53.309-54.822-101.186-95.925-142.284-41.104-41.104-88.976-73.38-142.29-95.93-55.206-23.351-113.83-35.189-174.253-35.189s-119.051 11.838-174.258 35.189c-53.309 22.55-101.181 54.826-142.285 95.93-41.103 41.098-73.379 88.975-95.925 142.284-23.35 55.202-35.189 113.835-35.189 174.254 0 60.423 11.84 119.050 35.189 174.258 22.545 53.309 54.822 101.18 95.925 142.284 41.103 41.104 88.976 73.38 142.285 95.926 55.206 23.35 113.835 35.188 174.258 35.188s119.046-11.838 174.253-35.188c53.313-22.545 101.186-54.822 142.29-95.926 41.098-41.103 73.374-88.975 95.925-142.284 23.35-55.207 35.189-113.835 35.189-174.258 0-60.42-11.84-119.051-35.189-174.254zM748.653 391.17l-271.552 280.268c-5.27 5.438-12.345 8.433-19.921 8.433-6.971 0-13.636-2.599-18.767-7.318l-164.339-151.048c-11.256-10.347-11.998-27.928-1.653-39.191 5.238-5.698 12.684-8.966 20.428-8.966 6.969 0 13.632 2.597 18.764 7.314l144.448 132.769 252.75-260.864c5.275-5.442 12.353-8.438 19.931-8.438 7.241 0 14.092 2.775 19.293 7.815 10.985 10.645 11.261 28.243 0.616 39.226z" fill="#4da231" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)