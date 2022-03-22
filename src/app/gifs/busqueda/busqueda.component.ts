import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  constructor( private gifsServices: GifsService){

  }
 
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  buscar(){
    
    let valor = this.txtBuscar.nativeElement.value

    if (valor.trim().length === 0){
      return;
    }

    this.gifsServices.buscarGifs(valor)

    this.txtBuscar.nativeElement.value = ''
  }

  ngOnInit(): void {
  }

}
