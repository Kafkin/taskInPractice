import vSlider from './module/slider/slider.js'
import vCard from './module/card.js'
import vCanvas from './module/canvas.js'
import vMessage from './module/message.js'
import vInput from './module/input.js'

Vue.createApp({
// ------------

  data(){
    return{
      width: 0,
      dbwidth: 0,

      currentPage: 'Главная',
      currentUser: null,

      currentNavPage: 1,
      countNavPage: 3,
      currentNavIndex: 0,

      footerSearch: '',

      navBurgerShow: false,

      mSettings: {
        title: 'Проверка',
        body: 'Чел это просто проверка, не обращая внимание (-_-)/',
        color: '#282828',
        active: false
      },
      
      formLog: {
        email: null,
        password: null
      },

      formReg: {
        name: null,
        email: null,
        password: null,
        dbPassword: null,
        agreement: false,
        role: 'user'
      },
      
      arraySlide: [],
      arrayAction: [],
      arrayLogInput: [],
      arrayRegInput: [],
      arrayPrompt: [],
      arrayImgCat: [],
      arrayUser: [],
    }
  },

  watch:{
    footerSearch(val){
      if(!!val){
        this.$refs.footer_img.src = './src/assets/icon/footerSearchOrange.png'
      }else{
        this.$refs.footer_img.src = './src/assets/icon/footerSearch.png'
      }
    },

    navBurgerShow(val){
      if(val){
        document.querySelector('body').style.overflow = 'hidden'
      }else{
        document.querySelector('body').style.overflow = 'visible'
      }
    }
  },

  computed:{
    isAuth(){
      return !!this.currentUser
    },

    isAdmin(){
      return !!this.currentUser && this.currentUser.role === 'admin'
    },

    progress(){
      return this.formLog.email === null ? 0 : (this.formLog.email.length * 100) / 15
    }
  },

  methods:{
    assign(obj){
      eval(`this.${obj.where} = '${obj.val}'`)
    },

    nextStock(index){
      this.currentNavPage = index+1
    },

    nextPage(page){
      if(this.currentPage === page){
        return
      }else{
        this.currentPage = page
        this.navBurgerShow = false
      }
    },

    goto(){
      window.scrollBy({
        top: this.$refs.stock.getBoundingClientRect().top - 20,
        behavior: 'smooth'
      })
    },

    reWindow(){
      this.width = window.innerWidth
      this.navBurgerShow = false
      
      if(this.width > 991){
        this.countNavPage = 6
        this.dbwidth = 10
        // console.log('width screen >= 992px')
      }else{
        this.dbwidth = 0
        this.countNavPage = 3
      }
    },

    pressBtn(str, event){
      console.log(event)
      if(!!str && str === 'Войти'){
        this.$refs.logBtn.classList.add('active')
        setTimeout(() => {
          if(!!this.$refs.logBtn){
            this.$refs.logBtn.classList.remove('active')
          }
        }, 700)
      }else if(!!str){
        this.$refs.regBtn.classList.add('active')
        setTimeout(() => {
          if(!!this.$refs.regBtn){
            this.$refs.regBtn.classList.remove('active')
          }
        }, 700)
      }
    },

    exit(){
      this.navBurgerShow = false
      this.nextPage('Главная')
      this.currentUser = null
      localStorage.removeItem('currentUser')
      this.mSettings.title = 'Оповищение'
      this.mSettings.body = 'До скорого (づ ◕‿◕ )づ'
      this.mSettings.color = 'green'
      this.mSettings.active = true
    },

    log(){
      if(!!this.formLog.email && !!this.formLog.password){

        const user = this.arrayUser.find(el => el.email === this.formLog.email && el.password === this.formLog.password)
        !!user ? (() => {
          this.nextPage('Главная')
          this.currentUser = user
          localStorage.setItem('currentUser', JSON.stringify(user))
          this.mSettings.title = 'Оповищение'
          this.mSettings.body = `С возвращением ${user.name} (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧`
          this.mSettings.color = 'green'
          this.mSettings.active = true
        })() : (() => {
          this.mSettings.title = 'Ошибка при входе'
          this.mSettings.body = 'Товарищ, пользователя с такой почтой или паролем нет (」°ロ°)」'
          this.mSettings.color = 'red'
          this.mSettings.active = true
        })()

      }else{
        this.mSettings.title = 'Ошибка при входе'
        this.mSettings.body = 'Товарищ, у вас заполненны не все поля ヽ(・∀・)ﾉ'
        this.mSettings.color = 'red'
        this.mSettings.active = true
      }
    },

    reg(){
      if(!!this.formReg.name && !!this.formReg.email && !!this.formReg.password && !!this.formReg.dbPassword && !!this.formReg.agreement){

        if(this.formReg.password === this.formReg.dbPassword){

          !!this.arrayUser.find(el => el.email === this.formReg.email) ? (() => {
            this.mSettings.title = 'Ошибка при регистрации'
            this.mSettings.body = 'Товарищ, пользователь с такой почтой уже зарегистрирован на нашем сайте (」°ロ°)」'
            this.mSettings.color = 'red'
            this.mSettings.active = true
          })() : (() => {
            const newUser = {...this.formReg}
            delete newUser.dbPassword
            delete newUser.agreement
            this.arrayUser.push(newUser)
            this.currentUser = newUser
            this.nextPage('Главная')
            localStorage.setItem('currentUser', JSON.stringify(newUser))
            this.request('https://6282938ced9edf7bd886bc0a.mockapi.io/arrayUser', 'POST', newUser)
            this.mSettings.title = 'Оповищение'
            this.mSettings.body = `Приветствую ${newUser.name} (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧`
            this.mSettings.color = 'green'
            this.mSettings.active = true
          })()

        }else{
          this.mSettings.title = 'Ошибка при регистрации'
          this.mSettings.body = 'Товарищ, пароли не совпадают ヽ(・∀・)ﾉ'
          this.mSettings.color = 'red'
          this.mSettings.active = true
        }

      }else{
        this.mSettings.title = 'Ошибка при регистрации'
        this.mSettings.body = 'Товарищ, у вас заполненны не все поля ヽ(・∀・)ﾉ'
        this.mSettings.color = 'red'
        this.mSettings.active = true
      }
    },

    async request(url, method, data){
      let headers, body

      if(data){ 
        headers = { 'Content-Type': 'application/json; charset=UTF-8' }
        body = JSON.stringify(data)
      }

      const res = await fetch(url, { method, body, headers })
      return await res.json()
    }
  },

  components:{
    vSlider,
    vCard,
    vCanvas,
    vMessage,
    vInput
  },

  async created(){
    (() => {
      const user = localStorage.getItem('currentUser')
      !!user ? this.currentUser = JSON.parse(user) : console.log('Нет сохранненного пользователя')
    })();

    this.arrayImgCat = await this.request('https://6282938ced9edf7bd886bc0a.mockapi.io/arrayImgCat')
    this.arraySlide = await this.request('https://62a0902d202ceef70870dc72.mockapi.io/arraySlide')
    this.arrayAction = await this.request('https://62a0902d202ceef70870dc72.mockapi.io/arrayAction')
    this.arrayRegInput = await this.request('https://62a0902d202ceef70870dc72.mockapi.io/arrayImgCat')
    this.arrayLogInput = await this.request('https://62a0902d202ceef70870dc72.mockapi.io/arrayLogInput')
    this.arrayPrompt = await this.request('https://6282938ced9edf7bd886bc0a.mockapi.io/arrayPrompt')
    this.arrayUser = await this.request('https://6282938ced9edf7bd886bc0a.mockapi.io/arrayUser')

    console.log(await 
      this.arrayImgCat,
      this.arraySlide, 
      this.arrayAction, 
      this.arrayRegInput,
      this.arrayLogInput,
      this.arrayPrompt,
      this.arrayUser
    );
  },

  async mounted(){
    window.addEventListener('resize', this.reWindow);
    this.width = window.innerWidth
    if(this.width > 991){
      this.countNavPage = 6
      this.dbwidth = 10
      // console.log('width screen >= 992px')
    }else{
      this.dbwidth = 0
      this.countNavPage = 3
    }
  }

// ------------
}).mount('#app')





