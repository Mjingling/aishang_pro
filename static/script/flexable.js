!function (t) {
  var e = 750
    , i = t.document
    , n = i.documentElement
    , o = "orientationchange" in t ? "orientationchange" : "resize"
    , a = function t() {
      var i = n.getBoundingClientRect().width;
      return n.style.fontSize = 5 * Math.max(Math.min(i / e * 20, 11.2), 8.55) + "px",
        t
    }();
  n.setAttribute("data-dpr", t.navigator.appVersion.match(/iphone/gi) ? t.devicePixelRatio : 1),
    /iP(hone|od|ad)/.test(t.navigator.userAgent) && (i.documentElement.classList.add("ios"),
      parseInt(t.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1], 10) >= 8 && i.documentElement.classList.add("hairline")),
    i.addEventListener && (t.addEventListener(o, a, !1),
      i.addEventListener("DOMContentLoaded", a, !1))
}(window);
(function () {
  function init() {
    var sTipHtml = (function () {
      var html = "<!--提示 start-->";
      html += "<div class=\"tips_mod\" style=\"display:none; z-index:10000;\">";
      html += "<div class=\"tips_txt tips_sty1\">";
      html += "<b></b><p></p><span></span>";
      html += "</div>";
      html += "</div>";
      html += "<!--提示 end-->";
      return html;
    })();

    var oTipDom = $(".tips_mod");
    if (oTipDom.size() == 0) {
      $("body").eq(0).append(sTipHtml);
    }
  }
  window.toast = {
    delay: 2000,
    tip: function (tit, msg) {
      init();
      var oTipDom = $(".tips_mod").eq(0);
      oTipDom.focus();
      if (this.timer) clearTimeout(this.timer);
      oTipDom.blur(function () {
        clearTimeout(this.timer);
        oTipDom.hide();
      });
      oTipDom.find("b").text(tit);
      oTipDom.find("p").text(msg);

      oTipDom.show();
      this.timer = setTimeout(function () {
        oTipDom.hide();
      }, this.delay);
    }
  };
})();
