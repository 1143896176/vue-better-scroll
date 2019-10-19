<template>
    <div class="hello">
        <BScroll ref="bscroll"
                 :pullingDownHandler="pullingDownHandler"
                 :touchEndHandler="touchEndHandler"
                 :scrollHandler="scrollHandler"
                 :pullingUpHandler="pullingUpHandler"
                 :beforePullDown="beforePullDown"
                 :isPullingDown="isPullingDown"
                 :isPulling="isPulling"
        >
            <div slot="body">
                <ul v-if="playlists.length">
                    <li v-for="(item,index) in playlists" :key="index">{{item.name}}
<!--                        <p>{{item.description}}</p>-->
<!--                        <p>{{item.tags}}</p>-->
                    </li>
                </ul>
                <p v-if="!isMore">我们是有底线的</p>
            </div>
            <div class="pullup-wrapper" slot="pullup-warp">
                <div v-show="beforePullUp">
                    <div v-if="!isPullUpLoad" class="before-trigger">
                        <span class="pullup-txt"><i class="iconfont icon-up"></i>上加载更多</span>
                    </div>
                </div>
                <div v-show="!beforePullUp" class="after-trigger">
                   <!-- <span class="pullup-txt">Loading...</span>-->
                    <div v-show="isPullUpLoad">
                        <span>Loading...</span>
                    </div>
                    <div v-show="!isPullUpLoad"><span>load more success</span></div>
                </div>
            </div>
        </BScroll>
    </div>
</template>

<script>
    import BScroll from './BScroll'
    import {highquality, playlist} from '../api'

    export default {
        name: 'HelloWorld',
        components: {
            BScroll
        },
        data() {
            return {
                isMore:true,
                beforePullDown: true,
                isPullingDown: false,
                isPullUpLoad: false,
                beforePullUp:true,
                pullingDownHeight:0,
                threshold:null,
                playlists: [
                    {name:'',description:''}
                ]
            }
        },
        async mounted(){
            await  this.requestData();
            this.$nextTick(()=>{
                this.bscroll = this.$refs.bscroll
            })
        },
        methods: {
            async pullingDownHandler() {
                this.beforePullDown = false
                this.isPullingDown = true
                await this.requestData();
                this.isPullingDown = false;
                await this.bscroll.finishPullDown();
                this.beforePullDown = true
            },
            async pullingUpHandler() {
                this.isPullUpLoad = true
                await this.requestData(true)
                this.bscroll.bscroll.finishPullUp()
                this.bscroll.bscroll.refresh()
                this.isPullUpLoad = false
            },
            async touchEndHandler(pos){
                //console.log('touchEndHandler',pos.y)
            },
            scrollHandler(pos,threshold) {
                this.pullingDownHeight = pos.y;
                this.threshold = threshold;
                //console.log(pos.y)
            },
            async requestData(param) {
                if(param){
                    if(this.isMore){
                        const res = await highquality({before: this.playlists[this.playlists.length-1].updateTime, limit: 50});
                        this.playlists = this.playlists.concat(res.data.playlists);
                        if(res.data.playlists.length<49){
                            this.isMore=false
                        }
                    }

                }else {
                    this.isMore=true;
                    const res = await highquality({before: "", limit: 50});
                    this.playlists = res.data.playlists
                    if(res.data.playlists.length<49){
                        this.isMore=false
                    }
                }

            }
        },
        computed:{
            isPulling () {
                if(this.pullingDownHeight>this.threshold){
                    return {text:'放开立即刷新',bool:true}
                }
                return  {text:'下拉刷新',bool:false}
            },
            isPullUp () {
                if(this.pullingDownHeight>this.threshold){
                    return {text:'放开立即刷新',bool:true}
                }
                return  {text:'下拉刷新',bool:false}
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }
    .icon-up{
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
