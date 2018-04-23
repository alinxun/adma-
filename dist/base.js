"use strict";

var base = {};

/**
* 获取指定的 querystring 中指定 name 的 value
* @param {String} name
* @param {String} querystring
* @return {String|undefined}
*
* query('hello', '?hello=js') 结果是 js
*
*/
base.query = function (name, querystring) {
    var regexp = new RegExp("(?:\\?|&)" + name + "=(.*?)(?:&|$)");
    var result = querystring.match(regexp);
    return result ? result[1] : undefined;
};

/**
* 序列化对象，就是把对象转成 url 字符串
* @param {Obj} data
* @return {String}
*
* serialize({hello: 'js', hi: 'test'}) 结果是 ''
*/
base.serialize = function (data) {
    var s = [];
    for (var i in data) {
        s.push(i + '=' + data[i]);
    }
    return s.join('&');
};

/**
 * 根据选择器查找 DOM
 * 就是模拟 $() ，当然，这里返回元素的 DOM 对象即可
 * @param {String} selector
 * @return {DOM|Null}
 */
base.$ = function (selector) {
    return document.querySelector(selector);
};

/**
 * 删除 DOM 节点
 * @param {DOM} node
 * @return {DOM}
 */

base.removeNode = function (node) {
    return node.parentNode.removeChild(node);
};

/**
 * 在 target 节点之后插入 node 节点
 * 类似 $().insertAfter()
 * @param {DOM} node
 * @param {DOM} target
 */
base.insertAfter = function (node, target) {
    var parent = target.parentNode;
    if (parent.lastChild == target) {
        parent.appendChild(node);
    } else {
        parent.insertBefore(node, target.nextSibling);
    }
};

/**
 * 添加类名
 * @param {DOM} node
 * @param {String|Array} className
 */
base.addClass = function (node, className) {
    if (typeof className == 'string') {
        node.classList.add(className);
    } else {
        className.forEach(function (e) {
            node.classList.add(e);
        });
    }
};

/**
 * 移除类名
 * @param {DOM} node
 * @param {String|Array} className
 */
base.removeClass = function (node, className) {
    if (className instanceof Array) {
        className.forEach(function (el) {
            node.classList.remove(el);
        });
    } else {
        node.classList.remove(className);
    }
};

/**
 * 获取绝对路径
 * @param {String} url
 * @return {String}
 *
 * getAbsoluteUrl('/jerojiang') => 'http://imweb.io/jerojiang'
 * 在当前页面获取绝对路径，这里要创建 A 元素，测试用例看你们的了
 */
base.getAbsoluteUrl = function (url) {
    var el = document.createElement("a");
    el.href = url;
    return el.href;
};

/**
 * 防抖动
 * @param {callback} function
 * @param {time} Number
 */
base.debounce = function (callback, time) {
    time = time || 300;
    var timer = null;
    return function () {
        var context = this;
        var args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            callback.apply(context, args);
        }, time);
    };
};

/**
 *  根据所以移出数组的某一项
 * @param {Number} index
 * @param {Array} arr
 * @return {Array}
 *
 * removeItemByIndex(1, [1,2,3]) => [1, 3]
 */
base.removeItemByIndex = function (index, arr) {
    arr.splice(index, 1);
    return arr;
};

module.exports = base;