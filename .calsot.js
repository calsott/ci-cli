module.exports = {
  urls: [
    "https://twinandchic.com"
  ],
  providers: [
    {
      name: "Datadog",
      options: {
        site: "datadoghq.eu",
        host: "twinandchic.com",
        prefix: "tc"
      }
    }
  ]
}