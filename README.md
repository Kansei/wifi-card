<!-- ![ci](https://github.com/bndw/wifi-card/workflows/ci/badge.svg) -->

# WiFi Qrcode

<img src="./public/images/main-visual.png">

https://wifi-qrcode.net

WiFiの共有をQRコードで簡単にできます。

<!-- ![wificard](https://user-images.githubusercontent.com/48166553/125853182-49fd361d-5797-4989-afbf-e6a617945be2.gif) -->

## Running locally

Run the official Docker image on http://localhost:8080

```
make run
```

## Development

1. Make sure you have `yarn` installed
2. Run the live-reload server on http://localhost:3000
   ```
   make dev
   ```

This project uses [Prettier](https://prettier.io/) formatting and all pull requests must pass
the automated lint checks prior to merging.

Run the lint check with:

```
make fmt
```

Rewrite the files to resolve any style issues with:

```
make fmt.write
```
