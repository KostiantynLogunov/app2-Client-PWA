<template>
    <div class="containera">
        <div class="row justify-content-center">
            <div class="col-lg-10 col-sm-11">
                <div class="card card-default">
                    <div class="card-header">Clients</div>
                    <div class="card-body">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CustomersMain"
    }
</script>

<style scoped>

</style>
