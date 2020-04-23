import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { TeamComponent } from './pages/team/team.component';
import { TEAM_ROUTES } from "./pages/team/team.routes";
import { ClubComponent } from './pages/club/club.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AuthGuard } from './guards/auth.guard';
import { ADMIN_ROUTES } from "./pages/admin/admin.routes";
import { ContactComponent } from './pages/contact/contact.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'teams', component: TeamsComponent },
    { path: 'club', component: ClubComponent},
    { path: 'contact', component: ContactComponent},
    {    
        path: 'teams/team/:id', 
        component: TeamComponent,
        children: TEAM_ROUTES   
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: ADMIN_ROUTES
    },
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
