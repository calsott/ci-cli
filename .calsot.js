module.exports = {
  urls: [
    {
      href: "https://twinandchic.com",
      name: "home" // in snake_case
    }
  ],
  providers: [
    {
      name: "datadog",
      options: {
        apiKey: process.env.DATADOG_API_KEY,
        appKey: process.env.DATADOG_APP_KEY,
        site: "datadoghq.eu",
        host: "twinandchic.com",
        prefix: "tc."
      }
    }
  ]
}