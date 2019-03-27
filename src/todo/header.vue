<template>
    <header class="main-header">
        <h1>{{title}}</h1>
    </header>
</template>

<script>
export default {
    data(){
        return {
            title:"TODO",
        }
    }
}
</script>

<style lang="stylus" scoped>
.main-header{
    text-align center
    h1{
        font-size 100px
        color rgba(0 90 0 0.8)
        font-weight 200
        margin 20px
    }
}
</style>
