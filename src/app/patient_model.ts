
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

  constructor(lastName: string, firstName: string, middleName: string, birthYear: number) {
    this.id = null;
    this.lastName = lastName;
    this.firstName = firstName;
    this.middleName = middleName;
    this.birthYear = birthYear;
  }
}
