module.exports = {
  urls: [
    {
      href: "https://twinandchic.com",
      tags: ["home"]
    }
  ],
  providers: [
    {
      name: "datadog",
      options: {
        apiKey: process.env.DATADOG_API_KEY, // required
        appKey: process.env.DATADOG_APP_KEY, // required
        site: "datadoghq.eu", // default: datadoghq.com
        host: "twinandchic.com",
        prefix: "tc."
      }
    }
  ]
}