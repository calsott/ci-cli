module.exports = {
  urls: [
    "https://twinandchic.com"
  ],
  providers: [
    {
      name: "datadog",
      options: {
        site: "datadoghq.eu",
        host: "twinandchic.com",
        prefix: "tc"
      }
    }
  ]
}