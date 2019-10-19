<template>
    <div class="warp-scroll" style="height: 500px;" ref="bsWrapper">
        <div class="scroll" style="min-height: 502px">
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
            <div class="pulldown-body">
                <slot name="body">

                </slot>
            </div>
            <slot name="pullup-warp">

            </slot>
        </div>
    </div>
</template>

<script>
    import BScroll from '@better-scroll/core'
    import PullDown from '@better-scroll/pull-down'
    import PullUp from '@better-scroll/pull-up'

    BScroll.use(PullDown);
    BScroll.use(PullUp);
    const TIME_BOUNCE = 800;
    const TIME_STOP = 600;
    const THRESHOLD = 70;
    const STOP = 56;
    //let STEP = 0;
    export default {
        name: "BScroll",
        components: {},
        props: {
            pullingDownHandler: {
                type: Function,
                default: () => {
                },
            },
            pullingUpHandler: {
                type: Function,
                default: () => {
                },
            },
            touchEndHandler: {
                type: Function,
                default: () => {
                }
            },
            scrollHandler: {
                type : Function,
                default: () => {}
            },
            beforePullDown:{
                type:Boolean
            },
            isPullingDown:{
                type:Boolean
            },
            isPulling:{
                type: Object
            }
        },
        data() {
            return {
                // beforePullDown: true,
                // isPullingDown: false,
            }
        },
        create() {
            this.bscroll = null;
        },
        mounted() {
            this.$nextTick(() => {
                this.initBscroll();
            })
        },
        methods: {
            initBscroll() {
                this.bscroll = new BScroll(this.$refs.bsWrapper, {
                    scrollY: true,
                    bounceTime: TIME_BOUNCE,
                    pullDownRefresh: {
                        threshold: THRESHOLD,
                        stop: STOP
                    },
                    pullUpLoad: true,
                    click: true,
                    tap: true,
                    probeType:2
                });

                this.bscroll.on('pullingDown', this.pullingDownHandler);
                this.bscroll.on('pullingUp', this.pullingUpHandler);
                this.bscroll.on('touchEnd', (pos)=>{this.touchEndHandler(pos,THRESHOLD)});
                this.bscroll.on('scroll', (pos)=>{this.scrollHandler(pos,THRESHOLD)});
            },
            async finishPullDown() {
                const stopTime = TIME_STOP
                await new Promise(resolve => {
                    setTimeout(() => {
                        this.bscroll.finishPullDown();
                        resolve()
                    }, stopTime)
                })
                setTimeout(() => {
                    this.bscroll.refresh()
                }, TIME_BOUNCE)
            },
        }

    }
</script>

<style scoped>
    .warp-scroll {
        overflow: hidden;
    }
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
