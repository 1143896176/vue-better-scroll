<template>
    <div slot="pulldown-warp" class="pulldown-wrapper">
        <div v-show="beforePullDown">
            <span style="position: relative;margin-left: 50px">
                <i class="iconfont icon-down " :class="{'down-active':isPulling.bool}"></i>{{isPulling.text}}
            </span>
        </div>
        <div v-show="!beforePullDown">
            <div v-show="isPullingDown">
                <span>Loading...</span>
            </div>
            <div v-show="!isPullingDown"><span>Refresh success</span></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "pulldown",
        props: {
            beforePullDown:{
                type:Boolean
            },
            isPullingDown:{
                type:Boolean
            },
            isPulling:{
                type: Object
            }
        }
    }
</script>

<style scoped>
    .icon-down{
        position: absolute;
        left: -50px;
        transform: rotate(0deg);
        transition: 0.4s;
    }
    .down-active{
        transform: rotate(180deg);
        transition: 0.4s;
    }
</style>
