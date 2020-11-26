<template>
  <div>
      <Navbar/>
        <div class="container">
        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-6">
            <div style="margin-top: 3rem;"></div>
             <div class="alert alert-success" ref="eklendi" v-show="durum" role="alert">
                <p class="mb-0">Eklendi</p>
                </div>
                <span style="margin-bottom: 10px"></span>
            <h1>Ögrenci Ekle</h1>
            
                <div class="form-group">
                  <label for="exampleInputEmail1">Öğrenci Adı</label>
                  <input type="text" ref="ad" class="form-control" >
                </div>
                
                <div class="form-group">
                  <label for="exampleInputEmail1">Öğrenci Soyadı</label>
                  <input type="text" ref="soyad" class="form-control" >
                </div>
                
                <div class="form-group">
                  <label for="exampleInputEmail1">Öğrenci Numarası</label>
                  <input type="text" ref="numara" class="form-control" >
                </div>
            
                <span style="margin-bottom: 10px"></span>
                <button type="submit" v-on:click="ekle" class="btn btn-success btn-lg" >Ekle</button>
                
               
                </div>
                 <div class="col-md-3"></div>
          </div>
        </div>
  </div>
</template>

<script>
import Navbar from "../../components/navbar-ogretmen";
import axios from "axios";
export default {
components:
  {
    Navbar
  },
  data:function()
  {
    return{
     durum:false
    }
  },
  methods:
  {
    ekle:function()
    {
      var ad=this.$refs.ad.value;
      var soyad=this.$refs.soyad.value;
      var numara=this.$refs.numara.value;
      var data={name:ad,surname:soyad,number:numara,username:numara,password:"1234"};
      var token=window.getToken();
      var config = {
          headers: {
            "token": token
          }
        }
      axios.post(window.serverUrl+"/student",data,config)
        .then(()=>
        {
            this.durum=true;
        })
        .catch(reason=>console.log(reason));
    }
}
}
</script>

<style>

</style>