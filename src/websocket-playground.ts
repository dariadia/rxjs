import { webSocket } from 'rxjs/webSocket'

/**
 * 1. Create a new WebSocketSubject using the webSocket operator,
 *    and set the url to `wss://echo.websocket.org`
 */
const webSocketSubject = webSocket<string>('wss://echo.websocket.org')

/**
 * 2. Send a message prior to opening the connection (subscribing).
 */
webSocketSubject.next('first')

/**
 * 3. Subscribe to the WebSocketSubject.
 */
webSocketSubject.subscribe({
  next: (value) => console.log(value),
  error: (e) => console.error(e),
  complete: () => console.log('complete')
})

/**
 * 4. Send additional messages after opening the connection.
 */
webSocketSubject.next('second')
webSocketSubject.next('third')

export default webSocketSubject
