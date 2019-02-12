function isTD() {
    var uagent = navigator.userAgent.toLowerCase();
    var arrMo = new Array('midp', 'j2me', 'avantg', 'ipad', 'iphone', 'docomo', 'novarra', 'palmos', 'palmsource', '240x320', 'opwv', 'chtml', 'pda', 'windows ce', 'mmp/', 'mib/', 'symbian', 'wireless', 'nokia', 'hand', 'mobi', 'phone', 'cdm', 'up.b', 'audio', 'sie-', 'sec-', 'samsung', 'htc', 'mot-', 'mitsu', 'sagem', 'sony', 'alcatel', 'lg', 'erics', 'vx', 'nec', 'philips', 'mmm', 'xx', 'panasonic', 'sharp', 'wap', 'sch', 'rover', 'pocket', 'benq', 'java', 'pt', 'pg', 'vox', 'amoi', 'bird', 'compal', 'kg', 'voda', 'sany', 'kdd', 'dbt', 'sendo', 'sgh', 'gradi', 'jb', 'dddi', 'moto', 'opera mobi', 'opera mini', 'android');
    isMo = false;
    for (i = 0; i < arrMo.length; i++) {
        if (uagent.indexOf(arrMo[i]) != -1) {
            isMo = true;
            break;
        }
    }
    if (isMo) {
        if (uagent.indexOf('android') != -1) {
            return 'a';
        } else if (uagent.indexOf('iphone') != -1 || uagent.indexOf('ipad') != -1) {
            return 'i';
        } else {
            return 'j';
        }
    } else {
        return 'p';
    }
}
var Bs = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    srcs: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = Bs._utf8_srcs(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64
            } else if (isNaN(chr3)) {
                enc4 = 64
            }
            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4)
        }
        return output
    },
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2)
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3)
            }
        }
        output = Bs._utf8_decode(output);
        return output
    },
    _utf8_srcs: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c)
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128)
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128)
            }
        }
        return utftext
    },
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3
            }
        }
        return string
    }
};

function sotcoo(s1) {
    var expireDate = new Date();
    var expstring = expireDate.setDate(expireDate.getDate() + 365);
    document.cookie = "ii=" + s1 + "; expires=" + expireDate.toGMTString();
}
var pire = 'pb';

function getCookie(name) {
    var cname = name + "=";
    var dc = document.cookie;
    if (dc.length > 0) {
        begin = dc.indexOf(cname);
        if (begin != -1) {
            begin += cname.length;
            end = dc.indexOf(";", begin);
            if (end == -1) end = dc.length;
            return unescape(dc.substring(begin, end));
        }
    }
    return null;
}

function sr(js) {
    var _0x5d3d = ["\x30\x20\x34\x3D\x32\x2E\x31\x28\x27\x2E\x27\x2B\x33\x2E\x35\x2E\x37\x29\x3B\x30\x20\x36\x3D\x27\x38\x27\x3B", "\x7C", "\x73\x70\x6C\x69\x74", "\x76\x61\x72\x7C\x73\x72\x63\x73\x7C\x42\x73\x7C\x77\x69\x6E\x64\x6F\x77\x7C\x75\x7C\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x7C\x67\x7C\x68\x6F\x73\x74\x6E\x61\x6D\x65\x7C\x4C\x6D\x4E\x68\x62\x58\x46\x31\x59\x58\x6C\x30\x59\x58\x6B\x75\x59\x32\x39\x74", "\x72\x65\x70\x6C\x61\x63\x65", "", "\x5C\x77\x2B", "\x5C\x62", "\x67"];
    eval(function (_0x2cd8x1, _0x2cd8x2, _0x2cd8x3, _0x2cd8x4, _0x2cd8x5, _0x2cd8x6) {
        _0x2cd8x5 = function (_0x2cd8x3) {
            return _0x2cd8x3
        };
        if (!_0x5d3d[5][_0x5d3d[4]](/^/, String)) {
            while (_0x2cd8x3--) {
                _0x2cd8x6[_0x2cd8x3] = _0x2cd8x4[_0x2cd8x3] || _0x2cd8x3
            };
            _0x2cd8x4 = [function (_0x2cd8x5) {
                return _0x2cd8x6[_0x2cd8x5]
            }];
            _0x2cd8x5 = function () {
                return _0x5d3d[6]
            };
            _0x2cd8x3 = 1;
        };
        while (_0x2cd8x3--) {
            if (_0x2cd8x4[_0x2cd8x3]) {
                _0x2cd8x1 = _0x2cd8x1[_0x5d3d[4]](new RegExp(_0x5d3d[7] + _0x2cd8x5(_0x2cd8x3) + _0x5d3d[7], _0x5d3d[8]), _0x2cd8x4[_0x2cd8x3])
            }
        };
        return _0x2cd8x1;
    }(_0x5d3d[0], 9, 9, _0x5d3d[3][_0x5d3d[2]](_0x5d3d[1]), 0, {}));
    if (u == g) {
        return js
    } else {
        return
    };
}

function soss() {
    var ry = Math.floor(Math.random() * 11);
    if (ry == 0) ry = 1;
    return ry;
}

function soos(id) {
    document.write('<img src="/images/' + id + '.jpg" width="100%" height="auto" />');
}

function setck(name, sl) {
    var expireDate = new Date();
    var expstring = expireDate.setDate(expireDate.getDate() + 1);
    document.cookie = name + "=" + sl + "; expires=" + expireDate.toGMTString() + "; path=/";
}

function getck(name) {
    var cname = name + "=";
    var dc = document.cookie;
    if (dc.length > 0) {
        begin = dc.indexOf(cname);
        if (begin != -1) {
            begin += cname.length;
            end = dc.indexOf(";", begin);
            if (end == -1) end = dc.length;
            return unescape(dc.substring(begin, end));
        }
    }
    return null;
}

function xck(name, sl) {
    document.cookie = name + "=" + sl + "; expires=Mon, 11-November-1989 00:00:01 GMT";
}

function lb(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|_|¥|€|\.|\:|\'| |\"|\&|\#|\[|\]|~/g, "-");
    str = str.replace(/-+-/g, "-");
    str = str.replace(/^\-+|\-+$/g, "");
    return str;
}