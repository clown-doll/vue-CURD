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
            <tr v-for="(index, item) in dataList | filterBy searchkey">
                <td v-for="col in columns">
                    {{item[col.name] | capitalize}}
                </td>
                <td>
                    <button class="btn btn-red" v-on:click="deleteItem(index)">delete</button>
                </td>
            </tr>
        </tbody>
    </table>
    <button class="btn btn-blue btn-large create-new" v-on:click="openNewItemDialog('Create New Item')">Create</button>
    <dialog-component v-bind:dialog-title="title"></dialog-component>    
</template>

<script>
    var dialogComponent = require("./dialog.vue");

    module.exports = {
        data: function() {
            return {
                title: ""
            }
        },
        props: ["dataList", "columns", "searchkey"],
        methods: {
            deleteItem: function(index) {
                this.dataList.splice(index, 1);
            },
            openNewItemDialog: function(title) {
                this.title = title;
                this.$broadcast("showDialog", true);
            }
        },
        components: {
            "dialog-component": dialogComponent
        }
    }
</script>