import Vue from 'vue'
import VueRouter from 'vue-router'
import Giris from '../components/giris.vue'
import ogrenci_anasayfa from '../components/ogrenci_anasayfa.vue'
import ogrenci_giris from '../components/ogrenci_giris.vue'
import ogrenci_randevu from '../components/ogrenci_randevu.vue'
import ogrenci_stajlarim from '../components/ogrenci_stajlarim.vue'
import ogretmen_duyurular from '../components/ogretmen_duyurular.vue'
import ogretmen_giris from '../components/ogretmen_giris.vue'
import randevu_ac from '../components/randevu_ac.vue'
import staj_basvuru from '../components/staj_basvuru.vue'
import ogr_ogrencileri_listele from '../components/ogr_ogrencileri_listele.vue'
import ogrenci_goster from '../components/ogretmen/ogrenci-goster.vue'
import randevulari_listeleme from '../components/ogretmen/randevulari-listeleme.vue'
import staj_konusu from '../components/ogretmen/staj_konusu.vue'
import randevularim from '../components/ogrenci/randevularim.vue'
import alinan_randevular from '../components/ogretmen/alinan-randevular.vue'
import ogrenci_ekleme from '../components/ogretmen/ogrenci_ekleme.vue'
import ayarlar from '../components/ogrenci/ayarlar.vue'
import ayarlar_ogr from '../components/ogretmen/ayarlar.vue'
import axios from 'axios'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Giris',
    component: Giris
  },
  {
  path: '/ogretmen/ogrencileri-listele',
    name: 'Ogrencileri-Listele',
    component: ogr_ogrencileri_listele
  },
  {
    path: '/ogrenci/anasayfa',
      name: 'Ogrenci-Anasayfa',
      component: ogrenci_anasayfa
  },
  {
  path: '/ogrenci/giris',
    name: 'Ogrenci-Giris',
    component: ogrenci_giris
  },
  {
  path: '/ogrenci/randevu',
    name: 'Ogrenci-Randevu',
    component: ogrenci_randevu
  },
  {
  path: '/ogrenci/stajlarim',
    name: 'Ogrenci-Stajlarim',
    component: ogrenci_stajlarim
  },
  {
  path: '/ogretmen/duyurular',
    name: 'Ogretmen-Duyurular',
    component: ogretmen_duyurular
  },
  {
  path: '/ogretmen/giris',
    name: 'Ogretmen-Giris',
    component: ogretmen_giris
  },
  {
  path: '/ogretmen/randevu-ac',
    name: 'Randevu-Ac',
    component: randevu_ac
  },
  {
  path: '/ogrenci/staj-basvuru',
    name: 'Staj-Basvuru',
    component: staj_basvuru
  },
  {
  path: '/ogretmen/staj_konusu',
    name: 'Staj-Konusu',
    component: staj_konusu
  },
  
  {
  path: '/ogretmen/ogrencileri-listele/:id',
    name: 'Ogrenci-Goster',
    component: ogrenci_goster
  },
  
  {
  path: '/ogretmen/ogrenci-ekleme/',
    name: 'Ogrenci-Ekleme',
    component: ogrenci_ekleme
  },
  {
    path: '/ogrenci/randevularim',
      name: 'Randevularim',
      component: randevularim
    },
  {
    path: '/ogretmen/randevulari-listeleme',
      name: 'Randevulari-Listeleme',
      component: randevulari_listeleme
    },
  {
    path: '/ogretmen/alinan-randevular',
      name: 'Alinan-Randevular',
      component: alinan_randevular
    },
    {
    path: '/ogrenci/ayarlar',
      name: 'Ayarlar',
      component: ayarlar
    },
    {
    path: '/ogretmen/ayarlar',
      name: 'Ayarlar',
      component: ayarlar_ogr
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) =>
{
  if(document.cookie.includes("token"))
  {
    if(to.path=="/"||to.path=="/ogretmen/giris"||to.path=="/ogrenci/giris")
    {
      var token=window.getToken();
        var config = {
          headers: {
            "token": token
          }
        }
      axios.post(window.serverUrl+"/userType",null,config).then(
        response=>
        {
          var data=response.data;
          if(data.userType=="Teacher")
            router.push("/ogretmen/duyurular");
          else if(data.userType=="Student")
            router.push("/ogrenci/anasayfa");
        }
        ,error=>console.log(error));
    }
    else
    {
      if(to.path.startsWith("/ogretmen/"))
      {
        token=window.getToken();
        config = {
          headers: {
            "token": token
          }
        };
        axios.post(window.serverUrl+"/userType",null,config).then(
        response=>
        {
          var data=response.data;
          if(data.userType=="Student")
            next("/");
          else
            next();
        }
        ,error=>console.log(error));
      }
      else if(to.path.startsWith("/ogrenci/"))
      {
        token=window.getToken();
        config = {
          headers: {
            "token": token
          }
        };
        axios.post(window.serverUrl+"/userType",null,config).then(
        response=>
        {
          var data=response.data;
          if(data.userType=="Teacher")
            next("/");
          else
            next();
        }
        ,error=>console.log(error));
      }
      next();
    }
  }
  else
  {
    if(to.path!="/"&&to.path!="/ogretmen/giris"&&to.path!="/ogrenci/giris")
      next("/");
    else
      next();
  }
});

export default router
