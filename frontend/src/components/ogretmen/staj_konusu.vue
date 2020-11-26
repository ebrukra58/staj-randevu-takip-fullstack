<template>
  <div>
      <Navbar/>
      <div class="container">
        <div class="row">
            <div class="col-md-6">
              <div style="margin-top: 3rem;"></div>
                <h1>Staj Konuları</h1>
                <select   v-on:change="onChange($event)" class="form-control">
                <option selected value="software">Yazılım Konuları</option>
                <option value="hardware">  Donanım Konuları</option>
                </select>
                <table class="table">
                
                <thead>
                    <tr>
                    <th scope="col">İsim</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="konu in konular" :key="konu.id">
                      <td>{{konu.name}}</td>
                      <td> <button v-on:click="konuSecildi(konu)"  class="btn btn-primary" >Düzenle</button>
                      <button type="submit" ref="sil" style="margin-left:10px" v-on:click="sil(konu)" class="btn btn-danger">Sil</button>
                      </td>
                    </tr>
                </tbody>
                </table>
            </div>
            <div class="col-md-6">
                <div style="margin-top: 3rem;"></div>
                <h1>Yeni Staj Konusu Oluştur</h1>
                <div class="form-group">
                  <label for="exampleInputEmail1">Staj Türü</label>
                 <div class="input-group mb-3">
                
                
                <select class="custom-select" ref="secim" id="inputGroupSelect01" style="margin-right: 10px;">
                    <option selected>Seç...</option>
                    <option value="hardware">Donanım</option>
                    <option value="software">Yazılım</option>
                    
                </select>
                </div>
                </div>
                <div class="form-group">
                    <label for="exampleFormControlTextarea1">Staj Konusu</label>
                   <input type="text" class="form-control" ref="konu" id="exampleInputEmail1" >
                  </div>
                <button type="submit" v-on:click="ekle" class="btn btn-primary">Konu Ekle</button> 
                <span style="margin-left: 10px"></span>
                <button type="submit" ref="duzenle" v-on:click="duzenle"  class="btn btn-success"  :disabled="secilenId==0" >Konuyu Düzenle</button>
               
              
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
          konular:[],
          secilenId:0,
          secilen:null
      }
  }, created:function()
  { 
    var token=window.getToken();
                var config = {
                    headers: {
                        "token": token
                    }
                    }
                 axios.get(window.serverUrl+"/internshipSubject/type/software",config)
                .then(response=>this.konular=response.data)
                .catch(reason=>console.log(reason)); 
  },
  methods: {
        onChange(event) {
            if(event.target.value!=-1)
            {
                console.log(event.target.value);
                var token=window.getToken();
                var config = {
                    headers: {
                        "token": token
                    }
                    }
                 axios.get(window.serverUrl+"/internshipSubject/type/"+event.target.value,config)
                .then(response=>this.konular=response.data)
                .catch(reason=>console.log(reason)); 
            }
            else
                this.konular=[];
        },
    ekle:function()
    {
      var konu=this.$refs.konu.value;
      var secim=this.$refs.secim.value;
      var data={name:konu,type:{name:secim}};
     var token=window.getToken();
      var config = {
          headers: {
            "token": token
          }
        }
        this.$refs.konu.value="";
          this.$refs.secim.value=-1;
      axios.post(window.serverUrl+"/internshipSubject/",data,config)
        .then((response)=>this.konular.unshift(response.data))
        .catch(reason=>console.log(reason));
    },
    duzenle:function()
    {
      var konu =this.$refs.konu.value;
      var secim = this.$refs.secim.value;
      var data={id:this.secilenId,name:konu,type:{name:secim}};
      
      var token=window.getToken();
      var config = {
          headers: {
            "token": token
          }
        }
          this.$refs.secim.options[0].setAttribute("selected","true");
          this.$refs.konu.value="";
      axios.put(window.serverUrl+"/internshipSubject",data,config)
        .then(()=>
        {
          this.secilen.name=konu;
          this.secilen.type=secim;
        })
        .catch(reason=>console.log(reason));

    },
     konuSecildi:function(konu)
    {
        this.$refs.secim.options.forEach(option=>
          {
            if(option.innerHTML==konu.type.name)
              option.setAttribute("selected","true");
          });
        
        this.$refs.konu.value=konu.name;
        this.secilenId=konu.id;
        this.secilen=konu;
    },
    sil:function(konu)
    {
      var token=window.getToken();
      var config = {
          headers: {
            "token": token
          }
        }
      axios.delete(window.serverUrl+"/internshipSubject/"+konu.id,config)
        .then(()=>
        {
          var index=this.konular.indexOf(konu);
          this.konular.splice(index,1);
        })
        .catch(e=>console.log(e));
    }
  }
}
</script>

<style>

</style>