// Локальные копии всех массивов (если крякнеться mockApi) 

// arraySlide: [{
//   img: 'imgSlideOne.jpg',
//   title: 'Боня',
//   body: 'Этому коту почти 30, у него нет многих когтей и зубов, но этот старичок по-прежнему великолепен'
// },{
//   img: 'imgSlideTwo.jpg',
//   title: 'Греча',
//   body: 'Узнал, что у моего пса болезнь сердца и ему осталось жить всего несколько дней. Ему 23 года, и я надеялся, что у нас еще много счастливых лет впереди'
// },{
//   img: 'imgSlideFour.jpg',
//   title: 'Джесси',
//   body: 'Я пришел в приют и попросил отдать мне кота, который находится у них дольше всех. Знакомьтесь, это мой Кали, старенький, глухой и беззубый'
// },{
//   img: 'imgSlideThree.jpg',
//   title: 'Арчи',
//   body: 'Он заставил меня забыть, что такое выходные, и не всегда выбирает хорошую музыку, но я не променяю его ни на что другое'
// },{
//   img: 'imgSlideSix.jpg',
//   title: 'Юта',
//   body: 'Муж подобрал на улице очень маленького котенка и заботился о нем круглые сутки. Спустя 5 лет кот все еще думает, что мой муж — его мать. Так мило'
// },{
//   img: 'imgSlideFive.jpg',
//   title: 'Луи',
//   body: 'Это Луи. Соседи переехали, но не взяли его с собой'
// },{
//   img: 'imgSlideSeven.jpg',
//   title: 'Бублик',
//   body: 'Моему псу 17 лет. Он практически слеп и глух, но я счастлив быть с ним каждый день'
// }],

