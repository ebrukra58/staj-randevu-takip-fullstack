<template>
  <div>
      <Navbar/>
          <div  class="table-responsive">
        <table class="table">
        <thead>
          <tr>
            <th scope="col">Tarih</th>
            <th scope="col">Saat</th>
            <th scope="col">Öğrenci</th>
            <th scope="col">Öğrenci Numarası</th>
            <th scope="col">Kaldır</th>
            
          </tr>
        </thead>
        <tbody>
          <tr v-for="randevu in randevular" :key="randevu.id">
            
           <td>{{randevu.date.toLocaleDateString()}}</td>
             <td>{{randevu.date.toLocaleTimeString()}}</td>
            <td>{{randevu.student.name+" "+randevu.student.surname}}</td>
            <td>{{randevu.student.number}}</td>
            <td>
              <button type="button" v-on:click="sil(randevu)" class="btn btn-danger">Sil</button>
            </td>
          </tr>
        
        </tbody>
      </table>
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
        randevular:[]
    };
  },
  methods:
  {
     sil:function(randevu)
    {
         if(confirm("Silinsin mi?"))
      {
        var config ={headers:{"token":window.getToken()}};
      axios.delete(window.serverUrl+"/appointment/"+randevu.id,config)
        .then(()=>
        {
          var index=this.randevular.indexOf(randevu);
          this.randevular.splice(index,1);
        })
        .catch(reason=>console.log(reason));
    }
  }
  },
    created:function()
    {
        var vue=this;
        var xhttp=new XMLHttpRequest();
        xhttp.onreadystatechange=function()
        {
            if (this.readyState==4&&this.status==200)
            {
                var ogretmen=JSON.parse(this.responseText);
                var config ={headers:{"token":window.getToken()}};
                axios.get(window.serverUrl+"/appointment/teacher/"+ogretmen.id,config)
                    .then(response=>
                    {
                      var data=response.data;
                      data.forEach(randevu=>
                      {
                        var date=new Date(randevu.date);
                        randevu.date=date;
                      });
                      vue.randevular=data;
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

</style>