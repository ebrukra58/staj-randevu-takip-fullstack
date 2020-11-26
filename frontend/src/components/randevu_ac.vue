<template>
  <div>
      <Navbar/>
    <div class="container">
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <div style="margin-top: 3rem;"></div>
          <h3>Randevu Aç</h3 >
          <h4>Randevu Açılacak Tarih Aralığını Seçiniz:</h4 >
              <div class="input-daterange input-group" id="dat">
                <input type="date" ref="baslangic" class="form-control" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}">
                <span class="input-group-addon" style="margin-left: 10px"> ile </span> 
                <span style="margin-left: 10px"></span>
                <input type="date" ref="bitis" class="form-control" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}">
            </div>
          <div style="margin-top: 20px;"></div>
          <div style="margin-top: 20px;"></div>
          <h4>Randevuların Başlangıç Saatini Seçiniz:</h4 >
          <div style="margin-top: 10px;"></div>
           <input ref="baslangicSaat" type="time" class="form-control">
          <div style="margin-top: 20px;"></div>
          <h4>Randevuların Bitiş Saatini Seçiniz:</h4 >
          <div style="margin-top: 10px;"></div>
           <input ref="bitisSaat" type="time" class="form-control">
           <div style="margin-top: 20px;"></div>
          <h4>Randevuların Süre Aralıklarını Seçiniz:</h4 >
          <div style="margin-top: 10px;"></div>
           <input ref="dakika" type="text" class="form-control">
           <div style="margin-top: 20px;"></div>
          
          <button type="button" v-on:click="olustur" class="btn btn-primary btn-lg">Oluştur</button>
          <span style="margin-right: 10px"></span>
          <button type="button" class="btn btn-danger btn-lg">Sıfırla</button>
          
          
          </div>
        <div class="col-md-3"></div>
        
      </div>
  </div>
  </div>
</template>

<script>
import Navbar from "../components/navbar-ogretmen";
import axios from "axios";
export default {
components:
  {
    Navbar
  },
  methods:
  {
    olustur:function()
    {
      var baslangic=this.$refs.baslangic.value;
      var bitis=this.$refs.bitis.value;
      var baslangicSaat=this.$refs.baslangicSaat.value;
      var bitisSaat=this.$refs.bitisSaat.value;
      var dakika=this.$refs.dakika.value;
      var data={start:baslangic,end:bitis,minute:dakika,startTime:baslangicSaat,endTime:bitisSaat};
      var token=window.getToken();
      var config = {
          headers: {
            "token": token
          }
        }
      axios.post(window.serverUrl+"/appointment/multiple",data,config)
        .then((response)=>console.log(response))
        .catch(reason=>console.log(reason));
    }
  },
  created:function()
  {
      if(!document.cookie.includes("token"))
        alert("a");
      document.title="Randevu Aç";
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