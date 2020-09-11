interface BaseMonetizationEventDetail {
  paymentPointer: string
  requestId: string
}

export interface MonetizationPendingEvent extends CustomEvent<BaseMonetizationEventDetail> {
  type: 'monetizationpending'
}

export interface MonetizationStartEvent extends CustomEvent<BaseMonetizationEventDetail> {
  type: 'monetizationstart'
}

interface MonetizationStopEventDetail extends BaseMonetizationEventDetail {
  finalized: boolean
}

export interface MonetizationStopEvent extends CustomEvent<MonetizationStopEventDetail> {
  type: 'monetizationstop'
}

interface MonetizationProgressEventDetail extends BaseMonetizationEventDetail {
  amount: string
  assetCode: string
  assetScale: number
}

export interface MonetizationProgressEvent extends CustomEvent<MonetizationProgressEventDetail> {
  type: 'monetizationprogress'
}

export interface MonetizationEventMap {
  monetizationpending: MonetizationPendingEvent
  monetizationstart: MonetizationStartEvent
  monetizationstop: MonetizationStopEvent
  monetizationprogress: MonetizationProgressEvent
}

export type MonetizationEvent = MonetizationEventMap[keyof MonetizationEventMap]

export type MonetizationState = 'stopped' | 'pending' | 'started'

type EventListener<T, E extends Event = Event> = (this: T, evt: E) => any

interface EventListenerObject<T, E extends Event = Event> {
  handleEvent(this: T, evt: E): void
}

type EventListenerOrListenerObject<T, E extends Event = Event> =
  | EventListener<T, E>
  | EventListenerObject<T, E>

// Note: The Coil extension uses a <div> instead of an EventTarget
export interface Monetization extends EventTarget {
  state: MonetizationState

  addEventListener<K extends keyof MonetizationEventMap>(
    type: K,
    listener: EventListenerOrListenerObject<Monetization, MonetizationEventMap[K]> | null,
    options?: boolean | AddEventListenerOptions
  ): void

  removeEventListener<K extends keyof MonetizationEventMap>(
    type: K,
    listener: EventListenerOrListenerObject<Monetization, MonetizationEventMap[K]> | null,
    options?: boolean | EventListenerOptions
  ): void
}

declare global {
  interface Document {
    monetization?: Monetization
  }
}
