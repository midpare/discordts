export class School {
  public cityCode: string = ''
  public cityName: string = ''
  public schoolCode: string = ''
  public schoolName: string = ''
  public grade: string = ''
  public class: string = ''

  constructor(options: Partial<School>) {
    Object.assign(this, options)
  }
}