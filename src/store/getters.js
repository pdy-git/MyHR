const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  login: state => state.user.token // 建立一个快速访问
}
export default getters
