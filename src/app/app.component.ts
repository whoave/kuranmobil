import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  
  public appPages = [];
  public labels = [
    {
      title:"Kunut Duası 1",
      id:"1",
      icon:'book',
      url:'folder/5001',
    },
    {
      title:"Kunut Duası 2",
      id:"2",
      icon:'book',
      url:'folder/5002',
    },
    {
      title:"Allahumme Salli Duası",
      id:"3",
      icon:'book',
      url:'folder/5003',
    },
    {
      title:"Allahumme Barik Duası",
      id:"4",
      icon:'book',
      url:'folder/5004',
    },
    {
      title:"Ettehiyyatü Duası",
      id:"5",
      icon:'book',
      url:'folder/5005',
    },
    {
      title:"Rabbena Atina Duası",
      id:"6",
      icon:'book',
      url:'folder/5006',
    },
    {
      title:"Rabbenağfirli Duası",
      id:"7",
      icon:'book',
      url:'folder/5007',
    },
    {
      title:"Sübhaneke Duası",
      id:"8",
      icon:'book',
      url:'folder/5008',
    },
    {
      title:"Salih Amel ve İhsan için Dua",
      id:"9",
      icon:'book',
      url:'folder/5009',
    },
    {
      title:"Ezan Duası",
      id:"10",
      icon:'book',
      url:'folder/5010',
    },
    {
      title:"Af ve Afiyet için Dua",
      id:"11",
      icon:'book',
      url:'folder/5011',
    },
    {
      title:"Nefs ve Şeytandan Korunma Duası",
      id:"12",
      icon:'book',
      url:'folder/5012',
    },
    {
      title:"Rabbi Yessir Duâsı",
      id:"13",
      icon:'book',
      url:'folder/5013',
    },
    {
      title:"Yemek Duası",
      id:"14",
      icon:'book',
      url:'folder/5014',
    },
    {
      title:"HZ. Peygamberin Duası",
      id:"15",
      icon:'book',
      url:'folder/5015',
    },
    
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private http: HttpClient
  ) {
    
    this.http.get<any>('https://api.acikkuran.com/surahs').subscribe(data => {
    data.data.forEach(sure => {
      let sureYeni = {
        title:sure.name,
        url:'/folder/'+sure.id,
        icon:'book'
      };
      this.appPages.push(sureYeni);
    });
    
    });
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
