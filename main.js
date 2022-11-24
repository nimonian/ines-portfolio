import './style.css'

function animateHidables() {
  const hidables = document.querySelectorAll('.hidable')

  let observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('hidden')
        } else {
          entry.target.classList.add('hidden')
        }
      })
    },
    { threshold: 0.2 }
  )

  hidables.forEach((el) => observer.observe(el))
  hidables.forEach((el) => el.classList.add('hidden'))
}

function heroCanvas() {
  const canvas = document.querySelector('#hero-canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const stars = new Array(300).fill(null).map((_) => ({
    x: canvas.width * Math.random(),
    y: canvas.height * Math.random(),
    radius: 1 + Math.random(),
  }))
  
  const drawStars = (x, y) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    stars.forEach((star) => {
      ctx.beginPath()
      const lux = 1.5 / Math.sqrt(Math.hypot(star.x - x, star.y - y))
      ctx.fillStyle = `rgba(255, 255, 255, ${lux})`
      ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI)
      ctx.fill()
    })
  }

  drawStars(0,0)

  document.querySelector('.hero').addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    drawStars(x, y)
  })
}

animateHidables()
heroCanvas()

window.addEventListener('resize', () => {
  heroCanvas()
})
