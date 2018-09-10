import {Component, OnInit} from '@angular/core';
import {Contact} from '../contact';
import {Location} from '@angular/common';
import {ContactService} from '../contact.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact-new-edit',
  templateUrl: './contact-new-edit.component.html',
  styleUrls: ['./contact-new-edit.component.css', '../app.component.css']
})
export class ContactNewEditComponent implements OnInit {
  contact: Contact;
  addForm: FormGroup;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private location: Location,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.getContact();
    this.createForm();
  }

  cancel(): void {
    this.location.back();
  }

  update(): void {
    this.contactService.updateContact(this.addForm.value, this.contact.id)
      .subscribe(() => this.cancel());
  }

  getContact(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.contactService.getContact(id)
      .subscribe(contact => this.updateForm(contact));
  }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.addForm.invalid) {
          return;
      }

      if (this.contact.id) {
      this.update();
    } else {
      this.addContact();
    }
  }

  createForm(){
      this.addForm = this.formBuilder.group({
          lastName: ['', Validators.required],
          firstName: ['', Validators.required],
          phone: ['', [Validators.required]],
          email: ['', [Validators.required, Validators.email]]
      });
  }

  updateForm(contact: Contact) {
    this.contact = contact;
      if (this.contact.id) {
        this.addForm.setValue({
          firstName: contact.firstName,
          lastName: contact.lastName,
          phone: contact.phone,
          email: contact.email
        });
      }
  }

  addContact() {
      this.contactService.addContact(this.addForm.value)
        .subscribe(() => this.cancel());
  }

  get f() { return this.addForm.controls; }

}
