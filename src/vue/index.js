import vSlider from './module/slider/slider.js'
import vCard from './module/card.js'

Vue.createApp({
// ------------

  data(){
    return{
      arrayUser: [{
        name: 'admin',
        email: 'admin@email.com',
        password: '123456',
        role: 'admin'
      }],

      currentPage: 'Главная',
      currentUser: null,

      currentNavPage: 1,
      countNavPage: 3,
      currentNavIndex: 0,

      footerSearch: '',

      arraySlide: [{
        img: 'imgSlideOne.jpg',
        title: 'Боня',
        body: 'Этому коту почти 30, у него нет многих когтей и зубов, но этот старичок по-прежнему великолепен'
      },{
        img: 'imgSlideTwo.jpg',
        title: 'Греча',
        body: 'Узнал, что у моего пса болезнь сердца и ему осталось жить всего несколько дней. Ему 23 года, и я надеялся, что у нас еще много счастливых лет впереди'
      },{
        img: 'imgSlideFour.jpg',
        title: 'Джесси',
        body: 'Я пришел в приют и попросил отдать мне кота, который находится у них дольше всех. Знакомьтесь, это мой Кали, старенький, глухой и беззубый'
      },{
        img: 'imgSlideThree.jpg',
        title: 'Арчи',
        body: 'Он заставил меня забыть, что такое выходные, и не всегда выбирает хорошую музыку, но я не променяю его ни на что другое'
      },{
        img: 'imgSlideSix.jpg',
        title: 'Юта',
        body: 'Муж подобрал на улице очень маленького котенка и заботился о нем круглые сутки. Спустя 5 лет кот все еще думает, что мой муж — его мать. Так мило'
      },{
        img: 'imgSlideFive.jpg',
        title: 'Луи',
        body: 'Это Луи. Соседи переехали, но не взяли его с собой'
      },{
        img: 'imgSlideSeven.jpg',
        title: 'Бублик',
        body: 'Моему псу 17 лет. Он практически слеп и глух, но я счастлив быть с ним каждый день'
      }],

      arrayPrompt: [{
        icon: 'aboutOne.svg',
        body: 'Широкий ассортимент зоотоваров'
      },{
        icon: 'aboutTwo.svg',
        body: 'Крупнейшая сеть зоомагазинов'
      },{
        icon: 'aboutThree.svg',
        body: 'Собственная курьерская служба'
      },{
        icon: 'aboutFour.svg',
        body: 'Забота о каждом питомце'
      }],

      arrayAction: [{
        title: 'Royal Canin 1',
        body: 'Для пожилых кошек (7-12 лет)',
        price: 390,
        action: 50,
        weight: '700гр',
        img: 'cardProductOne.png'
      },{
        title: 'Royal Canin 2',
        body: 'Для взрослых собак средних размеров: 11-25 кг, 1-7 лет ',
        price: 1720,
        action: 30,
        weight: '1.5кг',
        img: 'cardProductTwo.png'
      },{
        title: 'Royal Canin 3',
        body: 'Для щенков средних и мелких пород, с высоким содержанием курицы',
        price: 450,
        action: 25,
        weight: '300гр',
        img: 'cardProductThree.png'
      },{
        title: 'Royal Canin 4',
        body: 'Для щенков средних и мелких пород, с высоким содержанием курицы',
        price: 450,
        action: 25,
        weight: '300гр',
        img: 'cardProductThree.png'
      },{
        title: 'Royal Canin 5',
        body: 'Для щенков средних и мелких пород, с высоким содержанием курицы',
        price: 450,
        action: 25,
        weight: '300гр',
        img: 'cardProductThree.png'
      },{
        title: 'Royal Canin 6',
        body: 'Для щенков средних и мелких пород, с высоким содержанием курицы',
        price: 450,
        action: 25,
        weight: '300гр',
        img: 'cardProductThree.png'
      },{
        title: 'Royal Canin 7',
        body: 'Для щенков средних и мелких пород, с высоким содержанием курицы',
        price: 450,
        action: 25,
        weight: '300гр',
        img: 'cardProductThree.png'
      },{
        title: 'Royal Canin 8',
        body: 'Для щенков средних и мелких пород, с высоким содержанием курицы',
        price: 450,
        action: 25,
        weight: '300гр',
        img: 'cardProductThree.png'
      },{
        title: 'Royal Canin 9',
        body: 'Для щенков средних и мелких пород, с высоким содержанием курицы',
        price: 450,
        action: 25,
        weight: '300гр',
        img: 'cardProductThree.png'
      }]
    }
  },

  watch:{
    footerSearch(val){
      if(!!val){
        this.$refs.footer_img.src = './src/assets/icon/footerSearchOrange.png'
      }else{
        this.$refs.footer_img.src = './src/assets/icon/footerSearch.png'
      }
    }
  },

  computed:{
    isAuth(){
      return !!this.currentUser
    },

    isAdmin(){
      return !!this.currentUser && this.currentUser.role === 'admin'
    }
  },

  methods:{
    nextStock(index){
      this.currentNavPage = index+1
    },

    goto(){
      window.scrollBy({
        top: this.$refs.stock.getBoundingClientRect().top - 20,
        behavior: 'smooth'
      })
    }
  },

  components:{
    vSlider,
    vCard
  },

  mounted(){
  ( async () => {
    const box = await document.getElementById('boxCanvas')
    
    const cnv = document.querySelector('canvas')
    const ctx = cnv.getContext('2d')

    let particleArray = []
    let particleOnScreen = 20

    let cw, ch

    function reSize(){
      console.log('reSize');
      cw = cnv.width = box.offsetWidth
      ch = cnv.height = box.offsetHeight

      if(cw > 576){
        particleOnScreen = 43
      }else if(cw > 1800){
        particleOnScreen = 160
      }else{
        particleOnScreen = 20
      }

      console.log(cw + ', '  + ch);
      console.log(box);
    }
    reSize()
        
    class Particle{
      constructor(){
        this.x = Math.random() * cw
        this.y = ch + 1000
        this.speedY = this.random(-5, -1)
        this.r = this.random(0, 53)
      }
      random(min, max){
        return Math.random() * (max - min) + min
      }

      pDraw(){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2)
        ctx.fillStyle = '#0B0B15'
        ctx.fill()
      }

      pMove(){
        this.y + this.speedY < -50 ? (() => {
          this.y = ch + 1000
          this.x = Math.random() * cw
        })() : this.y += this.speedY
        
        this.y += this.speedY
      }
    }

    function arrayPush(){
      for(let i=0; i<particleOnScreen; i++){
        particleArray.push(new Particle(cw, ch))
      }
    }
    arrayPush()

    function loop(){
      ctx.clearRect(0, 0, cw, ch)

      particleArray.forEach(dot => {
        dot.pDraw()
        dot.pMove()
      })

      requestAnimationFrame(loop)
    }
    loop()

    window.addEventListener('resize', () => {
      if(cw > 576){
        particleArray.length = 0
        particleOnScreen = 43
        console.log('arrayPush');
        arrayPush()
      }else if(cw > 1800){
        particleArray.length = 0
        particleOnScreen = 160
        console.log('arrayPush');
        arrayPush()
      }else{
        particleArray.length = 0
        particleOnScreen = 20
        console.log('arrayPush');
        arrayPush()
      }

      reSize()
    })
   })();
  }

// ------------
}).mount('#app')