export default class Utils {
  public static getClientUnixTIme() {
    return Math.round(+new Date() / 1000);
  }
}
