export class User {
  id!: string;
  username!: string;
  email!: string;
  password!: string;
  phone!: string;
  image!: string;
  fullname!: string;
  roles!: string[];
  groups!: string[];
}

export class Student extends User {
  status!: string;
  selected!: boolean;
  editMode!: boolean;
  previousStatus!: string;
}

export class Coach extends User {
  joinDate!: Date;
  cv!: string;
  selected!: boolean;
  editMode!: boolean;
  previousStatus!: string;
}
