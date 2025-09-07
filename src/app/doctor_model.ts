export interface IDoctor{
  id:  string | null;
  lastName: string;
  firstName: string;
  middleName: string;
  speciality: string;
  category: string;
}

export class Doctor implements IDoctor{
  id: string | null;
  lastName: string;
  firstName: string;
  middleName: string;
  speciality: string;
  category: string;

  constructor(lastName: string, firstName: string, middleName: string | null, speciality: string, category: string) {
    this.id = null;
    this.lastName = lastName;
    this.firstName = firstName;
    if (middleName === null) {this.middleName=''}
    else {this.middleName = middleName;}
    this.speciality = speciality;
    this.category = category;

  }
}
