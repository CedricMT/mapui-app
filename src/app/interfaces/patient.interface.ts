export interface Patient {
    id: number;
    firstName: string;
    lastName: string;
    sex: string;
    age: string;
    drugs: Array<any>;
    treatments: Array<any>;
  }