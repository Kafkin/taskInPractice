export default {
  template: `
    <div class="message" v-show="settings.active" @click="settings.active = false">
      <span class="message__span">
        <img 
          :src="'./src/assets/gif/setCat/' + array[Math.floor(Math.random() * array.length)].img"
          v-if="!!array.length"
          class="message__span-img"
        >
      </span>
      <h2 class="message__title">{{ settings.title }}</h2>
      <p class="message__body" :style="{ color: settings.color }">{{ settings.body }}</p>
    </div>
  `,

  data(){
    return{

    }
  },

  methods:{
    timer(){
      setTimeout(() => {
        this.settings.active = false
      }, 17000)
    }
  },

  watch:{
    'settings.active'(val){
      val && this.timer()
    }
  },

  props: ['settings', 'array']
}