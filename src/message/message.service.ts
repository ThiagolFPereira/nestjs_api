import { Injectable } from '@nestjs/common'

@Injectable()
export class MessageService {
  send(message: any): void {
    console.log(`Message sent to RabbitMQ: ${JSON.stringify(message)}`)
  }
}
