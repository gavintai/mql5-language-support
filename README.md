# MQL5 Language Support

#### [Repository](https://github.com/gavintai/mql5-language-support)&nbsp;&nbsp;|&nbsp;&nbsp;[Issues](https://github.com/gavintai/mql5-language-support/issues)


VS Code extension for MQL5 (MetaQuotes Language 5) — the C++-based language used in MetaTrader 5 for Expert Advisors, indicators, and scripts.

## Features

- **Syntax highlighting** — keywords, types, preprocessor directives, event handlers, built-in functions and constants
- **IntelliSense** — completions for ~80 built-in functions, 50+ constants, 16 primitive types, predefined variables, and event handler templates
- **Hover documentation** — full signature and description on hover for any built-in symbol
- **Diagnostics** — warns on wrong event handler signatures; hints on possible missing semicolons
- **Snippets** — Expert Advisor, Indicator, Script, trade request, for-loop, and `#property` block templates

## Supported File Types

| Extension | Type |
|-----------|------|
| `.mq5` | Expert Advisor, Indicator, or Script source |
| `.mqh` | Include file (header) |

## Snippets

| Prefix | Expands to |
|--------|------------|
| `ea` | Expert Advisor skeleton (OnInit, OnDeinit, OnTick) |
| `indicator` | Indicator skeleton (SetIndexBuffer, OnCalculate) |
| `script` | Script skeleton (OnStart) |
| `tradereq` | MqlTradeRequest + OrderSend pattern |
| `for` | For loop |
| `prop` | `#property` block |

## Installation

Install from the VS Code Marketplace, or manually:

```bash
code --install-extension mql5-language-support-0.1.0.vsix
```

## Requirements

VS Code 1.85.0 or later.

## License

MIT
