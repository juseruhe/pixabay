import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit, OnDestroy {

  texto = '';
  mostrar = false;
  susbcripcion: Subscription;

  constructor(private ImagenService: ImagenService) {
    this.susbcripcion = this.ImagenService.getError().subscribe(data => {
      this.mostrarMensaje();
      this.texto = data;
    })
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void{

    this.susbcripcion.unsubscribe();

  }

  mostrarMensaje(){

    this.mostrar = true

    setTimeout(() =>{


     this.mostrar = false

    },2000)
  }

}
