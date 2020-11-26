<template>
  <div>
      <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#">DUMLUPINAR ÜNİVERSİTESİ</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item " ref="Anasayfa">
                  <router-link class="nav-link" to="./anasayfa">Anasayfa <span class="sr-only">(current)</span></router-link>
                </li>
                <li class="nav-item" ref="basvuru">
                  <router-link class="nav-link" to="./staj-basvuru">Staj Başvuru</router-link>
                </li>
                <li class="nav-item" ref="randevu">
                  <router-link class="nav-link" to="./randevu">Mülakat Randevusu Al</router-link>
                </li>
                <li class="nav-item" ref="stajlarim">
                  <router-link class="nav-link" to="./stajlarim">Stajlarım</router-link>
                </li>
                <li class="nav-item" ref="randevularim">
                  <router-link class="nav-link" to="./randevularim">Randevularım</router-link>
                </li>
                <li class="nav-item" ref="ayarlar">
                  <router-link class="nav-link" to="./ayarlar">Ayarlar</router-link>
                </li>
                <li class="nav-item">
                  <a v-on:click="cikis" class="nav-link" href="#">Çıkış</a>
                </li>
              </ul>
              <span class="navbar-text">
                STAJ TAKİP VE RANDEVU SİSTEMİ
              </span>
            </div>
        </nav>
        <router-view/>
  </div>
</template>

<script>
export default {
mounted:function()
  {
    var name=this.$router.currentRoute.name;
    if(name=="Ogrenci-Anasayfa")
    {
      this.$refs.Anasayfa.classList.add("active");
    }
    else if(name=="Staj-Basvuru")
      this.$refs.basvuru.classList.add("active");
    else if(name=="Ogrenci-Randevu")
      this.$refs.randevu.classList.add("active");
    else if(name=="Ogrenci-Stajlarim")
      this.$refs.stajlarim.classList.add("active");
    else if(name=="Randevularim")
      this.$refs.randevularim.classList.add("active");
       else if(name=="Ayarlar")
      this.$refs.ayarlar.classList.add("active");
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