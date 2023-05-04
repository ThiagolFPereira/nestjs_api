import { Injectable } from '@nestjs/common'

@Injectable()
export class MailerService {
  private log: { to: string; subject: string; body: string }[] = []

  sendMail(to: string, subject: string, body: string): Promise<any> {
    this.log.push({ to, subject, body })
    return Promise.resolve()
  }
}
