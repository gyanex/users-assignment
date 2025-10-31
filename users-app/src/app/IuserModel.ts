export interface IuserModel {
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
  company: Company;
  address: Address;
}

interface Company {
  bs: string;
  catchPhrase: string;
  name: string;
}

interface Address {
  city: string;
  geo: { lat: string; lng: string };
  street: string;
  suite: string;
  zipcode: string;
}
