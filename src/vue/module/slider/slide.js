export default {
  template: `
    <span class="slider__list-item" :style="{ 'transform': 'translateX(-' + currentSlide * 100 + '%)', 'margin-left': index === 0 ? 19 + dbwidth + 'px' : 0 + 'px' }">
      <img :src="'./src/assets/img/' + item.img" >
      <div class="slider__list-item-info" v-if="infoShow">
        <h2 class="slider__list-item-info-title">{{ item.title }}</h2>
        <p class="slider__list-item-info-body">{{ item.body }}</p>
      </div>
      <div class="slider__list-item-btn" @click="infoShow = !infoShow">
        <img src="./src/assets/icon/information.png" v-if="!infoShow">
        <img src="./src/assets/icon/close.png" class="close" v-else>
      </div>
    </span>
  `,

  data(){
    return{
      infoShow: false
    }
  },

  watch:{
    infoShow(val){
      if(val){
        this.$emit('clearTimer')
        setTimeout(() => {
          this.infoShow = false
        }, 17000)
      }else{
        this.$emit('clearTimer')
        this.$emit('setTimer')
      }
    }
  },

  props: ['item', 'index', 'currentSlide', 'dbwidth']
}