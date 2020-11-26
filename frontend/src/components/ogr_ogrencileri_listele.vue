<template>
  <div>
      <Navbar/>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div style="margin-top: 20px;"></div>
            <div class="input-group" ref="inputs">
              <input type="text" ref="ad" class="form-control"  placeholder="Ad" style="margin-right: 10px;margin-bottom: 10px">
              <input type="text" ref="soyad" class="form-control" placeholder="Soyad" style="margin-right: 10px;margin-bottom: 10px">
              <input type="text" ref="numara" class="form-control" placeholder="Numara" style="margin-right: 10px;margin-bottom: 10px">
               
                 <button type="button" v-on:click="filtrele" class="btn btn-primary" style="margin-right: 5px">Filtrele</button>
                 <button type="button" v-on:click="temizle" ref="temizle" :disabled="kapali==0"  class="btn btn-danger ">Temizle</button>
               </div>
          </div>
        </div>
      </div>
      <div class="container">
         <div class="row">
           <!--<div class="col-md-3"></div>-->
           <div class="col-md-12">
        <div style="margin-top: 20px;"></div>
        <div  class="table-responsive">
        <table class="table">
        <thead>
          <tr>
            
            <th scope="col">Ad</th>
            <th scope="col">Soyad</th>
            <th scope="col">Numara</th>
            <th scope="col">Göster</th>
            
          </tr>
        </thead>
        <tbody>
          <tr v-for="ogrenci in ogrenciler" :key="ogrenci.id">
            
            <td>{{ogrenci.name}}</td>
            <td>{{ogrenci.surname}}</td>
            <td>{{ogrenci.number}}</td>
            <td><button type="button" v-on:click="goster(ogrenci)" class="btn btn-info ">Görüntüle</button></td>
          </tr>
        
        </tbody>
      </table>
      </div>
      
    </div>
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
  methods:{
      goster:function(ogrenci)
      {
        this.$router.push("/ogretmen/ogrencileri-listele/"+ogrenci.id);
      },
      filtrele:function()
      {
        var token=window.getToken();
      var config = {
          headers: {
            "token": token
          }
        }
      axios.get(window.serverUrl+"/student",config)
        .then(response=>
        {
          this.ogrenciler=response.data;
          var ad=this.$refs.ad.value.trim();
        var soyad=this.$refs.soyad.value.trim();
        var numara=this.$refs.numara.value.trim();
        for (let i = 0; i < this.ogrenciler.length; i++)
        {
          const ogrenci = this.ogrenciler[i];
          if(ad!=""&&ogrenci.name!=ad)
          {
            this.ogrenciler.splice(i,1);
            i--;
            continue;
          }
          if(soyad!=""&&ogrenci.surname!=soyad)
          {
            this.ogrenciler.splice(i,1);
            i--;
            continue;
          }
          if(numara!=""&&ogrenci.number!=numara)
          {
            this.ogrenciler.splice(i,1);
            i--;
            continue;
          }

        }
        this.kapali=1
        })
        .catch(reason=>console.log(reason));
        /*if(this.ogrenciler.name==this.$refs.ad.value){
          this.$router.push("/ogretmen/ogrencileri-listele/"+this.ogrenci.id);
        }*/
      },
      temizle:function()
      {
        
        this.$refs.ad.value="";
        this.$refs.soyad.value="";
        this.$refs.numara.value="";
        this.kapali=0;
        var token=window.getToken();
        var config = {
          headers: {
            "token": token
          }
        }
      axios.get(window.serverUrl+"/student",config)
        .then(response=>this.ogrenciler=response.data)
        .catch(reason=>console.log(reason));
      },
        
  },
  
  data:function()
  {
    return{
      ogrenciler:[],
      kapali:0
    }
  },
  mounted:function()
  {
    if(window.innerWidth<window.innerHeight)
    {
      this.$refs.inputs.classList.remove("input-group");
    }
      document.title="Öğrencileri Listele";
      var token=window.getToken();
      var config = {
          headers: {
            "token": token
          }
        }
      axios.get(window.serverUrl+"/student",config)
        .then(response=>this.ogrenciler=response.data)
        .catch(reason=>console.log(reason));
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