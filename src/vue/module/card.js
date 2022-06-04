export default {
  template: `
    <div class="stock__card">
      <div class="stock__item">
        <p class="stock__item-action">-{{ item.action }}%</p>
        <img class="stock__item-img" :src="'./src/assets/img/' + item.img">
      </div>

      <div class="stock__info">
        <h2 class="stock__info-title">{{ item.title }}</h2>
        <h2 class="stock__info-body">{{ item.body }}</h2>
        
        <span class="stock__info-span">
          <p class="stock__info-span-weight">{{ item.weight }}</p>
          <p class="stock__info-span-price">{{ item.price }}₽</p>
          <button class="stock__info-span-btn">Купить</button>
        </span>
      <div>
    </div>
  `,

  data(){
    return{
      
    }
  },

  props: ['item', 'index']
}