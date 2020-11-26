<template>
  <div>
      <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">DUMLUPINAR ÜNİVERSİTESİ</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item" ref="duyuru">
              <router-link class="nav-link" to="/ogretmen/duyurular">Duyurular <span class="sr-only">(current)</span></router-link>
            </li>
            <li ref="randevu" class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Randevu
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link class="dropdown-item" to="/ogretmen/randevu-ac">Randevu Aç</router-link>
                <router-link class="dropdown-item" to="/ogretmen/randevulari-listeleme">Randevu Listele</router-link>
                 <router-link class="dropdown-item" to="/ogretmen/alinan-randevular">Alınan Randevular</router-link>
              </div>
            </li>
            <li class="nav-item" ref="listele">
              <router-link class="nav-link" to="/ogretmen/ogrencileri-listele">Öğrencileri Listele</router-link>
            </li>
            <li class="nav-item" ref="staj_konusu">
              <router-link class="nav-link" to="/ogretmen/staj_konusu">Staj Konusu</router-link>
            </li>
            <li class="nav-item" ref="ogrenciEkleme">
              <router-link class="nav-link" to="/ogretmen/ogrenci-ekleme">Öğrenci Ekleme</router-link>
            </li>
            <li class="nav-item" ref="ayarlar">
              <router-link class="nav-link" to="/ogretmen/ayarlar">Ayarlar</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" v-on:click="cikis" href="#">Çıkış</a>
            </li>
          </ul>
          <span class="navbar-text">
            STAJ TAKİP VE RANDEVU SİSTEMİ
          </span>
        </div>
    </nav>
  </div>
</template>

<script>
export default {
  mounted:function()
  {
    var name=this.$router.currentRoute.name;
    if(name=="Ogretmen-Duyurular")
    {
      this.$refs.duyuru.classList.add("active");
    }
       else if(name=="Ogrenci-Ekleme")
      this.$refs.ogrenciEkleme.classList.add("active");
       else if(name=="Ayarlar")
      this.$refs.ayarlar.classList.add("active");
    else if(name=="Ogrencileri-Listele"||name=="Ogrenci-Goster")
      this.$refs.listele.classList.add("active");
     else if(name=="Staj-Konusu")
      this.$refs.staj_konusu.classList.add("active");
     else if(name=="Randevulari-Listeleme"||name=="Randevu-Ac"||name=="Alinan-Randevular")
      this.$refs.randevu.classList.add("active");
  },
  methods:
  {
    cikis:function () {
      document.cookie = "token=; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/;";
      this.$router.push("/");
    }
  }
}
</script>

<style>
  body{
    background:#f5f8fa
    }
    @media (min-width: 1200px) { .container {
        max-width: 1200px;
    } }
</style>