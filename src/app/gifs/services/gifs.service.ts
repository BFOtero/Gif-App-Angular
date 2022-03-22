import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gifs, GifsSearchResponse } from '../interfaces/gifs-interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {


  private apiKey: string = 'LoQmvXIKWyBdySi3AXXDdbvbcpl74Gi6';
  private serviceUrl = 'http://api.giphy.com/v1/gifs'
  private _historial: string[] = [];

  public resultados: Gifs[] = []

  constructor( private http: HttpClient ) {

 

    if(localStorage.getItem('resultados')){
      this._historial = JSON.parse(localStorage.getItem('historial')!)
    }
    if(localStorage.getItem('resultados')){
      this.resultados = JSON.parse(localStorage.getItem('resultados')!)
    }

  }


  get historial() {
    return [...this._historial]
  }

  buscarGifs( query: string ){
    query = query.trim().toLocaleLowerCase()
    if( !this._historial.includes( query )){
      this._historial = [ query, ...this._historial];
      this._historial = this._historial.splice(0, 10)
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    let params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', '10')
        .set('q', query);

    
    this.http.get<GifsSearchResponse>(`${this.serviceUrl}/search`, {params})
      .subscribe( (response) => { 
        console.log(response.data)
        this.resultados = response.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados))
      })
 
  }

}
