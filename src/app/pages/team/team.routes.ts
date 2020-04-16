import { Routes } from '@angular/router';
import { PlayersComponent } from 'src/app/components/team/players/players.component';
import { ClassificationComponent } from 'src/app/components/team/classification/classification.component';
import { StatsComponent } from 'src/app/components/team/stats/stats.component';
import { CalendarComponent } from 'src/app/components/team/calendar/calendar.component';

export const TEAM_ROUTES: Routes = [
    { path: 'players', component: PlayersComponent },
    { path: 'results', component: ClassificationComponent },
    { path: 'stats', component: StatsComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: '**', pathMatch:'full', redirectTo: 'players' }
];