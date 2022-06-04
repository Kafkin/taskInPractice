import vSlide from './slide.js'

export default {
  template: `
    <div class="slider" ref="slider">
      <div class="slider__list">
        <v-slide v-for="(item, index) in array" :key="index" :item="item" :index="index" :currentSlide="currentSlide"></v-slide>
      </div>
    </div>
  `,

  data(){
    return{
      currentSlide: 0,

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

    nextSlide(){
      (this.currentSlide + 1) >= this.array.length ? this.currentSlide = 0 : this.currentSlide++ 
    },

    prevSlide(){
      (this.currentSlide - 1) < 0 ? this.currentSlide = (this.array.length - 1) : this.currentSlide--
    }
  },

  mounted(){
    this.$refs.slider.addEventListener('touchstart', event => this.touchstart(event))
    this.$refs.slider.addEventListener('touchmove', event => this.touchmove(event))
    this.$refs.slider.addEventListener('touchend', () => this.touchend())

    setInterval(() => this.nextSlide(), this.time * 1000)
  },

  components:{
    vSlide
  },

  props: ['array', 'time']
}