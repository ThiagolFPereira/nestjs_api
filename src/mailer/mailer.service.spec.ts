import { MailerService } from './mailer.service'

describe('MailerService', () => {
  let mailerService: MailerService

  beforeEach(() => {
    mailerService = new MailerService()
  })

  it('should add a log entry when sending mail', async () => {
    const to = 'test@example.com'
    const subject = 'Test email'
    const body = 'This is a test email'

    await mailerService.sendMail(to, subject, body)

    expect(mailerService['log']).toHaveLength(1)
    expect(mailerService['log'][0]).toMatchObject({ to, subject, body })
  })
})
