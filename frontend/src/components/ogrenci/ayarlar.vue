<template>
  <div>
      <Navbar/>
       <div class="container">
        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-6">
            <div style="margin-top: 3rem;"></div>
             <div class="alert alert-success" ref="eklendi" v-show="durum" role="alert">
                <p class="mb-0">Parolanız Değiştirildi.</p>
                </div>
                <span style="margin-bottom: 10px"></span>
                  <h1>Parola Değiştir</h1>
            
                <div class="form-group">
                  <label for="exampleInputEmail1">Eski Parolanız</label>
                  <input type="password" ref="eskiParola" class="form-control" >
                </div>
                
                <div class="form-group">
                  <label for="exampleInputEmail1">Yeni Parolanız</label>
                  <input type="password" ref="yeniParola" class="form-control" >
                </div>
                
                <div class="form-group">
                  <label for="exampleInputEmail1">Yeni Parolanız (Tekrar) </label>
                  <input type="password" ref="yeniParolaT" class="form-control" >
                </div>
            
                <span style="margin-bottom: 10px"></span>
                <button type="submit" v-on:click="degistir" class="btn btn-success btn-lg" >Değiştir</button>
                
               
                </div>
                 <div class="col-md-3"></div>
          </div>
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
      durum:false
    }
  },
  methods:
  {
    degistir:function()
    {
      var parola=this.$refs.eskiParola.value;
      var yeniParola=this.$refs.yeniParola.value;
      var yeniParolaT=this.$refs.yeniParolaT.value;
      if(parola.trim()!=""&&yeniParola.trim()!=""&yeniParolaT.trim()!="")
      {
        if(yeniParola==yeniParolaT)
        {
          var data={password:parola,newPassword:yeniParola};
          var config ={headers:{"token":window.getToken()}};
          axios.post(window.serverUrl+"/updatePassword/student",data,config)
          .then(response=>
          {
            if(response.data)
              this.durum=true;
            else
              alert("Bir Hata Oluştu");
          })
          .catch(e=>console.log(e));
        }
        else
          alert("Yeni Parolalar Eşleşmiyor");
      }
      else
        alert("Boş Alanları Doldurun");
    }
  }
}
</script>

<style>

</style>