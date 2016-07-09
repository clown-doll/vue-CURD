<style>
.dialog{ visibility: hidden; }
.dialog-active{ visibility: visible; }
.dialog-overlay{ position: fixed; right: 0; left: 0; top: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.5); }
.dialog-content{ position: fixed; width: 450px; top: 2em; left: 50%; transform: translateX(-50%); background-color: #fff; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);}
.dialog-header{ background-color: #0090d3; color: #fff;}
.dialog-header h1{ margin: 0; text-align: center; line-height: 2em; }
.dialog-body{ padding: 30px 20px; }
.dialog-body .form-group{ padding: 5px 0; }
.dialog-body .form-group label{ margin-right: 8px; display: inline-block; width: 120px; text-align: right; }
.dialog-body .form-group select{ padding: 6px; border: 1px solid #ccc; line-height: 1.8;}
.dialog-footer{ padding: 1em 0; margin: 0 2em; border-top: 1px solid rgba(0, 0, 0, 0.1); text-align: center;}
.dialog-footer .btn{ margin: 0 8px; }
</style>

<template>
    <div class="dialog"  v-bind:class="{'dialog-active': show}">
        <div class="dialog-overlay"></div>
        <div class="dialog-content">
            <div class="dialog-header">
                <h1>{{dialogTitle}}</h1>
            </div>
            <div class="dialog-body">
                <div class="form-group" v-for="field in fields"> 
                    <label for="">{{field.name}}</label>
                    <select v-if="field.dataSource" v-model="item[field.name]" v-bind:disabled="mode === 2 && field.isKey">
                        <option v-for="opt in field.dataSource" v-bind:value="opt">
                            {{opt}}
                        </option>
                    </select>
                    <input v-else type="text" v-model="item[field.name]" v-bind:disabled="mode === 2 && field.isKey">
                </div>
            </div>
            <div class="dialog-footer">
                <button class="btn btn-large btn-blue" v-on:click="save()">Save</button>
                <button class="btn btn-large" v-on:click="close()">Cancle</button>
            </div>
        </div>
    </div>
</template>    

<script>
    module.exports = {
        props: ["dialogTitle", "fields", "item", "mode"],
        data: function() {
            return {
                show: false
            }
        },
        events: {
            "showDialog": function(flag) {
                this.show = flag;
            }
        },
        methods: {
            close: function() {
                this.show = false
            },
            save: function() {
                if(this.mode === 1){
                    // 使用$dispatch调用data-table的create-item事件
                    this.$dispatch('create-item');
                } else if(this.mode === 2) {
                    this.$dispatch('edit-item');
                }
            }
        }
    }
</script>