// arrayAction: [{
//   title: 'Royal Canin 1',
//   body: 'Для пожилых кошек (7-12 лет)',
//   price: 390,
//   action: 50,
//   weight: '700гр',
//   img: 'cardProductOne.png'
// },{
//   title: 'Royal Canin 2',
//   body: 'Для взрослых собак средних размеров: 11-25 кг, 1-7 лет ',
//   price: 1720,
//   action: 30,
//   weight: '1.5кг',
//   img: 'cardProductTwo.png'
// },{
//   title: 'Royal Canin 3',
//   body: 'Для щенков средних и мелких пород, с высоким содержанием курицы',
//   price: 450,
//   action: 25,
//   weight: '300гр',
//   img: 'cardProductThree.png'
// },{
//   title: 'Royal Canin 4',
//   body: 'Для щенков средних и мелких пород, с высоким содержанием курицы',
//   price: 450,
//   action: 25,
//   weight: '300гр',
//   img: 'cardProductThree.png'
// },{
//   title: 'Royal Canin 5',
//   body: 'Для щенков средних и мелких пород, с высоким содержанием курицы',
//   price: 450,
//   action: 25,
//   weight: '300гр',
//   img: 'cardProductThree.png'
// },{
//   title: 'Royal Canin 6',
//   body: 'Для щенков средних и мелких пород, с высоким содержанием курицы',
//   price: 450,
//   action: 25,
//   weight: '300гр',
//   img: 'cardProductThree.png'
// },{
//   title: 'Royal Canin 7',
//   body: 'Для щенков средних и мелких пород, с высоким содержанием курицы',
//   price: 450,
//   action: 25,
//   weight: '300гр',
//   img: 'cardProductThree.png'
// },{
//   title: 'Royal Canin 8',
//   body: 'Для щенков средних и мелких пород, с высоким содержанием курицы',
//   price: 450,
//   action: 25,
//   weight: '300гр',
//   img: 'cardProductThree.png'
// },{
//   title: 'Royal Canin 9',
//   body: 'Для щенков средних и мелких пород, с высоким содержанием курицы',
//   price: 450,
//   action: 25,
//   weight: '300гр',
//   img: 'cardProductThree.png'
// }],

// arrayImgCat: ['catOne.gif', 'catTwo.gif', 'catThree.gif', 'catFour.gif'],

// arrayLogInput: [{
//   where: 'formLog.email',
//   alias: 'inpGroupOne',
//   title: 'Почта',
//   type: 'email',
//   placeholder: 'serega@email.com',
//   classSpan: 'form__span',
//   classLabel: '-label',
//   classInput: '-input',
//   classSub: '',
//   max: 23,
//   min: 0
// },{
//   where: 'formLog.password',
//   alias: 'inpGroupOne',
//   title: 'Пароль',
//   type: 'password',
//   placeholder: '9Y03ZU...',
//   classSpan: 'form__span',
//   classLabel: '-label',
//   classInput: '-input',
//   classSub: '',
//   max: 9,
//   min: 5
// }],

// arrayRegInput: [{
//   where: 'formReg.name',
//   alias: 'inpGroupTwo',
//   title: 'Имя',
//   type: 'text',
//   placeholder: 'serega',
//   classSpan: 'form__span',
//   classLabel: '-label',
//   classInput: '-input',
//   classSub: '',
//   max: 13,
//   min: 5
// },{
//   where: 'formReg.email',
//   alias: 'inpGroupTwo',
//   title: 'Почта',
//   type: 'email',
//   placeholder: 'serega@email.com',
//   classSpan: 'form__span',
//   classLabel: '-label',
//   classInput: '-input',
//   classSub: '',
//   max: 23,
//   min: 0
// },{
//   where: 'formReg.password',
//   alias: 'inpGroupTwo',
//   title: 'Пароль',
//   type: 'password',
//   placeholder: '9Y03ZU...',
//   classSpan: 'form__span',
//   classLabel: '-label',
//   classInput: '-input',
//   classSub: '',
//   max: 9,
//   min: 5
// },{
//   where: 'formReg.dbPassword',
//   alias: 'inpGroupTwo',
//   title: 'Пароль',
//   type: 'password',
//   placeholder: '9Y03ZU...',
//   classSpan: 'form__span',
//   classLabel: '-label',
//   classInput: '-input',
//   classSub: '',
//   max: 9,
//   min: 5
// },{
//   where: 'formReg.agreement',
//   alias: 'inpGroupTwo',
//   title: 'Соглашение на обработку личных данных',
//   type: 'checkbox',
//   placeholder: '',
//   classSpan: 'form__span',
//   classLabel: '-label',
//   classInput: '-input',
//   classSub: '_checkbox',
//   max: 0,
//   min: 0
// }],

// arrayPrompt: [{
//   icon: 'aboutOne.svg',
//   body: 'Широкий ассортимент зоотоваров'
// },{
//   icon: 'aboutTwo.svg',
//   body: 'Крупнейшая сеть зоомагазинов'
// },{
//   icon: 'aboutThree.svg',
//   body: 'Собственная курьерская служба'
// },{
//   icon: 'aboutFour.svg',
//   body: 'Забота о каждом питомце'
// }],

// arrayUser: [{
//   name: 'admin',
//   email: 'admin@email.com',
//   password: '123456',
//   role: 'admin'
// }],