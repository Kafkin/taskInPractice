import vSlider from './module/slider/slider.js'
import vCard from './module/card.js'
import vCanvas from './module/canvas.js'
import vMessage from './module/message.js'

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
    }
  },

  methods:{
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
            localStorage.setItem('arrayUser', JSON.stringify(this.arrayUser))
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
    }
  },

  components:{
    vSlider,
    vCard,
    vCanvas,
    vMessage
  },

  created(){
    
  },

  mounted(){
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


    (() => {
      const user = localStorage.getItem('currentUser')
      !!user ? this.currentUser = JSON.parse(user) : console.log('Нет сохранненного пользователя')
    })();

    (() => {
      const arrayUser = localStorage.getItem('arrayUser')
      !!arrayUser ? this.arrayUser = JSON.parse(arrayUser) : console.log('Нет сохранненного списка пользователей')
    })();
  }

// ------------
}).mount('#app')