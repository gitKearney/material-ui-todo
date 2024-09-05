const capture = (eventName: string, payload: any): void => {
  console.log(`eventName:${eventName}`);
  console.log(`payload: ${JSON.stringify(payload)}`);
}

const AnalyticsModule = {
  capture,
}

export { AnalyticsModule };