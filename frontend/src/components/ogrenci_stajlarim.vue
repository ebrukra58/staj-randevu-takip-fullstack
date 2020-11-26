<template>
  <div>
      <Navbar/>
          
          <div  class="table-responsive">
            <table class="table">
        <thead>
          <tr>
            
            <th scope="col">Staj Türü</th>
            <th scope="col">Staj Yeri</th>
            <th scope="col">Gün Sayısı</th>
            <th scope="col">Konusu</th>
            <th scope="col">Başlangıç Tarihi</th>
            <th scope="col">Bitiş Tarihi</th>
            <th scope="col">Not</th>
            <th scope="col">Zorunluluk</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="staj in stajlar" :key="staj.id">
            
            <td>{{staj.type.name}}</td>
            <td>{{staj.companyName}}</td>
            <td>{{staj.day}}</td>
            <td>{{staj.subject.name}}</td>
            <td>{{staj.start.toLocaleDateString()}}</td>
            <td>{{staj.finish.toLocaleDateString()}}</td>
            <td>{{staj.note}}</td>
            <td>{{staj.isVolunteer?"Hayır":"Evet"}}</td>
            
          </tr>
        
        </tbody>
      </table>
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
  }, data:function()
  {
      return{
          stajlar:[],
          ogrenci:null
      };
  },
  created:function()
  {
      document.title="Stajlarım";
       var token=window.getToken();
      var config = {
          headers: {
            "token": token
          }
        }
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
                var data=response.data;
                  data.forEach(staj=>
                  {
                    var start=new Date(staj.start);
                    staj.start=start;
                    var finish=new Date(staj.finish);
                    staj.finish=finish;
                  });
                  vue.stajlar=data;
                vue.stajlar=response.data
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