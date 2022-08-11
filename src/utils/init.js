const App = {
  init() {
    this.setRootFont()
  },
  setRootFont() {
    const designWidth_l = 1440 // 横屏设计宽度
    const designWidth_p = 800 // 竖屏设计宽度
    const width = window.innerWidth // 屏幕宽度
    const height = window.innerHeight // 屏幕高度
    const isLandscape = width > height // 是否横屏
    const designWidth = isLandscape ? designWidth_l : designWidth_p
    let fontSize = (width * 100) / designWidth
    if (fontSize < 100) {
      fontSize = 100
    }
    document.querySelector('html').style.fontSize = fontSize + 'px'
    console.info('根元素fontSize:', fontSize)
  },
}

App.init()
export default App
