import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styles: []
})
export class ClubComponent implements OnInit {

  weImg = `<img src="../../assets/images/club/club-match.jpg"
  class="img-fluid"
  alt="CSC Futsal">`;
  weText = `<p class="card-text text-justify p-4 t-dark">El 
  <span class="t-orange">Club CSC Futsal</span> 
  va néixer al 2016 i és un club dedicat a la formació i a la pràctica de 
  <span class="t-orange">futbol sala</span> 
  al barri de Les Corts. Els nostres equips es construeixen amb una base de
  <span class="t-orange">confiança, responsabilitat i actitud positiva.</span> 
  En aquest club el que busquem és formar persones en termes 
  <span class="t-orange">esportius</span>, 
  però sobretot en termes de 
  <span class="t-orange">valors</span>, 
  promovent que la gent jove del districte tingui una vida saludable, realitzi esport setmanalment, sàpiga conviure en grup i entengui el món de la 
  <span class="t-orange">competició sense conflictes</span>.
  </p>`


  fieldImg = `<img src="../../assets/images/field/field.jpg"
  class="img-fluid"
  alt="Aristides Maillol">`;
  fieldText = `<p class="card-text text-justify mb-0 p-4 t-dark">
  <span class="t-orange">Els partits</span> es juguen a la pista poliesportiva de la <span class="t-orange">IME Arístides Maillol</span> 
  <span class="text-muted"> (Av. Joan XXIII, núm. 1)</span>, pista coberta situada al costat del camp del FC Barcelona.</p>
  <p class="card-text text-justify mb-0 p-4 t-dark">
  <span class="t-orange">Els entrenaments</span> es realitzen alternativament en aquest mateix camp d’Arístides Maillol, al <span class="t-orange">Col·legi Sant Ignasi-Sarrià</span><span class="text-muted"> (equips sènior)</span>
  i a l’Institut <span class="t-orange">Margarida Xirgu de l’Hospitalet de Llobregat</span><span class="text-muted"> (equips base)</span>.</p>`;

  colabText = `<div class="mb-5 banner-card-line"></div><p class="mb-0 card-text text-center t-dark">
  Per fer possible aquest projecte, hem establert i volem seguir establint una <span class="t-orange">estreta col·laboració</span>, amb els col·legis i instituts de la zona que, d’aquesta manera podrien disposar d’una nova <span class="t-orange">oferta formativa i d’activitat esportiva</span> per als seus alumnes, a més a més, de millorar la seva visibilitat en el barri.</p>
  <div class="mt-5 banner-card-line"></div>`;

  teamImg = `<img src="../../assets/images/club/team.jpg"
  class="img-fluid"
  alt="CSC Futsal">`;
  teamText = `<p class="card-text text-justify p-4 t-dark">
  El Club CSC FS està adscrit a la 
  <span class="t-orange">Federació Catalana de Fútbol</span>. 
  Actualment, el club té dos equips sèniors masculins i equips de futbol sala base de diferents categories.
  La nostra <span class="t-orange">intenció</span> 
  és potenciar el futbol sala base, tant masculí com femení, creant 
  <span class="t-orange">nous equips federats</span>.
  </p>`

  trainerText = `<div class="mb-5 banner-card-line"></div>
  <p class="mb-0 card-text text-center t-dark">
  Tots els equips estan coordinats pel 
  <span class="t-orange">coordinador de futbol sala</span> del club. 
  Cada equip està format per un total de 
  <span class="t-orange">12-14 jugadors</span> 
  i està entrenat per un entrenador o monitor de futbol Sala amb el 
  <span class="t-orange">títol oficial</span> 
  i 
  <span class="t-orange">experiència provada</span>. 
  </p>
  <div class="mt-5 banner-card-line"></div>`;

  juntaText = `<p class="mb-0 mt-0 card-text text-center t-dark">
  La 
  <span class="t-orange">Junta Directiva</span> 
  està formada pels següents membres: 
  </p>
  <ul class="list-group mt-3">
  <li class="list-group-item text-center border-0">Xim Cerdá - <span class="text-muted">President</span></li>
  <li class="list-group-item text-center border-0">Miguel De Lara - <span class="text-muted">Secretari</span></li>
  <li class="list-group-item text-center border-0">Javier Retana - <span class="text-muted">Tresorer</span></li>
  <li class="list-group-item text-center border-0">Ramon Polo - <span class="text-muted">Vocal</span></li>
  <li class="list-group-item text-center border-0">Marc Martínez - <span class="text-muted">Vocal</span></li>
  <li class="list-group-item text-center border-0">Joaquim Montolio - <span class="text-muted">Vocal</span></li>
  </ul>`;

  disclaimerText = `<div class="mb-5 banner-card-line"></div>
  <p class="mb-0 mt-0 card-text text-center t-dark">
  El club té el 
  <span class="t-orange">Reconeixement d’Entitat Organitzadora Homologada a l’Ajuntament de Barcelona</span>. 
  Aquest reconeixement permet que moltes famílies del club puguin 
  <span class="t-orange">beneficiar-se de beques de l’ajuntament</span> 
  per finançar l’activitat esportiva dels seus fills.
  </p>
  <div class="mt-5 banner-card-line"></div>`;


  constructor() { }

  ngOnInit(): void {
  }

}
