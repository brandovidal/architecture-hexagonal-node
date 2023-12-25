export class HealthCheck {
  status: boolean
  data: string

  constructor (status: boolean, data: string) {
    this.status = status
    this.data = data
  }
}
