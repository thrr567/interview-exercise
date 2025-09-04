import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime, delay, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { AsyncPipe } from '@angular/common';
import { MockService } from './mock.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
})
export class AddressComponent {
  private fb = inject(FormBuilder);
  private stateService = inject(MockService);
  addressForm = this.fb.group({
    company: null,
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    address2: null,
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [
      null,
      Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
    ],
    shipping: ['free', Validators.required],
  });

  hasUnitNumber = false;

  states = this.stateService.states$;

  constructor() {
    this.addressForm.valueChanges
      .pipe(
        debounceTime(300),
        mergeMap((data) => this.stateService.saveFormData(data))
      )
      .subscribe((result) => {
        this.addressForm.patchValue(result, { emitEvent: false });
      });
  }
}
