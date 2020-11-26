<template>
    <div>
        <Navbar/>
        <div class="container">
            <div class="row">
                
                <div class="col-md-6">
                    <div style="margin-top: 3rem;"></div>
                    <div id="sinif">
                        <h3>Sınıf Seçimi</h3>
                        <input type="radio" v-on:click="sinifSecildi(1)" id="sinif_one" name="sinif" value="1">
                        <label for="sinif_one">1</label><br>
                        <input type="radio" v-on:click="sinifSecildi(2)" id="sinif_two" name="sinif" value="2">
                        <label for="sinif_two">2 ve Üzeri</label><br>  
                    </div>
                    <div id="tur" v-show="stajTur">
                        <h3>Staj Türü Seçimi</h3>
                        <input type="radio" v-on:click="turSecildi('yurtici')" id="tur_one" name="tur" value="1">
                        <label for="tur_one">Yurtiçi</label><br>
                        <input type="radio" v-on:click="turSecildi('yurtdisi')" id="tur_two" name="tur" value="2">
                        <label for="tur_two">Yurtdışı</label><br>
                        <input type="radio" v-on:click="turSecildi('erasmus')" id="tur_three" name="tur" value="3">
                        <label for="tur_three ">Erasmus</label><br>    
                    </div>
                    <div id="calisan" v-show="calisan">
                        <h3>Staj Yeri Çalışan Kontrolü</h3>
                        <h6>Yazılım : Bilgisayar Mühendisi,Yazılım Mühendisi,Bilişim Sistem Mühendisi var mı?
                            Donanım : Bilgisayar Mühendisi,Elektrik-Elektronik Mühendisi var mı?
                        </h6>
                        <input type="radio" id="calısan_one" v-on:click="muhendisSecildi(true);" name="calısan" value="1">
                        <label for="calısan_one">Evet</label><br>
                        <input type="radio" id="calısan_two" v-on:click="muhendisSecildi(false);" name="calısan" value="2">
                        <label for="calısan_two">Hayır</label><br> 
                    </div>
                    <div v-show="donem" id="donem">
                        <h3>Dönem İçi- Tatil</h3>
                        <input type="radio" v-on:click="donemSecildi('donemici')" id="donem_one" name="donem" value="1">
                        <label for="donem_one" >Dönem İçi</label><br>
                        <input type="radio" v-on:click="donemSecildi('tatil')" id="donem_two" name="donem" value="2">
                        <label for="donem_two">Yaz veya Yarıyıl Tatili</label><br> 
                    </div>
                    <div v-show="donemici">
                        <h3>Aşağıdaki Şartlardan Birini Sağlıyorum</h3>
                        <input type="radio" v-on:click="donemiciSecildi(true)" id="donem_one" name="donem" value="1">
                        <label for="donem_one" >Dönem içinde Ders Kaydım Yok</label><br>
                        <input type="radio" v-on:click="donemiciSecildi(true)" id="donem_two" name="donem" value="2">
                        <label for="donem_two">Haftada Tek Gün Dersim Var</label><br>
                        <input type="radio" v-on:click="donemiciSecildi(true)" id="donem_one" name="donem" value="1">
                        <label for="donem_one" >Tek Dersim Var. Haftada 2 gün fakat ikisi de 17:00 dan sonra</label><br>
                        <input type="radio" v-on:click="donemiciSecildi(false)" id="donem_two" name="donem" value="2">
                        <label for="donem_two">Hiçbiri</label><br> 
                    </div>
                    <div v-show="alan" id="alan">
                        <h3>Alan Seçimi</h3>
                        <input type="radio" v-on:click="konuGetir('software')" id="alan_one" name="alan" value="1">
                        <label for="alan_one">Yazılım</label><br>
                        <input type="radio" v-on:click="konuGetir('hardware')" id="alan_two" name="alan" value="2">
                        <label for="alan_two">Donanım</label><br> 
                    </div>
                    <div v-show="konu" id="konu">
                        <h3>Konu Seçimi</h3>
                        <select ref="konular" v-on:change="konuSecildi()" class="custom-select" id="inputGroupSelect01" style="margin-right: 10px;">
                            <option value="0">(Konu Seçin)</option>
                            <option v-for="konu in konular" :key="konu.id" v-bind:value="konu.id">{{konu.name}}</option>
                        </select>
                    </div>
                    <div style="margin-top: 20px;"></div>
                    <h4 v-show="tarih">Staj Yapılacak Tarih Aralığını Seçiniz:</h4 >
                    <div v-show="tarih" class="input-daterange input-group" id="dat">
                        <input type="date" ref="baslangic" class="form-control" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}">
                        <span class="input-group-addon" style="margin-left: 10px"> ile </span> 
                        <span style="margin-left: 10px"></span>
                        <input type="date" ref="bitis" class="form-control" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}">
                        <span style="margin-bottom: 10px"></span>
                        <div style="margin-bottom: 10px"></div>
                        <span>İş Günü:{{gun}}</span>
                    </div>
                    <div style="margin-top: 20px;"></div>
                    <div v-show="tarih">
                        <input type="checkbox" style="margin-bottom: 10px" ref="cumartesi">Cumartesi Çalışacağım
                        <button v-on:click=tarihHesapla() type="button" class="btn btn-primary btn-md">Tarihleri Seç</button>
                    </div>
                    <div style="margin-top: 20px;"></div>
                    <div v-show="kamu" id="K-Ö">
                        <h3>Kamu - Özel Sektör</h3>
                        <input type="radio" v-on:click="kamuSecildi('ozel')" id="kö_one" name="kö" value="1">
                        <label for="kö_one">Özel</label><br>
                        <input type="radio" v-on:click="kamuSecildi('kamu')" id="kö_two" name="kö" value="2">
                        <label for="kö_two">Kamu</label><br> 
                    </div>
                    <div  v-show="yerAd" >
                        <h3>Staj Yapılacak Yerin Adı:</h3>
                        <input type="text" ref="ad" class="form-control">
                        <button v-on:click="yerAdSecildi()" type="button" class="btn btn-primary btn-md">Tamam</button>
                    </div>
                    <div style="margin-top: 20px;"></div>
                    <div v-show="maas" id="maas">
                        <h3>Maaş Ödenecek Mi?</h3>
                        <input type="radio" v-on:click="maasSecildi(true)" id="maas_one" name="maas" value="1">
                        <label for="maas_one">Evet</label><br>
                        <input type="radio" v-on:click="maasSecildi(false)" id="maas_two" name="maas" value="2">
                        <label for="maas_two">Hayır</label><br> 
                    </div>
                    <div style="margin-top: 20px;"></div>
                    <div v-show="sigorta" id="sigorta">
                        <h3>Sigortanı İş Yeri Yapacak Mı?</h3>
                        <input type="radio" v-on:click="sigortaSecildi(true)" id="sigorta_one" name="sigorta" value="1">
                        <label for="sigorta_one">Evet</label><br>
                        <input type="radio" v-on:click="sigortaSecildi(false)" id="sigorta_two" name="sigorta" value="2">
                        <label for="sigorta_two">Hayır</label><br> 
                    </div>
                    <button v-show="basvur" v-on:click="basvurFunc()" class="btn btn-success">Başvur</button>
                    </div>
                    
                
                <div class="col-md-6">  

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
        konular:[],
        goster:false,
        stajTur:false,
        donem:false,
        alan:false,
        calisan:false,
        donemici:false,
        konu:false,
        konu1:0,
        tarih:false,
        kamu:false,
        maas:false,
        sigorta:false,
        basvur:false,
        secilenKonu:null,
        gun:0,
        yerAd:false,
        staj:{},
        kullanici:null
    };
  },
  created:function()
  {
      document.title="Staj Başvuru";
      var vue=this;
      var xhttp=new XMLHttpRequest();
        xhttp.onreadystatechange=function()
        {
          if(this.readyState==4&&this.status==200)
          {
           vue.ogrenci=JSON.parse(this.responseText);
          }
        };
        xhttp.open("post",window.serverUrl+"/userDetails",true);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.setRequestHeader("token", window.getToken());
        xhttp.send();
  },
  methods:
  {
      sinifSecildi:function(sinif)
      {
        if(sinif==1){
            alert("Staj yapmak için en az 2. sınıf olmalısın")
             this.stajTur=false;
        }
        else
        {
            this.kirmizi=false;
            this.stajTur=true;
        }
      },
      turSecildi:function(tur)
      {
          switch(tur)
          {
            case 'yurtdisi':
                  alert("Bölümü bilgilendirmek amacıyla bölüm staj komisyonuna dilekçe veriniz.");
                break;
            case 'erasmus':
                  alert("Erasmus dış ilişkiler koordinatörlüğü ile görüşünüz.\nErasmus stajı yapacak/yapan öğrencilerimizin staj başvuru ve staj süreci bilgilerini Üniversitemiz Dış İlişkiler Koordinatörlüğü veya http://erasmus.dpu.edu.tr/tr/index/sayfa/239/staj-hareketliligi adresinden öğrenebilirler." );
                  break;
            case 'yurtici':
                 this.calisan=true;
                 this.staj.location={name:"domestic"};
                break;
              
          }
      },
      muhendisSecildi:function(bool)
      {
          if(!bool)
            alert("Staj Yeri Uygun Değil");
            else
            this.donem=true;
      },
      donemiciSecildi:function(bool)
      {
          if(bool)
            this.alan=true;
        else
            alert("Staj Yapamazsın");
      },
      donemSecildi:function(donem)
      {
          if(donem=='tatil')
            this.alan=true;
        else
            this.donemici=true;
      },
      konuGetir:function(alan)
      {
          var vue=this;
        
            var xhttp=new XMLHttpRequest();
            xhttp.onreadystatechange=function()
            {
                if(this.readyState==4&&this.status==200)
                {
                    var stajlar=JSON.parse(this.responseText);
                    var yazilim=0;
                    var donanim=0;
                    stajlar.forEach(staj=>
                        {
                            if(staj.note=="YT")
                            {
                                if(staj.type=="YAZILIM")
                                    yazilim+=staj.day;
                                else if(staj.type=="DONANIM")
                                    donanim+=staj.day;
                            }
                        });
                    if(yazilim+donanim<60)
                    {
                        if(yazilim>=40&&alan==1)
                        {
                            alert("Donanım Stajı Yapmak Zorundasınız");
                            vue.konu=false;
                        }
                        else if(donanim>=40&&alan==0)
                        {
                            alert("Yazılım Stajı Yapmak Zorundasınız");
                            vue.konu=false;
                        }
                        else
                        {
                            vue.konu=true;
                            vue.staj.type={name:alan+""};
                            var config ={headers:{"token":window.getToken()}};
                            axios.get(window.serverUrl+"/internshipSubject/type/"+alan,config)
                                    .then(response=>vue.konular=response.data)
                                    .catch(reason=>console.log(reason)); 
							
                        }
                    }
                }
            };
            xhttp.open("get",window.serverUrl+"/internship/student/"+vue.ogrenci.id,true);
            xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhttp.setRequestHeader("token", window.getToken());
            xhttp.send();
          },
      konuSecildi:function()
      {
          this.staj.subject={id:this.$refs.konular.value}
          this.tarih=true;
      },
      maasSecildi:function(bool)
      {
          this.staj.takeSalary=bool;
          this.sigorta=true;
      },
      sigortaSecildi:function(bool)
      {
          this.staj.takeInsurance=bool;
          this.basvur=true;
      },
      yerAdSecildi()
      {
        this.staj.companyName=this.$refs.ad.value;
        if(this.staj.isPublic)
            this.basvur=true;
        else
            this.maas=true;
      },
      tarihHesapla()
      {
        var vue=this;
        var baslangic=new Date(vue.$refs.baslangic.value);
        var bitis=new Date(vue.$refs.bitis.value);
        if(bitis.getTime()<=baslangic.getTime())
        {
            alert("Bitiş Tarihi Başlangıç Tarihinden Küçük Olamaz")
        }
        else
        {  
            var xhttp=new XMLHttpRequest();
            xhttp.onreadystatechange=function()
            {
                if(this.readyState==4&&this.status==200)
                {
                    var stajlar=JSON.parse(this.responseText);
                    var check=true;
                    for (let i = 0; i < stajlar.length; i++) {
                        const staj = stajlar[i];
                        var baslangic2=new Date(staj.start);
                            var bitis2=new Date(staj.finish);
                            if((baslangic.getTime()>=baslangic2.getTime()&&baslangic.getTime()<=bitis2.getTime())||
                            (bitis.getTime()>=baslangic2.getTime()&&bitis.getTime()<=bitis2.getTime()))
                            {
                                alert("Staj Tarihleri Başka Bir Staj Tarihi ile Çakışıyor");
                                vue.kamu=false;
                                check=false;
                                break;
                            }
                    }
                    if(check)
                    {
                        vue.gun=1;
                        while(baslangic.getTime()<bitis.getTime())
                        {
                            baslangic.setTime(baslangic.getTime()+86400000);
                            if(baslangic.getDay()!=0&&(baslangic.getDay()!=6||(baslangic.getDay()==6&&vue.$refs.cumartesi.checked)))
                                vue.gun++;
                        }
                        if(vue.gun<20)
                        {
                            alert("En az 20 iş günü olmalıdır");
                            vue.kamu=false;
                        }
                        else if(vue.gun>40)
                        {
                            alert("En Fazla 40 iş günü olmalıdır");
                            vue.kamu=false;
                        }
                        else
                        {
                            vue.kamu=true;
                            vue.staj.day=vue.gun;
                            vue.staj.start=new Date(vue.$refs.baslangic.value);
                            vue.staj.finish=bitis;
                        }
                    }
                }
            };
            xhttp.open("get",window.serverUrl+"/internship/student/"+this.ogrenci.id,true);
            xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhttp.setRequestHeader("token", window.getToken());
            xhttp.send();
        }
      },
      kamuSecildi:function(tip)
      {
        if(tip=='ozel')
        {
            this.staj.isPublic=false;
            this.basvur=false;
        }
        else if(tip=='kamu')
        {
            this.staj.isPublic=true;
            this.staj.takeSalary=false;
            this.staj.takeInsurance=true;
        }
        this.yerAd=true;
      },
      basvurFunc:function()
      {
        var xhttp=new XMLHttpRequest();
        var vue=this;
        xhttp.onreadystatechange=function()
        {
          if(this.readyState==4&&this.status==200)
          {
            var ogrenci=JSON.parse(this.responseText);
            vue.staj.student={id:ogrenci.id};
            var xhttp=new XMLHttpRequest();
            xhttp.onreadystatechange=function()
            {
                if(this.readyState==4&&this.status==200)
                {
                    vue.yesil=true;
                    var mesaj="Staj defterinizin sayfa sayısı EN AZ staj yaptığınız GÜN SAYISI kadar olmalıdır. Aşağıda belirtilen belgeleri en az 5 iş günü öncesinde bölüme getirip imza ve kaşelettiriniz.Staja başlamadan önce, Staj Sicil Fişi ve Staj Defterinin ilgili alanlarına birer tane fotoğraf yapıştırılmalı, Staj Sicil Fişindeki bölüm onayı kısmına bölüm başkan yardımcıları veya staj komisyon üyeleri tarafından onay imzası alınmalı, sonrasında da öğrenci işlerinden fotoğraflara mühür yaptırılması gerekmektedir. \nGetirilmesi Gereken Belgeler:\nSPAS\nStaj Zorunluluk Belgesi\nStaj Kabul Belgesi\nSicil Fişi";
                    if(vue.staj.takeSalary)
                        mesaj+="\nİşsizlik Fonu Belgesi";
                    if(!vue.staj.takeInsurance)
                        mesaj+="\nSigorta Talep Belgesi";
                    if(vue.$refs.cumartesi.checked)
                        mesaj+="\nİş Yerinden Cumartesi Calışıldığına Dair İmzalı Kaşeli Belge";
                    alert(mesaj);
                   
                }
            };
            xhttp.open("post",window.serverUrl+"/internship",true);
            xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhttp.setRequestHeader("token", window.getToken());
            xhttp.send(JSON.stringify(vue.staj));
          }
        }
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