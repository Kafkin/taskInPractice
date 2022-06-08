import vSlide from './slide.js'

export default {
  template: `
    <div class="slider" ref="slider">
      <div class="slider__list">
        <v-slide v-for="(item, index) in array" :key="index" :item="item" :index="index" :currentSlide="currentSlide" :dbwidth="dbwidth" @clearTimer="clearTimer" @setTimer="setTimer"></v-slide>
      </div>
    </div>

    <span class="slider__arrow" v-show="width > 1199">
      <img src="./src/assets/icon/sliderArrowOrange.png" alt="arrow" @click="sliderArrow('left')" class="slider__arrow_left" ref="arrowsliderone">
      <img src="./src/assets/icon/sliderArrowOrange.png" alt="arrow" @click="sliderArrow('right')" class="slider__arrow_right" ref="arrowslidertwo">
    </span>
  `,

  data(){
    return{
      currentSlide: 0,

      timer: null,

      touch:{
        startX: 0,
        endX: 0 
      }
    }
  },

  methods:{
    touchstart(event){
      // console.log('touchstart');
      this.touch.startX = event.touches[0].clientX
      this.touch.endX = 0
    },

    touchmove(event){
      // console.log('touchmove');
      this.touch.endX = event.touches[0].clientX
    },

    touchend(){
      // console.log('touchend');
      if(Math.floor(this.touch.endX) == 0){
        return
      }

      if(Math.floor(this.touch.endX) < Math.floor(this.touch.startX)){
        this.nextSlide()
      }else{
        this.prevSlide()
      }
    },

    sliderArrow(side){
      // console.log(side);
      if(side === 'left'){
        this.$refs.arrowsliderone.src = './src/assets/icon/sliderArrowBlack.png'
        this.prevSlide()
        setTimeout(() => {
          this.$refs.arrowsliderone.src = './src/assets/icon/sliderArrowOrange.png'
        }, 200)
      }else{
        this.$refs.arrowslidertwo.src = './src/assets/icon/sliderArrowBlack.png'
        this.nextSlide()
        setTimeout(() => {
          this.$refs.arrowslidertwo.src = './src/assets/icon/sliderArrowOrange.png'
        }, 200)
      }
    },

    nextSlide(){
      (this.currentSlide + 1) >= this.array.length ? this.currentSlide = 0 : this.currentSlide++ 
    },

    prevSlide(){
      (this.currentSlide - 1) < 0 ? this.currentSlide = (this.array.length - 1) : this.currentSlide--
    },

    setTimer(){
      console.log('time start');
      this.timer = setInterval(() => this.nextSlide(), this.time * 1000)
    },

    clearTimer(){
      console.log('time stop');
      clearInterval(this.timer)
    }
  },

  mounted(){
    this.$refs.slider.addEventListener('touchstart', event => this.touchstart(event))
    this.$refs.slider.addEventListener('touchmove', event => this.touchmove(event))
    this.$refs.slider.addEventListener('touchend', () => this.touchend())

    this.setTimer()
  },

  components:{
    vSlide
  },

  props: ['array', 'time', 'dbwidth', 'width']
}