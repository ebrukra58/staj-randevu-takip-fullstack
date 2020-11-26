<template>
  <div>
      <Navbar />

    <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div style="margin-top: 3rem;"></div>
            <h1>Duyuru Oluştur</h1>
            
                <div class="form-group">
                  <label for="exampleInputEmail1">Duyuru Başlığı</label>
                  <input type="text" class="form-control" ref="baslik" id="exampleInputEmail1" >
                </div>
                <div class="form-group">
                    <label for="exampleFormControlTextarea1">Duyuru İçeriği</label>
                    <textarea class="form-control" ref="icerik" id="exampleFormControlTextarea1" rows="3"></textarea>
                  </div>
                <button type="submit" v-on:click="ekle" class="btn btn-primary">Duyuru Ekle</button> 
                <span style="margin-left: 10px"></span>
                <button type="submit" ref="duzenle" v-on:click="duzenle" class="btn btn-primary" :disabled="secilenId==0">Duyuruyu Düzenle</button>
                <span style="margin-left: 10px"></span>
                <button type="submit" ref="sil" v-on:click="sil" class="btn btn-danger" :disabled="secilenId==0">Duyuruyu Sil</button>
              
         </div>
         <div class="col-md-6">
           <div style="margin-top: 3rem;"></div>
            <h1>Duyurular</h1>
            <div class="list-group">
                <a v-on:click="duyuruSecildi(duyuru)" href="#" v-for="duyuru in duyurular" :key="duyuru.id" class="list-group-item list-group-item-action">
                  <div ref="{{duyuru.id}}" v-on:click="duyuruSecildi" class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">{{duyuru.title}}</h5>
                      <small>{{duyuru.date}}</small>
                    </div>
                    <p class="mb-1">{{duyuru.content}}</p>
                </a>
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
  data:function()
  {
    return{
      duyurular:[],
      secilenId:0
    }
  },
  methods:
  {
    duyuruSecildi:function(duyuru)
    {
      if(duyuru.title!=undefined)
      {
        this.$refs.baslik.value=duyuru.title;
        this.$refs.icerik.value=duyuru.content;
        this.secilenId=duyuru.id;
      }
    },
    duzenle:function()
    {
      var baslik=this.$refs.baslik.value;
      var icerik=this.$refs.icerik.value;
      var data={id:this.secilenId,title:baslik,content:icerik,date:new Date()};
      var token=window.getToken();
      var config = {
          headers: {
            "token": token
          }
        }
      axios.put(window.serverUrl+"/announcement",data,config)
        .then(()=>
        {
          this.duyurular.forEach(element=>
          {
            if(element.id==this.secilenId)
            {
              element.title=baslik;
              element.content=icerik;
              element.date=data.date;
            }
          });
        })
        .catch(reason=>console.log(reason));
    },sil:function()
    {
      var token=window.getToken();
      var config = {
          headers: {
            "token": token
          }
        }
      axios.delete(window.serverUrl+"/announcement/"+this.secilenId,config)
        .then(()=>
        {
          for (let i = 0; i < this.duyurular.length; i++) {
            const element = this.duyurular[i];
            if(element.id==this.secilenId)
              this.duyurular.splice(i,1);
          }
          this.secilenId=0;
          this.$refs.baslik.value="";
          this.$refs.icerik.value="";

        })
    },
    ekle:function()
    {
      var baslik=this.$refs.baslik.value;
      var icerik=this.$refs.icerik.value;
      var data={title:baslik,content:icerik,date:new Date()};
     var token=window.getToken();
      var config = {
          headers: {
            "token": token
          }
        }
        this.$refs.baslik.value="";
          this.$refs.icerik.value="";
      axios.post(window.serverUrl+"/announcement",data,config)
        .then((response)=>this.duyurular.unshift(response.data))
        .catch(reason=>console.log(reason));
    }
  },
  created:function()
  {
      document.title="Duyurular";
      var token=window.getToken();
      var config = {
          headers: {
            "token": token
          }
        }
      axios.get(window.serverUrl+"/announcement",config)
        .then(response=>this.duyurular=response.data)
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