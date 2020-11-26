import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
window.serverUrl=location.protocol+"//"+location.hostname+":8081";
window.getToken=function()
{
  var token=document.cookie;
  token=token.substring(token.indexOf("token=")+6);
  if(token.includes(";"))
    token=token.substring(0,token.indexOf(";"));
  return token;
};
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
