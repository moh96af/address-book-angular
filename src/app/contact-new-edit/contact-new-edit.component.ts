import {Component, Input, OnInit} from '@angular/core';
import {Contact} from '../contact';
import {Location} from '@angular/common';
import {ContactService} from '../contact.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-contact-new-edit',
  templateUrl: './contact-new-edit.component.html',
  styleUrls: ['./contact-new-edit.component.css', '../app.component.css']
})
export class ContactNewEditComponent implements OnInit {
  @Input() contact: Contact;

    constructor(
        private route: ActivatedRoute,
        private contactService: ContactService,
        private location: Location
    ) { }

  ngOnInit() {
    this.getContact();
  }

  cancel(): void {
    this.location.back();
  }

  update(): void {
    this.contactService.updateContact(this.contact)
      .subscribe(() => this.cancel());
  }

  getContact(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.contactService.getContact(id)
      .subscribe(contact => this.contact = contact);
  }

  // add(name: string): void {
  //   console.log(name);
  //   // name = name.trim();
  //   // if (!name) { return; }
  //   // this.contactService.addContact({ contact } as Contact)
  //   //   .subscribe(this.contact);
  // }
}
