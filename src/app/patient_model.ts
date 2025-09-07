
export interface IPatient{
id:  string | null;
lastName: string;
firstName: string;
middleName: string;
birthYear: number;
}

export class Patient implements IPatient{
  id: string | null;
  lastName: string;
  firstName: string;
  middleName: string;
  birthYear: number;

  constructor(lastName: string, firstName: string, middleName: string | null, birthYear: number) {
    this.id = null;
    this.lastName = lastName;
    this.firstName = firstName;
    if (middleName === null) {this.middleName=''}
    else {this.middleName = middleName;}
    this.birthYear = birthYear;
  }
}
