<style>
    .app{ margin: 100px auto 0; width: 600px; font-family: Helvetica, simhei, Arial, sans-serif;}
    
    .btn{ padding: 4px 8px; border: 0; border-radius: 3px; cursor: pointer; color: #fff;}
    .btn:hover{ opacity: 0.9;}
    .btn-large{ padding: 8px 20px; }
    .btn-red{ background-color: salmon; }
    .btn-blue{ background-color: #0090d3; }
    input{ padding: 3px 6px; border: 1px solid #ccc; line-height: 1.8;}

    .search{ text-align: center; }
    .search input{ padding: 3px 6px; }
</style>

<template>
    <div class="app">
        <div class="search">
            <label for="">Search</label>
            <input type="text" v-model="searchQuery">
        </div>
        <table-component v-bind:data-list="people" v-bind:columns="columns" v-bind:search-key="searchQuery"></table-component>
    </div>
</template>

<script>
    var tableComponent = require("./components/table.vue");

    module.exports = {
        data: function() {
            return {
                searchQuery: "",
                columns: [
                    {
                        name: "name",
                        isKey: true
                    },
                    {
                        name: "age"
                    },
                    {
                        name: "sex",
                        dataSource: ["Male", "Female"]
                    }
                ],
                people: [
                    {
                        name: "Jack",
                        age: 30,
                        sex: "Male"
                    },
                    {
                        name: "Bill",
                        age: 30,
                        sex: "Male"
                    },
                    {
                        name: "Tracy",
                        age: 28,
                        sex: "Female"
                    },
                    {
                        name: "Chris",
                        age: 32,
                        sex: "Male"
                    }
                ]
            }
        },
        components: {
            "table-component": tableComponent
        }
    }
</script>

