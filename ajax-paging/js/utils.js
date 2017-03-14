Array.prototype.myForEach = function (fn, context) {
    context = context || window;
    if (Array.prototype.forEach) {
        this.forEach(fn, context);
        return;
    }
    for (var i = 0; i < this.length; i++) {
        fn.call(context, this[i], i, this);
    }
};

var utils = {
    toJSON: function (str) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return eval("(" + str + ")");
        }
    },
    ajax: function (url, callBack, async) {
        typeof async === "undefined" ? async = true : null;
        var that = this, reg = /^(2|3)\d{2}$/;
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("MsXML3.XMLHTTP");
        xhr.open("get", url, async);
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && reg.test(this.status)) {
                var data = that.toJSON(this.responseText);
                typeof callBack === "function" ? callBack(data) : null;
            }
        };
        xhr.send();
    }
};