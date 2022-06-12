export default {
  template: `
    <canvas class="canvas" id="canvas" :class="{ black: black }"></canvas>
  `,

  data(){
    return{

    }
  },

  props: ['main_color', 'black'],

  watch:{
    
  },

  mounted(){
    ( async () => {
      const box = await document.getElementById('boxCanvas')

      const cnv = document.querySelector('canvas')
      const ctx = cnv.getContext('2d')

      const color = this.main_color
  
      let particleArray = []
      let particleOnScreen = 20
  
      let cw, ch

      function reSize(){
        // console.log('reSize');
        cw = cnv.width = box.offsetWidth
        ch = cnv.height = box.offsetHeight
  
        if(cw > 576){
          particleOnScreen = 43
        }else if(cw > 1800){
          particleOnScreen = 160
        }else{
          particleOnScreen = 20
        }
  
        // console.log(cw + ', '  + ch);
        // console.log(box);
      }
      reSize()
          
      class Particle{
        constructor(color){
          this.x = Math.random() * cw
          this.y = ch + 1000
          this.speedY = this.random(-5, -1)
          this.r = this.random(0, 53)
          this.color = color
        }
        random(min, max){
          return Math.random() * (max - min) + min
        }
  
        pDraw(){
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.r, 0, Math.PI*2)
          ctx.fillStyle = this.color
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
          particleArray.push(new Particle(color))
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
          // console.log('arrayPush');
          arrayPush()
        }else if(cw > 1800){
          particleArray.length = 0
          particleOnScreen = 160
          // console.log('arrayPush');
          arrayPush()
        }else{
          particleArray.length = 0
          particleOnScreen = 20
          // console.log('arrayPush');
          arrayPush()
        }
  
        reSize()
      })
     })();
  }
}