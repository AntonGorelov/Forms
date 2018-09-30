export class UserModel {
  public name: {firstName: string, lastName: string};
  public nickname: string;
  public birthday: string;
  public address: string[];
  public phone: string;
  public email: string;
  public socNetworks: string[];
  public password: string;
  public confirmPassword: string;

  constructor(data: any = {}) {
    this.name = data.name || void 0;
    this.nickname = data.nickname || void 0;
    this.birthday = data.birthday || void 0;
    this.address = data.address || void 0;
    this.phone = data.phone || void 0;
    this.email = data.email || void 0;
    this.socNetworks = data.socNetworks || void 0;
    this.password = data.password || void 0;
    this.confirmPassword = data.confirmPassword || void 0;
  }
}
