//salarie model
export interface Salarie {
  idSalary: number;
  nom: string;
  prénom: string;
  telFixe: number;
  telPortable: number;
  email: string;
  idServices: number;
  idSite: number;
  site: Site;
  service: Service;
}
//site model
export interface Site {
  villeID: number;
  ville: string;
}
//service model
export interface Service {
  idService: number;
  service: string;
}
