const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token, // 建立一个快速访问
  name: state => state.user.uesrInfo.username,
  userId: state => state.user.uesrInfo.userId,
  staffPhoto: state => state.user.uesrInfo.staffPhoto
}
export default getters
