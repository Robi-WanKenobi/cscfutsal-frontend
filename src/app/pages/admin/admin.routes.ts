import { Routes } from '@angular/router';
import { AdminTeamsComponent } from 'src/app/components/admin/admin-teams/admin-teams.component';
import { AdminStatsComponent } from 'src/app/components/admin/admin-stats/admin-stats.component';
import { AdminChroniclesComponent } from 'src/app/components/admin/admin-chronicles/admin-chronicles.component';
import { TeamFormComponent } from 'src/app/components/forms/team-form/team-form.component';
import { PlayerFormComponent } from 'src/app/components/forms/player-form/player-form.component';
import { ChronicleFormComponent } from 'src/app/components/forms/chronicle-form/chronicle-form.component';
import { ChronicleEditFormComponent } from 'src/app/components/forms/chronicle-edit-form/chronicle-edit-form.component';

export const ADMIN_ROUTES: Routes = [
    { path: 'teams', component: AdminTeamsComponent },
    { path: 'teams/:id', component: TeamFormComponent },
    { path: 'team/player/:idt/:idp', component: PlayerFormComponent },
    { path: 'stats', component: AdminStatsComponent },
    { path: 'chronicles', component: AdminChroniclesComponent },
    { path: 'team/chronicle/:idt/:idc', component: ChronicleFormComponent },
    { path: 'team/chronicle/edit/:idt/:idc', component: ChronicleEditFormComponent },
    { path: '**', pathMatch:'full', redirectTo: 'teams' }
];