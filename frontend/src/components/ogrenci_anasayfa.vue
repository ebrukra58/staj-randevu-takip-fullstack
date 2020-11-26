<template>
  <div>
       <Navbar/>
          <div class="container">
            <div class="row">
              <div class="col-md-3">
                <div style="margin-top: 30px;"></div>
                <h4>Profilim</h4>
                <div class="card" style="width: 18rem;">
                  <img src="../assets/indir.jpg" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">{{ogrenci.name+" "+ogrenci.surname}}</h5>
                    <p class="card-text">{{ogrenci.number}}</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div style="margin-top: 30px;"></div>
                <h4>Duyurular</h4>
                  <div class="list-group">
                <a href="#" v-for="duyuru in duyurular" :key="duyuru.id" class="list-group-item list-group-item-action">
                  <div ref="{{duyuru.id}}" class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">{{duyuru.title}}</h5>
                      <small>{{duyuru.date.toLocaleDateString()}}</small>
                    </div>
                    <p class="mb-1">{{duyuru.content}}</p>
                </a>
                </div>
                </div>
            
              <div class="col-md-3">
                <div style="margin-top: 30px;"></div>
                <h4>Bilgiler</h4>
                <div class="card">
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">Toplam yapılan iş günü : {{toplam}}</li>
                    <li class="list-group-item">Toplam yapılacak iş günü : {{yapilacakIsGunu}}</li>
                    <li class="list-group-item">Staj durum : {{durum}}</li>
                  </ul>
                </div>
              </div>
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
      duyurular:[],
      ogrenci:null,
      toplam:0,
      yapilacakIsGunu:60,
      durum:"Yapılmıyor"
     
    }
  },
  created:function()
  {
      document.title="Anasayfa";
      var token=window.getToken();
      var config = {
          headers: {
            "token": token
          }
        }
      axios.get(window.serverUrl+"/announcement",config)
        .then(response=>
        {
          var data=response.data;
                  data.forEach(duyuru=>
                  {
                    var date=new Date(duyuru.date);
                    duyuru.date=date;
                  });
                  vue.duyurular=data;
        this.duyurular=response.data
        })
        .catch(reason=>console.log(reason));
      var vue=this;
        var xhttp=new XMLHttpRequest();
        xhttp.onreadystatechange=function()
        {
            if (this.readyState==4&&this.status==200)
              {
              vue.ogrenci=JSON.parse(this.responseText);
              axios.get(window.serverUrl+"/internship/student/"+vue.ogrenci.id, config)
              .then(response=>
                {
                  var stajlar=response.data;
                  for (let i = 0; i < stajlar.length; i++) {
                    const element = stajlar[i];
                    if(stajlar[i].note=="YT")
                      vue.toplam+=element.day;
                    var baslangic=new Date(element.start);
                    var bitis=new Date(element.finish);
                    var now=new Date();
                    if(baslangic.getTime()<=now.getTime()&&bitis.getTime()>=now.getTime())
                      vue.durum="Yapılıyor";
                  }
                  vue.yapilacakIsGunu=60-vue.toplam;
                  if(vue.yapilacakIsGunu<0)
                    vue.yapilacakIsGunu=0;
                })
              .catch(reason=>console.log(reason));
              }
        };
        xhttp.open("post",window.serverUrl+"/userDetails",true);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.setRequestHeader("token", window.getToken());
        xhttp.send();
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