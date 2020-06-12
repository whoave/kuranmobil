import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public sure: string;
  public meal: string = "";
  public arabca: string = "";
  public mp3: string;
  public dua: string;
  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    if(parseInt(this.folder) < 5000){
      this.http.get<any>('https://api.acikkuran.com/surah/'+this.folder).subscribe(data => {
        let veri = data.data;
        this.mp3 = veri.audio.mp3;    
        this.sure = veri.name;
         veri.verses.forEach(ayet => {
           this.arabca += ayet.verse + " ﴿"+ayet.verse_number+"﴾ " + " " ;
          this.meal += ayet.translation.text + " ﴾"+ayet.verse_number+"﴿ " + " ";    
          });
        });
    }else{
      this.http.get<any>('../assets/dua_icerik.json').subscribe(data => {
        let veri = data.duas[parseInt(this.folder)-5001];
        console.log(veri);
        this.dua = veri.name;
        this.arabca = veri.arap;
        this.meal = veri.turk;
        });
    }
  

  }  
  playAudio(){
    let audio = new Audio();
    audio.src = this.mp3;
    audio.load();
    audio.play();
  }

}
