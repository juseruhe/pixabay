import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrls: ['./listar-imagen.component.css']
})
export class ListarImagenComponent implements OnInit {

  termino = "";

  subscripcion: Subscription;

  listImagenes: any[] = [];

  loading = false;

  imagensPorPagina= 30;

  paginaActual = 1;

  CalcularTotalPaginas = 0;



  constructor(private _imagenService: ImagenService) {

  this.subscripcion = this._imagenService.getTerminoBusqueda().subscribe(data => {

    this.termino = data;

    this.loading = true;

    
  this.obtenerImagenes()
  })

    
  }

  ngOnInit(): void {
  }

  obtenerImagenes(){


    this._imagenService.getImagenes(this.termino).subscribe(data => {

  this.loading = false;

  this.paginaActual = 1;

  console.log(data)

     if(data.hits.length === 0) {

      this._imagenService.setError("OOOPS no encontramos ningún resultado de la búsqueda")

      return
     }


     this.CalcularTotalPaginas = Math.ceil(data.totalHits / this.imagensPorPagina)

     this.listImagenes = data.hits


    },  error => {

      this._imagenService.setError("OOOPS Ocurrío un Error en el servidor")
      this.loading = false;
    });



  }


  paginaAnterior(){

    this.paginaActual--
  }

  paginaPosterior(){

    this.paginaActual++
  }

  paginaAnteriorClass(){
    if(this.paginaActual === 1){
      return false
    } else{
      return true
    }
  }

  paginaPosteriorClass(){

    if(this.paginaActual === this.CalcularTotalPaginas){
      return false
    } else{
      return true
    }

  }

}
