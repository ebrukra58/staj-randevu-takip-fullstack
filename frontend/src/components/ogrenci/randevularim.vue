<template>
  <div>
    <Navbar/>
      <div  class="table-responsive">
            <table class="table">
        <thead>
          <tr>
            
            <th scope="col">Tarih</th>
            <th scope="col">Saat</th>
            <th scope="col">Öğretmen</th>
            <th scope="col">Durum</th>
            
          </tr>
        </thead>
        <tbody>
          <tr v-for="randevu in randevular" :key="randevu.id">
            
             <td>{{randevu.date.toLocaleDateString()}}</td>
             <td>{{randevu.date.toLocaleTimeString()}}</td>
            <td>{{randevu.teacher.name+" "+randevu.teacher.surname}}</td>
            <td>
              <button type="button" v-on:click="randevuIptal(randevu)"  class="btn btn-danger">İptal</button>
            </td>
            
          </tr>
        
        </tbody>
      </table>
          </div>
  </div>
</template>

<script>
import Navbar from "../../components/navbar-ogrenci";
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
    }
  },
  created:function()
  {
      var config ={headers:{"token":window.getToken()}};
      var xhttp=new XMLHttpRequest();
      var vue=this;
        xhttp.onreadystatechange=function()
        {
          if(this.readyState==4&&this.status==200)
          {
            var ogrenci=JSON.parse(this.responseText);
            axios.get(window.serverUrl+"/appointment/student/"+ogrenci.id,config)
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
  },methods:{
    randevuIptal:function(randevu)
    {
      if(confirm("Silinsin mi?"))
      {
        var config ={headers:{"token":window.getToken()}};
      randevu.taken=false;
      randevu.student=null;
      axios.put(window.serverUrl+"/appointment",randevu,config)
        .then(()=>
        {
          var index=this.randevular.indexOf(randevu);
          this.randevular.splice(index,1);
        })
        .catch(reason=>console.log(reason));
      }
    }
  }
}
</script>

<style>

</style>