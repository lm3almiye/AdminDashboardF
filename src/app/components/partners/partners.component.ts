import { Component, ViewEncapsulation } from '@angular/core';
import { PartnersService } from '../../service/partners.service';
import { Partner, RepresentantEntreprise, UploadResponse } from '../../../types';
import { FilterMatchMode, PrimeNGConfig } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { response } from 'express';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.scss'
})
export class PartnersComponent {
  visible: boolean = false;
  partners: RepresentantEntreprise[]=[];
  partnerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    domainName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    
  });
  constructor(private partnersService: PartnersService, private primengConfig:PrimeNGConfig){
    this.primengConfig.csp.set({nonce: '...'});
  }
  logoUrl: string = '';

  onUpload(event: any) {
    const response = event.originalEvent.body as UploadResponse;
  // Now TypeScript knows that 'response' has a 'path' property
    this.logoUrl = response.path ? `http://localhost:5287${response.path}` : '';
    console.log(this.logoUrl);
  }

  ngOnInit(){
    this.primengConfig.ripple = true;
    this.primengConfig.zIndex = {
      modal: 1100,    // dialog, sidebar
      overlay: 1000,  // dropdown, overlaypanel
      menu: 1000,     // overlay menus
      tooltip: 1100   // tooltip
  };
    this.partnersService.getPartners().subscribe(partners => {this.partners=partners;
      console.log(partners);
    });
  }
  showDialog()
  {
    this.visible = true;
  }
  createPartner(){
    const newPartner: Partner = {
      username: this.partnerForm.value.name!,
      password: this.partnerForm.value.password!,
      email: this.partnerForm.value.email!,
      phoneNumber: '22222222', 
      logoURL: this.logoUrl,
      companyName: this.partnerForm.value.name!,
      location: this.partnerForm.value.location!,
      domainName: this.partnerForm.value.domainName!,
      type: this.partnerForm.value.type!,
    };
    
    this.partnersService.add(newPartner).subscribe({
      next: () => {
        this.partnersService.getPartners().subscribe(partners => {
          this.partners = partners;
          console.log(partners);
        });
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.error('Error:', errorResponse.error.errors);
        // Optionally display the errors to the user or handle them as needed
      }
    });
    this.visible = false;
  }
  delete(id: number){
    this.partnersService.removeById(environment.apiUrl, id).subscribe(() => {
      this.partnersService.getPartners().subscribe(partners => {
        this.partners = partners;
        });
        });
  }
}
