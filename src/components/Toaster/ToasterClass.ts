import { emitter } from '../../main'
interface ToasterInterface {
  duration: number
  success(message: string): void
  error(message: string): void
}

export class ToasterClass implements ToasterInterface {
  duration = 4000
  /**
   * Success notification
   * @param message
   */
  success(message: string): void {
    const params = {
      message,
      variant: 'success',
      duration: this.duration,
    }
    emitter.emit('toaster', params)
  }

  /**
   * Error notification
   * @param error
   */
  error(error: any): void {
    const params = {
      message: error?.message || error,
      variant: 'danger',
      duration: this.duration,
    }
    emitter.emit('toaster', params)
  }
}
