import { webSocket } from 'rxjs/webSocket'

// WebSocket connections are ideal for streaming data in real-time.
// The WebSocketSubject enables us to communicate with the WebSocket:
// An attempt to open a connection occurs ON subscribing to the WebSocketSubject UNLESS a connection is already open. 
// Additional Observers to the WebSocketSubject instance will result in a multicast of notifications from the single connection.
// The connection is closed when the number of Observers goes from 1 to 0.
// All Observers receive a next notification for messages received from the server. By default, messages are deserialized via JSON.parse().
// All Observers receive a complete notification when the connection is closed.
// All Observers receive an error notification when an error occurs.

// WITH SERVER
// Emitting a next notification using the next() method on the WebSocketSubject instance sends a message to the SERVER.
// Emitting a complete notification using the complete() method on the WebSocketSubject instance will CLOSE the connection.
// Emitting an error notification using the error() method on the WebSocketSubject instance will close the connection and send the status code to the server.

// The WebSocketSubject also provides the ability for multiplexing. This involves emulating multiple separate WebSocket connections through a single connection to improve performance.

/** Create a new WebSocketSubject using the webSocket operator. */
const webSocketSubject = webSocket<string>('wss://echo.websocket.org')

/** Send a message prior to opening the connection (subscribing). */
webSocketSubject.next('first')

/** Subscribe to the WebSocketSubject. */
webSocketSubject.subscribe({
  error: e => console.error(e),
  next: console.log,
  complete: () => console.log('complete')
})

/** Send additional messages after opening the connection. */
webSocketSubject.next('second')
webSocketSubject.next('third')

/** After a few seconds close the WebSocket connection. */
window.setTimeout(() => {
  webSocketSubject.complete()
}, 2000)
