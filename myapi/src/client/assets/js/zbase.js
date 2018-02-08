(function() {
  window.ZBase = window.ZBase || {};

  ZBase.Date = ZBase.Date || {};
  /*
      para:
        _date: date string, e.g. 2010-01-01 9:20:30 or 2010/01/01 9:20:30
        _format: format string, e.g. "yyyy-MM-dd HH:mm:ss"
      return
        string
  */
  ZBase.Date.getDateByFormat = function(_dateStr, _formatType, _ifSupplyZero) {
    _ifSupplyZero = _ifSupplyZero == undefined ? true : _ifSupplyZero;
    try {
      if (_dateStr == null || _dateStr === "") return "";
      var _dateObj = typeof _dateStr == "number" ? new Date(_dateStr) : typeof _dateStr == "string" ? new Date((_dateStr + "").replace(/-/g, "/")) : _dateStr,
        dateFormat = _formatType || "yyyy-MM-dd HH:mm:ss";

      dateFormat = dateFormat.replace("yyyy", _dateObj.getFullYear());
      var _month = _dateObj.getMonth() + 1,
        _day = _dateObj.getDate(),
        _hour = _dateObj.getHours(),
        _minute = _dateObj.getMinutes(),
        _second = _dateObj.getSeconds();
      dateFormat = dateFormat.replace("MM", _month > 9 ? _month : ((_ifSupplyZero ? "0" : "") + _month));
      dateFormat = dateFormat.replace("dd", _day > 9 ? _day : ((_ifSupplyZero ? "0" : "") + _day));
      dateFormat = dateFormat.replace("HH", _hour > 9 ? _hour : ((_ifSupplyZero ? "0" : "") + _hour));
      dateFormat = dateFormat.replace("mm", _minute > 9 ? _minute : ("0" + _minute));
      dateFormat = dateFormat.replace("ss", _second > 9 ? _second : ("0" + _second));

      return dateFormat;
    } catch (ex) {
      return _dateStr;
    }
  };

  ZBase.Date.getWeekWithMonth = function(_dateStr) {
    var date = typeof _dateStr == "number" ? new Date(_dateStr) : typeof _dateStr == "string" ? new Date((_dateStr + "").replace(/-/g, "/")) : _dateStr;
    var week = date.getDay();
    var monday = new Date(ZBase.Date.getDateByFormat(date.getTime() - (week == 0 ? 6 : (week - 1)) * 24 * 60 * 60 * 1000, "yyyy/MM/dd 00:00:00"));

    var firstDay = new Date(monday.getFullYear() + "/" + (monday.getMonth() + 1) + "/1 00:00:00");

    var dateDiff = (monday.getTime() - firstDay.getTime()) / (7 * 24 * 60 * 60 * 1000);
    return {
      year: monday.getFullYear(),
      month: monday.getMonth() + 1,
      week: Math.floor(dateDiff + 1)
    };
  };

  ZBase.Common = ZBase.Common || {};

  ZBase.Common.getUrlParams = function() {
    var params = {};
    var paramList = window.location.search.substring(1).split("&");
    var len = paramList.length;
    for (var i = 0; i < len; i += 1) {
      var _p = paramList[i],
        _index = _p.indexOf("=");
      if (_index > -1) {
        if (_index === 0) continue;
        params[decodeURIComponent(_p.split("=")[0])] = decodeURIComponent(_p.substr(_index + 1));
      } else {
        params[decodeURIComponent(_p)] = null;
      }
    }
    return params;
  };

  ZBase.String = ZBase.String || {};
  ZBase.String.getRealLength = function(_str) {
    var realLength = 0,
      len = _str.length,
      charCode = -1;
    for (var i = 0; i < len; i++) {
      charCode = _str.charCodeAt(i);
      if (charCode >= 0 && charCode <= 128) realLength += 1;
      else realLength += 2;
    }
    return realLength;
  };
})();