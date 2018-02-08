export interface IProfile {
  address: string,
  authorizetype: number,
  email: string,
  fax: string,
  fullname: string,
  id: number,
  mobile: string,
  name: string,
  phone: string,
  photo: string,
  rememberKey: string,
  title: number,
  zip: string
}


export interface IMenu {
  isParent: boolean,
  children?: IMenu[],
  description: string,
  id: number,
  isPublic: number,
  name: string,
  pageType: number,
  sort: number,
  target: string,
  url: string | null,
  originalUrl: string | null,
  iconUrl: string
}

export interface IPlatform {
  "company":{
    "code": string,
    "id": number,
    "name": string
  },
  "fullname":string,
  "id":number,
  "name": string,
  "orginalPassword": string
}