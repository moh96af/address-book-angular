import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContactsComponent} from './contacts/contacts.component';
import {ContactDetailComponent} from './contact-detail/contact-detail.component';
import {ContactNewEditComponent} from './contact-new-edit/contact-new-edit.component';

const routes: Routes = [
    { path: '', redirectTo: '/contacts', pathMatch: 'full' },
    { path: 'contacts', component: ContactsComponent },
    { path: 'contact/:id', component: ContactDetailComponent },
    { path: 'contact/new-edit/:id', component: ContactNewEditComponent },

];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
