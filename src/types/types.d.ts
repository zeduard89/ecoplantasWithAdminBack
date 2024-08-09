  export interface IAdmin {
    userName: string;
    lastName?: string;
    email?: string;
    password: string;
  }

  export interface IErrrorMessage {
    errorMessage?: string;
  }

  export interface IFilterResponse {
    errorMessage?: string;
    filterArray?:Array
  }

export  interface TokenPayload {
    tokenEmail: string;
    iat: number;
    exp: number;
}

export  interface IPlantas {
  id?:string;
  title: string;
  description: string;
  category:string,
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export  interface IMacetas {
  id?:string;
  title: string;
  description: string;
  category:string,
  boca:string;
  base:string;
  altura:string;
  peso:string;
  capacidad:string;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export  interface IMaceteros {
  id?:string;
  title: string;
  description: string;
  category:string,
  base:string;
  altura:string;
  largo:string;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export  interface IFilter {
  search:string,
  plantas:boolean,
  macetas:boolean,
  maceteros:boolean,
  filtrado:string,
}