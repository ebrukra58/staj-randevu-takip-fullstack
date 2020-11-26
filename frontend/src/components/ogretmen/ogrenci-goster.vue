<template>
  <div>
      <Navbar/>
       <div class="container">
         <div class="row">
           <div class="col-md-2">
               <div style="margin-top: 30px;"></div>
               <div class="card" style="width:10rem;">
                  <img src="../../assets/indir.jpg" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">{{ogrenci.name+" "+ogrenci.surname}}</h5>
                    <p class="card-text">{{ogrenci.number}}</p>
                  </div>
                
              </div>
           </div>
           <div class="col-md-10">
        <div style="margin-top: 30px;"></div>
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
            <th scope="col">Zorunluluk</th>
            <th scope="col">Geçerlilik</th>
            <th scope="col">Durum</th>
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
            <td>{{staj.isVolunteer?"Hayır":"Evet"}}</td>
            <td>
              <select v-on:change="onChange($event,staj)" class="custom-select" id="inputGroupSelect01">
                    <option :selected="staj.note==null">Seç</option>
                    <option :selected="staj.not!=null&&staj.note.note=='YT'" value="YT">YT</option>
                    <option :selected="staj.not!=null&&staj.note.note=='YZ'" value="YZ">YZ</option>
                   </select>
            </td>
            <td> <button type="button" v-on:click="onayla(staj)" class="btn btn-success">Onayla</button></td>
            
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
          stajlar:[],
          ogrenci:null
      };
  },  
  created:function()
  {
      var token=window.getToken();
      var ogrenciId=this.$route.params.id;
      var config = {
          headers: {
            "token": token
          }
        }
      axios.get(window.serverUrl+"/internship/student/"+ogrenciId, config)
        .then(response=>
          {
            var data=response.data;
                  data.forEach(randevu=>
                  {
                    var baslangic=new Date(randevu.start);
                    randevu.start=baslangic;
                    var bitis=new Date(randevu.finish);
                    randevu.finish=bitis;
                  });
            this.stajlar=data;
          })
        .catch(reason=>console.log(reason));
    axios.get(window.serverUrl+"/student/"+ogrenciId,config)
        .then(response=>this.ogrenci=response.data)
        .catch(reason=>console.log(reason));
  },
  methods:
  {
    onChange:function(event,staj)
    {
      staj.note={note:event.target.value};
    },
    onayla:function(staj)
    {
      var config ={headers:{"token":window.getToken()}};
      axios.put(window.serverUrl+"/internship",staj,config)
        .then(()=>alert("Değişti"))
        .catch(reason=>console.log(reason));
    }
  }


  
}
</script>

<style>

</style>