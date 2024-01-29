import { Subject } from 'rxjs'
import { webSocket } from 'rxjs/webSocket'

/** Observers the open event on the websocket. */
const open = new Subject()

/** Observes the close event on the websocket. */
const close = new Subject()

/** The websocket subject. */
const webSocketSubject = webSocket<string>({
  url: 'wss://echo.websocket.org',
  openObserver: open,
  closeObserver: close
})

/** Subscribe to open and close Observers. */
close.subscribe(console.log)
open.subscribe(console.log)

/** Subscribe to WebSocketSubject to open the connection. */
webSocketSubject.subscribe({
  next: console.log,
  error: (e) => console.error(e),
  complete: () => console.log('complete')
})

/** Send message. */
webSocketSubject.next('first')

/** After a few seconds close the WebSocket connection. */
window.setTimeout(() => {
  webSocketSubject.complete()
}, 2000)

export default webSocketSubject
