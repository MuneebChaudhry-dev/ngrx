import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as customerActions from '../state/customer.action';
import * as fromCustomer from '../state/customer.reducer';
import { Customer } from '../customer.model';
@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css'],
})
export class CustomerEditComponent implements OnInit {
  customerForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private store: Store<fromCustomer.AppState>
  ) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      membership: ['', Validators.required],
    });

    const customer$: Observable<any> = this.store.select(
      fromCustomer.getCurrentCustomer
    );

    customer$.subscribe((currentCustomer) => {
      if (currentCustomer) {
        this.customerForm.patchValue({
          name: currentCustomer.name,
          phone: currentCustomer.phone,
          address: currentCustomer.address,
          membership: currentCustomer.membership,
          id: currentCustomer.id,
        });
      }
    });
  }
  updateCustomer() {
    const updatedCustomer: Customer = {
      name: this.customerForm.get('name')?.value,
      phone: this.customerForm.get('phone')?.value,
      address: this.customerForm.get('address')?.value,
      membership: this.customerForm.get('membership')?.value,
      id: this.customerForm.get('id')?.value,
    };

    this.store.dispatch(new customerActions.UpdateCustomer(updatedCustomer));
  }
}
