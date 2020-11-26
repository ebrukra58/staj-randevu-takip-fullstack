<template>
  <div>
      <nav class="navbar sticky-top navbar-dark bg-dark">
            <span class="navbar-brand mb-0 h2">DUMLUPINAR ÜNİVERSİTESİ</span>
        </nav>
        <div class="container">
            <div class="row">
              <div class="col-md-3">
              </div>
              <div class="col-md-6">
                <div style="margin-top: 7rem;"></div>
                <!--<form ref="form" ons>-->
                  <div class="alert alert-danger" ref="hataMesaj" v-show="hata" role="alert"></div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Kullanıcı Adı</label>
                    <input type="text" ref="kullaniciadi" class="form-control" id="text1" aria-describedby="emailHelp">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Şifre</label>
                    <input type="password" ref="sifre" class="form-control" id="exampleInputPassword1">
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                     
                    </div>
                    <div class="col-md-4">
                      <button class="btn btn-primary btn-lg active" v-on:click="girisyap" role="button" ref="giris" aria-pressed="true">Giriş Yap</button>

                    </div>
                    <div class="col-md-4">
                      
                    </div>
                  </div>
                  
                <!--</form>-->
              </div>
              <div class="col-md-3">
              </div>
            </div>
        </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
created:function()
  {
      document.title="Öğretmen Giriş";
  },
  data: function () {
    return {
      hata:false
    }
  },
  methods:
  {
    girisyap:function()
    {
      var kullaniciadi=this.$refs.kullaniciadi.value;
      var sifre=this.$refs.sifre.value;
      if(kullaniciadi.trim()==""||sifre.trim()=="")
        alert("Eksik Bilgi");
      else
      {
        axios.post(window.serverUrl+"/login/teacher",{username:kullaniciadi,password:sifre})
        .then(response=>
          {
            var date=new Date();
            var expire=date.getTime()+60*60*24*1000*30;
            date.setTime(expire);
            document.cookie="token="+response.data+";expires="+date.toGMTString()+";path=/";
            this.$router.push("./duyurular");
          })
        .catch(function (error)
        {
          if(error.response.data.status==403)
              alert("Kullanıcı Adı veya Şifre Yanlış");
            else
              alert("Bir Hata Oluştu :( ");
        });
      }
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