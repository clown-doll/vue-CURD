<style>
    .form-table{ margin: 20px 0; width: 100%; border-collapse: collapse; border-spacing: 0; text-align: center;}
    .form-table th,
    .form-table td{ border: 1px solid #bcbcbc; line-height: 2; }
    .form-table th{ background-color: #0090d3; color: #fff; }
    .form-table tr:nth-of-type(odd){ background-color: #fff; }
    .form-table tr:nth-of-type(even){ background-color: #eee; }

    .create-new{ margin-left: 40px; }
</style>

<template>
    <table class="form-table">
        <thead>
            <tr>
                <th v-for="col in columns">
                    {{col.name | capitalize}}
                </th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody> 
            <tr v-for="(index, item) in dataList | filterBy searchKey">
                <td v-for="col in columns">
                    <span v-if="col.isKey" v-on:click="openEditItemDialog(item[col.name])">
                        <a href="javascript:;" title="">
                            {{item[col.name] | capitalize}}
                        </a>
                    </span>
                    <span v-else>
                        {{item[col.name] | capitalize}}
                    </span>
                </td>
                <td>
                    <button class="btn btn-red" v-on:click="deleteItem(index)">delete</button>
                </td>
            </tr>
        </tbody>
    </table>
    <button class="btn btn-blue btn-large create-new" v-on:click="openNewItemDialog('Create New Item')">Create</button>
    <dialog-component v-bind:dialog-title="title" v-bind:fields="columns" v-bind:item="item" v-bind:mode="mode" v-on:create-item="createItem()" v-on:edit-item="editItem"></dialog-component>    
</template>

<script>
    var dialogComponent = require("./dialog.vue");

    module.exports = {
        data: function() {
            return {
                title: "",
                item: {},
                mode: 0
            }
        },
        ready: function(){ // 获得主键的名称
            for (var i = 0; i < this.columns.length; i++) {
                if (this.columns[i].isKey) {
                    this.keyColumn = this.columns[i]['name']
                    break;
                }
            }
        },
        props: ["dataList", "columns", "searchKey"],
        methods: {
            deleteItem: function(index) {
                this.dataList.splice(index, 1);
            },
            openNewItemDialog: function(title) {
                this.mode = 1;
                this.title = title;
                this.$broadcast("showDialog", true);
            },
            createItem: function() {
                var keyColumn = this.keyColumn;
                
                if(!this.itemExists()){
                    this.dataList.push(this.item);
                    this.$broadcast("showDialog", false);
                    this.item = {};
                } else {
                    alert(keyColumn + ' "' + this.item[keyColumn] + '" is already exists!');
                }
            },
            editItem: function() {
                var keyColumn = this.keyColumn,
                    dataLen = this.dataList.length;
                // 利用主键值找到对应的item，用新值替换旧值
                for(var i = 0; i < dataLen; i++){
                    if(this.dataList[i][keyColumn] === this.item[keyColumn]) {
                        for(var j in this.item) {
                            this.dataList[i][j] = this.item[j];
                        }
                        break;
                    }
                }
                this.$broadcast('showDialog', false);
                this.item = {};
            },
            openEditItemDialog: function(tit) {
                var curItem = this.findItemByKey(tit);
                this.item = this.copyCurItem(curItem);
                this.title = "Edit Item - " + tit;
                this.mode = 2;
                this.$broadcast("showDialog", true);
            },
            findItemByKey: function(key) {  //查找当前项
                var keyColumn = this.keyColumn,
                    dataLen = this.dataList.length;
                for(var i = 0; i < dataLen; i++){
                    if(this.dataList[i][keyColumn] === key){
                        return this.dataList[i];
                    }
                }
            },
            copyCurItem: function(cur) { // 深拷贝当前项
                var c = c || {};
                for(var pro in cur){
                    if(cur.hasOwnProperty(pro)) {
                        if (typeof cur[pro] === 'object') {
                            c[pro] = Array.isArray(cur[pro]) ? [] : {};
                            deepCopy(cur[pro], c[pro]);
                        } else {
                            c[pro] = cur[pro];
                        }
                    }
                }
                return c;
            },
            itemExists: function() { // 根据主键查重
                var keyColumn = this.keyColumn,
                    dataLen = this.dataList.length;

                for(var i = 0; i < dataLen; i++) {
                    if(this.item[keyColumn].toLocaleLowerCase() === this.dataList[i][keyColumn].toLocaleLowerCase()) {
                        return true; // 如果已存在，返回true
                    }
                }

                return false; // 如果不存在，返回false
            }
        },
        components: {
            "dialog-component": dialogComponent
        }
    }
</script>