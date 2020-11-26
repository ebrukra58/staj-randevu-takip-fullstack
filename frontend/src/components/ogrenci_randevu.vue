<template>
    <div>
        <Navbar/>
    <div class="container">
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <div style="margin-top: 3rem;"></div>
          <div>
            <h4>Randevu Tarihini Seçiniz:</h4 >
            <div class="row form-row">
               <input type="date" ref="tarih" class="form-control" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}">
            </div>
            
          </div>
          <div style="margin-top: 20px;"></div>
          <div>
            <button type="button" v-show="gosterTarihSec" v-on:click="tarihSec" class="btn btn-primary btn-lg">Tarihi Seç</button>
          </div>
          <div style="margin-top: 20px;"></div>
          <div v-show="goster" id="saat">
          <h4>Randevu Saatini Seçiniz:</h4>
              <div  class="table-responsive">
        <table class="table">
        <thead>
          <tr>
            
            <th scope="col">Tarih</th>
            <th scope="col">Öğretmen</th>
            <th scope="col">Durum</th>
           
            
          </tr>
        </thead>
        <tbody>
          <tr v-for="randevu in randevular" :key="randevu.id">
            
            <td>{{randevu.date.getHours()+":"+(randevu.date.getMinutes()==0?"00":randevu.date.getMinutes())}}</td>
            <td>{{randevu.teacher.name+" "+randevu.teacher.surname}}</td>
            <td>
              <button type="button" v-on:click="randevuAl(randevu)" :disabled="randevu.taken" class="btn btn-success">Al</button>
            </td>
          </tr>
        
        </tbody>
      </table>
      </div>
          </div>
        </div>
        <div class="col-md-3"></div>
      </div>  
    </div>   
    </div>
</template>

<script>
import Navbar from "../components/navbar-ogrenci";
import axios from "axios";
export default {
components:
  {
    Navbar
  },
  data:function()
  {
    return{
        gosterTarihSec:true,
        goster:false,
        randevular:[]
    };
  },
  created:function()
  {
      document.title="Randevu Al";
      var vue=this;
      var xhttp=new XMLHttpRequest();
        xhttp.onreadystatechange=function()
        {
          if(this.readyState==4&&this.status==200)
          {
            var ogrenci=JSON.parse(this.responseText);
            var xhttp=new XMLHttpRequest();
            xhttp.onreadystatechange=function()
            {
              if(this.readyState==4&&this.status==200)
              {
                var stajlar=JSON.parse(this.responseText);
                var biten=0;
                var now=new Date();
                stajlar.forEach(staj=>
                {
                  var bitis=new Date(staj.finish);
                  if(bitis.getTime()<now.getTime())
                    biten++;
                });
                
                var config ={headers:{"token":window.getToken()}};
                axios.get(window.serverUrl+"/appointment/student/"+ogrenci.id,config)
                .then(response=>
                  {
                    var data=response.data;
                    biten-=data.length;
                    if(biten==0)
                    {
                      alert("Randevu Alabilmek İçin Bitmiş bir Stajınızın Olması Gereklidir");
                      vue.gosterTarihSec=false;
                    }
                  })
                .catch(reason=>console.log(reason));
              }
            };
            xhttp.open("get",window.serverUrl+"/internship/student/"+ogrenci.id,true);
            xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhttp.setRequestHeader("token", window.getToken());
            xhttp.send();
          }
        };
        xhttp.open("post",window.serverUrl+"/userDetails",true);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.setRequestHeader("token", window.getToken());
        xhttp.send();
  },
  methods:
  {
    tarihSec:function()
    {
      this.goster=true;
      var config ={headers:{"token":window.getToken()}};
      var tarih=this.$refs.tarih.value;
      axios.get(window.serverUrl+"/appointment/day/"+tarih, config)
              .then(response=>
                {
                  var data=response.data;
                  if(data.length==0)
                    alert("Bu Tarihte Randevu Yoktur");
                  data.forEach(randevu=>
                  {
                    var date=new Date(randevu.date);
                    randevu.date=date;
                  });
                  this.randevular=data;
                })
              .catch(reason=>console.log(reason));
     
    },
    randevuAl:function(randevu)
    {
        //var config={headers:{"token":window.getToken()}};
      //var vue=this;
        var xhttp=new XMLHttpRequest();
        xhttp.onreadystatechange=function()
        {
          if(this.readyState==4&&this.status==200)
          {
            var ogrenci=JSON.parse(this.responseText);
            randevu.student=ogrenci;
            randevu.taken=true;
            var xhttp=new XMLHttpRequest();
            xhttp.onreadystatechange=function()
            {
              if(this.readyState==4&&this.status==200)
              {
                  alert("Alındı");
              }
            };
            xhttp.open("put",window.serverUrl+"/appointment",true);
            xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhttp.setRequestHeader("token", window.getToken());
            xhttp.send(JSON.stringify(randevu));
          }
        };
        xhttp.open("post",window.serverUrl+"/userDetails",true);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.setRequestHeader("token", window.getToken());
        xhttp.send();
     
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