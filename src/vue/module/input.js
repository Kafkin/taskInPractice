export default {
  template: `
    <span :class="[span, spanSub]">
      <label :for="settings.alias" :class="[label, labelSub]">{{ settings.title }}: </label>
      <input :type="settings.type" :maxlength="settings.max" :minlength="settings.min" :id="settings.alias" :class="[input, inputSub]" :placeholder="settings.placeholder" v-model="value">
      <div class="form__span-border" :style="{ width: progress + '%' }"></div>
    </span>
  `,

  data(){
    return{
      value: null
    }
  },

  watch:{
    value(val){
      this.$emit('assign', {where: this.settings.where, val: val})
    }
  },

  computed:{
    progress(){
      return !!this.value ? (this.value.length * 100) / this.settings.max : 0
    },

    span(){
      return this.settings.classSpan
    },

    label(){
      return `${this.settings.classSpan}${this.settings.classLabel}`
    },

    input(){
      return `${this.settings.classSpan}${this.settings.classInput}`
    },

    spanSub(){
      if(!!this.settings.classSub){
        return `${this.settings.classSpan}${this.settings.classSub}`
      }
    },

    labelSub(){
      if(!!this.settings.classSub){
        return `${this.label}${this.settings.classSub}`
      }
    },

    inputSub(){
      if(!!this.settings.classSub){
        return `${this.input}${this.settings.classSub}`
      }
    },
  },

  props: ['settings']
}