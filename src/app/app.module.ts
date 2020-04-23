import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

// COMPONENTS
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { MatchesComponent } from './components/matches/matches.component';
import { HomeStatsComponent } from './components/home-stats/home-stats.component';
import { TableStatsComponent } from './components/table-stats/table-stats.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { PlayersComponent } from './components/team/players/players.component';
import { ClassificationComponent } from './components/team/classification/classification.component';
import { StatsComponent } from './components/team/stats/stats.component';
import { CalendarComponent } from './components/team/calendar/calendar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { PlayerCardComponent } from './components/team/player-card/player-card.component';
import { LoginComponent } from './components/login/login.component';
import { TeamCardComponent } from "./components/team-card/team-card.component";
import { KitComponent } from './components/club/kit/kit.component';
import { AdminTeamsComponent } from './components/admin/admin-teams/admin-teams.component';
import { AdminStatsComponent } from './components/admin/admin-stats/admin-stats.component';
import { AdminChroniclesComponent } from './components/admin/admin-chronicles/admin-chronicles.component';
import { BannerCardComponent } from './components/banner-card/banner-card.component';

// PAGES
import { HomeComponent } from './pages/home/home.component';
import { TeamComponent } from './pages/team/team.component';
import { ClubComponent } from './pages/club/club.component';
import { AdminComponent } from './pages/admin/admin.component';

// FORMS
import { TeamFormComponent } from './components/forms/team-form/team-form.component';
import { PlayerFormComponent } from './components/forms/player-form/player-form.component';
import { ChronicleFormComponent } from './components/forms/chronicle-form/chronicle-form.component';
import { ChronicleEditFormComponent } from './components/forms/chronicle-edit-form/chronicle-edit-form.component';

// MODULES;
import { AppRoutingModule } from './app.routes';
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgSelectModule } from '@ng-select/ng-select';
import { ClipboardModule } from 'ngx-clipboard';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

// PIPES
import { FilterStatsPipe } from './pipes/filter-stats.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { FilterCalendarPipe } from './pipes/filter-calendar.pipe';
import { ContactComponent } from './pages/contact/contact.component';
import { ChronicleComponent } from './components/team/chronicle/chronicle.component';
import { AdComponent } from './components/ad/ad.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    MatchesComponent,
    HomeStatsComponent,
    TableStatsComponent,
    TeamsComponent,
    TeamCardComponent,
    TeamComponent,
    PlayersComponent,
    ClassificationComponent,
    StatsComponent,
    CalendarComponent,
    FooterComponent,
    PlayerCardComponent,
    LoginComponent,
    FilterStatsPipe,
    SortPipe,
    FilterCalendarPipe,
    ClubComponent,
    KitComponent,
    AdminComponent,
    AdminTeamsComponent,
    AdminStatsComponent,
    AdminChroniclesComponent,
    TeamFormComponent,
    PlayerFormComponent,
    ChronicleFormComponent,
    ChronicleEditFormComponent,
    BannerCardComponent,
    ContactComponent,
    ChronicleComponent,
    AdComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    ClipboardModule,
    CKEditorModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
