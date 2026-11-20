// AWS CloudWatch RUM web client: measures traffic to the main site.
// Optional: components/rum-script.tsx only injects it after the visitor accepts.
export const rumSnippet = `(function (n, i, v, r, s, c, u, x, z) {
  x = window.AwsRumClient = { q: [], n: n, i: i, v: v, r: r, c: c, u: u };
  window[n] = function (c, p) { x.q.push({ c: c, p: p }); };
  z = document.createElement('script');
  z.async = true;
  z.src = s;
  document.head.insertBefore(z, document.getElementsByTagName('script')[0]);
})(
  'cwr',
  '24d6e5f0-6ad4-4460-9038-a5681c63ac23',
  '1.0.0',
  'ap-southeast-2',
  'https://client.rum.us-east-1.amazonaws.com/3.x/cwr.js',
  {
    "sessionSampleRate": 1,
    "identityPoolId": "ap-southeast-2:dba2b7a6-5a81-4a49-8875-f5dcd5361ec9",
    "endpoint": "https://dataplane.rum.ap-southeast-2.amazonaws.com",
    "telemetries": ["errors", "performance", "http"],
    "allowCookies": true
  }
);`;
