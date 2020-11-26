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
            <button type="button" v-on:click="tarihSec" class="btn btn-primary btn-lg">Tarihi Seç</button>
          </div>
          <div style="margin-top: 20px;"></div>
          <div v-show="goster" id="saat">
          <h4>Randevu Saatini Seçiniz:</h4>
              <div  class="table-responsive">
        <table class="table">
        <thead>
          <tr>
            
            <th scope="col">Saat</th>
            <th scope="col">Öğretmen</th>
            <th scope="col">Durum</th>
            <th scope="col">Öğrenci</th>
            <th scope="col">Kaldır</th>
            
           
            
          </tr>
        </thead>
        <tbody>
          <tr v-for="randevu in randevular" :key="randevu.id">
            
            <td>{{randevu.date.getHours()+":"+(randevu.date.getMinutes()==0?"00":randevu.date.getMinutes())}}</td>
            <td>{{randevu.teacher.name+" "+randevu.teacher.surname}}</td>
            <td>{{randevu.taken?"Dolu":"Boş"}}</td>
            <td>{{randevu.student==null?"":randevu.student.name+" "+randevu.student.surname}}</td>
            <td>
              <button type="button" v-on:click="sil(randevu)" class="btn btn-danger">Sil</button>
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
        goster:false,
        randevular:[]
    };
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
  }
}
</script>

<style>

</style>