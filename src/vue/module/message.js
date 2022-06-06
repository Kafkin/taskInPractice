export default {
  template: `
    <div class="message" v-show="settings.active">
      <h2 class="message__title">{{ settings.title }}</h2>
      <p class="message__body" :style="{ color: settings.color }">{{ settings.body }}</p>
      <button class="message__btn" @click="settings.active = false">Окей</button>
    </div>
  `,

  data(){
    return{

    }
  },

  props: ['settings']
}