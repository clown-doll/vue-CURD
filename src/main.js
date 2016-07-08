/*
* @Author: Administrator
* @Date:   2016-07-08 09:35:05
* @Last Modified by:   Administrator
* @Last Modified time: 2016-07-08 16:42:50
*/

var Vue = require("vue"),
    App = require("./app.vue");


new Vue({
    el: "body",
    components: {
        "app": App
    }
})