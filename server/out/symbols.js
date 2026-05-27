"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MQL5_PREDEFINED_VARS = exports.MQL5_CONSTANTS = exports.MQL5_FUNCTIONS = exports.MQL5_EVENT_HANDLERS = exports.MQL5_KEYWORDS = exports.MQL5_TYPES = void 0;
exports.buildCompletionItems = buildCompletionItems;
exports.findSymbol = findSymbol;
const node_1 = require("vscode-languageserver/node");
exports.MQL5_TYPES = [
    'void', 'bool', 'char', 'uchar', 'short', 'ushort',
    'int', 'uint', 'long', 'ulong', 'float', 'double',
    'string', 'datetime', 'color', 'object',
];
exports.MQL5_KEYWORDS = [
    'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'default',
    'break', 'continue', 'return', 'new', 'delete', 'sizeof', 'this',
    'class', 'struct', 'interface', 'enum', 'template',
    'public', 'private', 'protected', 'static', 'const', 'extern',
    'input', 'sinput', 'virtual', 'override', 'final',
    'true', 'false', 'NULL', 'INVALID_HANDLE', 'WHOLE_ARRAY', 'EMPTY_VALUE',
];
exports.MQL5_EVENT_HANDLERS = [
    { name: 'OnInit', kind: node_1.CompletionItemKind.Function, detail: 'int OnInit()', documentation: 'Called on expert/indicator initialization. Return INIT_SUCCEEDED or INIT_FAILED.' },
    { name: 'OnDeinit', kind: node_1.CompletionItemKind.Function, detail: 'void OnDeinit(const int reason)', documentation: 'Called on expert/indicator deinitialization. reason = DEINIT_REASON_*.' },
    { name: 'OnTick', kind: node_1.CompletionItemKind.Function, detail: 'void OnTick()', documentation: 'Called on each new price tick. Expert Advisors only.' },
    { name: 'OnStart', kind: node_1.CompletionItemKind.Function, detail: 'void OnStart()', documentation: 'Script entry point. Called once when script runs.' },
    { name: 'OnCalculate', kind: node_1.CompletionItemKind.Function, detail: 'int OnCalculate(const int rates_total, const int prev_calculated, const datetime &time[], ...)', documentation: 'Custom indicator calculation function. Return rates_total on success.' },
    { name: 'OnTimer', kind: node_1.CompletionItemKind.Function, detail: 'void OnTimer()', documentation: 'Called by timer set with EventSetTimer().' },
    { name: 'OnTrade', kind: node_1.CompletionItemKind.Function, detail: 'void OnTrade()', documentation: 'Called when trading environment changes (order/position/deal).' },
    { name: 'OnTradeTransaction', kind: node_1.CompletionItemKind.Function, detail: 'void OnTradeTransaction(const MqlTradeTransaction &trans, const MqlTradeRequest &request, const MqlTradeResult &result)', documentation: 'Called on each trade transaction.' },
    { name: 'OnBookEvent', kind: node_1.CompletionItemKind.Function, detail: 'void OnBookEvent(const string &symbol)', documentation: 'Called on Market Depth change. Requires MarketBookAdd().' },
    { name: 'OnChartEvent', kind: node_1.CompletionItemKind.Function, detail: 'void OnChartEvent(const int id, const long &lparam, const double &dparam, const string &sparam)', documentation: 'Called on chart events (mouse, keyboard, custom).' },
    { name: 'OnTester', kind: node_1.CompletionItemKind.Function, detail: 'double OnTester()', documentation: 'Called after backtesting. Return custom optimization criterion.' },
    { name: 'OnTesterInit', kind: node_1.CompletionItemKind.Function, detail: 'int OnTesterInit()', documentation: 'Called before optimization in Strategy Tester.' },
    { name: 'OnTesterDeinit', kind: node_1.CompletionItemKind.Function, detail: 'void OnTesterDeinit()', documentation: 'Called after optimization in Strategy Tester.' },
    { name: 'OnTesterPass', kind: node_1.CompletionItemKind.Function, detail: 'void OnTesterPass()', documentation: 'Called when optimization pass results arrive.' },
];
exports.MQL5_FUNCTIONS = [
    // Trading
    { name: 'OrderSend', kind: node_1.CompletionItemKind.Function, detail: 'bool OrderSend(MqlTradeRequest &request, MqlTradeResult &result)', documentation: 'Sends a trade request. Returns true on success. Check result.retcode for TRADE_RETCODE_DONE.' },
    { name: 'OrderSendAsync', kind: node_1.CompletionItemKind.Function, detail: 'bool OrderSendAsync(MqlTradeRequest &request, MqlTradeResult &result)', documentation: 'Asynchronous version of OrderSend. result.request_id identifies the async request.' },
    { name: 'OrderCheck', kind: node_1.CompletionItemKind.Function, detail: 'bool OrderCheck(MqlTradeRequest &request, MqlTradeCheckResult &result)', documentation: 'Checks if there are enough funds to execute a trade. Does not send the order.' },
    { name: 'OrderCalcMargin', kind: node_1.CompletionItemKind.Function, detail: 'bool OrderCalcMargin(ENUM_ORDER_TYPE action, string symbol, double volume, double price, double &margin)', documentation: 'Returns required margin for a trade operation in the account currency.' },
    { name: 'OrderCalcProfit', kind: node_1.CompletionItemKind.Function, detail: 'bool OrderCalcProfit(ENUM_ORDER_TYPE action, string symbol, double volume, double price_open, double price_close, double &profit)', documentation: 'Returns profit for a given trade operation in the account currency.' },
    { name: 'PositionsTotal', kind: node_1.CompletionItemKind.Function, detail: 'int PositionsTotal()', documentation: 'Returns number of open positions.' },
    { name: 'PositionGetSymbol', kind: node_1.CompletionItemKind.Function, detail: 'string PositionGetSymbol(int index)', documentation: 'Returns symbol of position at index.' },
    { name: 'PositionSelect', kind: node_1.CompletionItemKind.Function, detail: 'bool PositionSelect(string symbol)', documentation: 'Selects open position by symbol for further access via PositionGet*.' },
    { name: 'PositionSelectByTicket', kind: node_1.CompletionItemKind.Function, detail: 'bool PositionSelectByTicket(ulong ticket)', documentation: 'Selects open position by ticket number.' },
    { name: 'PositionGetDouble', kind: node_1.CompletionItemKind.Function, detail: 'double PositionGetDouble(ENUM_POSITION_PROPERTY_DOUBLE property_id)', documentation: 'Returns double property of selected position (POSITION_VOLUME, POSITION_PRICE_OPEN, POSITION_SL, POSITION_TP, etc.).' },
    { name: 'PositionGetInteger', kind: node_1.CompletionItemKind.Function, detail: 'long PositionGetInteger(ENUM_POSITION_PROPERTY_INTEGER property_id)', documentation: 'Returns integer property of selected position (POSITION_TYPE, POSITION_MAGIC, POSITION_TICKET, etc.).' },
    { name: 'PositionGetString', kind: node_1.CompletionItemKind.Function, detail: 'string PositionGetString(ENUM_POSITION_PROPERTY_STRING property_id)', documentation: 'Returns string property of selected position (POSITION_SYMBOL, POSITION_COMMENT).' },
    { name: 'OrdersTotal', kind: node_1.CompletionItemKind.Function, detail: 'int OrdersTotal()', documentation: 'Returns number of pending orders.' },
    { name: 'OrderSelect', kind: node_1.CompletionItemKind.Function, detail: 'bool OrderSelect(ulong ticket)', documentation: 'Selects pending order by ticket for further access via OrderGet*.' },
    { name: 'OrderGetDouble', kind: node_1.CompletionItemKind.Function, detail: 'double OrderGetDouble(ENUM_ORDER_PROPERTY_DOUBLE property_id)', documentation: 'Returns double property of selected order.' },
    { name: 'OrderGetInteger', kind: node_1.CompletionItemKind.Function, detail: 'long OrderGetInteger(ENUM_ORDER_PROPERTY_INTEGER property_id)', documentation: 'Returns integer property of selected order.' },
    { name: 'OrderGetString', kind: node_1.CompletionItemKind.Function, detail: 'string OrderGetString(ENUM_ORDER_PROPERTY_STRING property_id)', documentation: 'Returns string property of selected order.' },
    { name: 'HistorySelect', kind: node_1.CompletionItemKind.Function, detail: 'bool HistorySelect(datetime from_date, datetime to_date)', documentation: 'Retrieves history of deals and orders for specified period.' },
    { name: 'HistoryDealsTotal', kind: node_1.CompletionItemKind.Function, detail: 'int HistoryDealsTotal()', documentation: 'Returns number of deals in selected history.' },
    { name: 'HistoryDealGetTicket', kind: node_1.CompletionItemKind.Function, detail: 'ulong HistoryDealGetTicket(int index)', documentation: 'Returns ticket of history deal at index.' },
    { name: 'HistoryDealGetDouble', kind: node_1.CompletionItemKind.Function, detail: 'double HistoryDealGetDouble(ulong ticket_number, ENUM_DEAL_PROPERTY_DOUBLE property_id)', documentation: 'Returns double property of history deal.' },
    { name: 'HistoryDealGetInteger', kind: node_1.CompletionItemKind.Function, detail: 'long HistoryDealGetInteger(ulong ticket_number, ENUM_DEAL_PROPERTY_INTEGER property_id)', documentation: 'Returns integer property of history deal.' },
    { name: 'HistoryDealGetString', kind: node_1.CompletionItemKind.Function, detail: 'string HistoryDealGetString(ulong ticket_number, ENUM_DEAL_PROPERTY_STRING property_id)', documentation: 'Returns string property of history deal.' },
    // Market info
    { name: 'SymbolInfoDouble', kind: node_1.CompletionItemKind.Function, detail: 'double SymbolInfoDouble(string name, ENUM_SYMBOL_INFO_DOUBLE prop_id)', documentation: 'Returns double property of symbol. Common props: SYMBOL_ASK, SYMBOL_BID, SYMBOL_POINT, SYMBOL_TRADE_CONTRACT_SIZE.' },
    { name: 'SymbolInfoInteger', kind: node_1.CompletionItemKind.Function, detail: 'long SymbolInfoInteger(string name, ENUM_SYMBOL_INFO_INTEGER prop_id)', documentation: 'Returns integer property of symbol. Common props: SYMBOL_DIGITS, SYMBOL_SPREAD, SYMBOL_TRADE_STOPS_LEVEL.' },
    { name: 'SymbolInfoString', kind: node_1.CompletionItemKind.Function, detail: 'string SymbolInfoString(string name, ENUM_SYMBOL_INFO_STRING prop_id)', documentation: 'Returns string property of symbol. Common props: SYMBOL_DESCRIPTION, SYMBOL_CURRENCY_BASE.' },
    { name: 'SymbolInfoTick', kind: node_1.CompletionItemKind.Function, detail: 'bool SymbolInfoTick(string symbol, MqlTick &tick)', documentation: 'Returns current prices for specified symbol into MqlTick structure.' },
    { name: 'SymbolSelect', kind: node_1.CompletionItemKind.Function, detail: 'bool SymbolSelect(string name, bool select)', documentation: 'Selects or removes a symbol from the Market Watch window.' },
    { name: 'SymbolsTotal', kind: node_1.CompletionItemKind.Function, detail: 'int SymbolsTotal(bool selected)', documentation: 'Returns number of symbols. selected=true: Market Watch symbols only.' },
    { name: 'SymbolName', kind: node_1.CompletionItemKind.Function, detail: 'string SymbolName(int pos, bool selected)', documentation: 'Returns symbol name by index.' },
    // Rates
    { name: 'CopyRates', kind: node_1.CompletionItemKind.Function, detail: 'int CopyRates(string symbol, ENUM_TIMEFRAMES timeframe, int start_pos, int count, MqlRates &rates_array[])', documentation: 'Copies OHLCV data into MqlRates array. Returns number of copied elements or -1 on error.' },
    { name: 'CopyTime', kind: node_1.CompletionItemKind.Function, detail: 'int CopyTime(string symbol, ENUM_TIMEFRAMES timeframe, int start_pos, int count, datetime &time_array[])', documentation: 'Copies bar open times.' },
    { name: 'CopyOpen', kind: node_1.CompletionItemKind.Function, detail: 'int CopyOpen(string symbol, ENUM_TIMEFRAMES timeframe, int start_pos, int count, double &open_array[])', documentation: 'Copies bar open prices.' },
    { name: 'CopyHigh', kind: node_1.CompletionItemKind.Function, detail: 'int CopyHigh(string symbol, ENUM_TIMEFRAMES timeframe, int start_pos, int count, double &high_array[])', documentation: 'Copies bar high prices.' },
    { name: 'CopyLow', kind: node_1.CompletionItemKind.Function, detail: 'int CopyLow(string symbol, ENUM_TIMEFRAMES timeframe, int start_pos, int count, double &low_array[])', documentation: 'Copies bar low prices.' },
    { name: 'CopyClose', kind: node_1.CompletionItemKind.Function, detail: 'int CopyClose(string symbol, ENUM_TIMEFRAMES timeframe, int start_pos, int count, double &close_array[])', documentation: 'Copies bar close prices.' },
    { name: 'CopyTickVolume', kind: node_1.CompletionItemKind.Function, detail: 'int CopyTickVolume(string symbol, ENUM_TIMEFRAMES timeframe, int start_pos, int count, long &volume_array[])', documentation: 'Copies bar tick volumes.' },
    { name: 'CopyTicks', kind: node_1.CompletionItemKind.Function, detail: 'int CopyTicks(string symbol, MqlTick &ticks_array[], uint flags, ulong from, uint count)', documentation: 'Copies tick history into MqlTick array.' },
    // Indicators
    { name: 'IndicatorCreate', kind: node_1.CompletionItemKind.Function, detail: 'int IndicatorCreate(string symbol, ENUM_TIMEFRAMES period, ENUM_INDICATOR indicator_type, int parameters_cnt, MqlParam &parameters_array[])', documentation: 'Creates indicator handle for use with CopyBuffer.' },
    { name: 'IndicatorRelease', kind: node_1.CompletionItemKind.Function, detail: 'bool IndicatorRelease(int indicator_handle)', documentation: 'Releases indicator handle and associated memory.' },
    { name: 'iMA', kind: node_1.CompletionItemKind.Function, detail: 'int iMA(string symbol, ENUM_TIMEFRAMES period, int ma_period, int ma_shift, ENUM_MA_METHOD ma_method, ENUM_APPLIED_PRICE applied_price)', documentation: 'Creates Moving Average indicator handle.' },
    { name: 'iRSI', kind: node_1.CompletionItemKind.Function, detail: 'int iRSI(string symbol, ENUM_TIMEFRAMES period, int ma_period, ENUM_APPLIED_PRICE applied_price)', documentation: 'Creates RSI indicator handle.' },
    { name: 'iMACD', kind: node_1.CompletionItemKind.Function, detail: 'int iMACD(string symbol, ENUM_TIMEFRAMES period, int fast_ema_period, int slow_ema_period, int signal_period, ENUM_APPLIED_PRICE applied_price)', documentation: 'Creates MACD indicator handle. Buffer 0=MACD line, Buffer 1=signal line.' },
    { name: 'iBands', kind: node_1.CompletionItemKind.Function, detail: 'int iBands(string symbol, ENUM_TIMEFRAMES period, int bands_period, int bands_shift, double deviation, ENUM_APPLIED_PRICE applied_price)', documentation: 'Creates Bollinger Bands handle. Buffer 0=middle, 1=upper, 2=lower.' },
    { name: 'iATR', kind: node_1.CompletionItemKind.Function, detail: 'int iATR(string symbol, ENUM_TIMEFRAMES period, int ma_period)', documentation: 'Creates Average True Range indicator handle.' },
    { name: 'iStochastic', kind: node_1.CompletionItemKind.Function, detail: 'int iStochastic(string symbol, ENUM_TIMEFRAMES period, int Kperiod, int Dperiod, int slowing, ENUM_MA_METHOD ma_method, ENUM_STO_PRICE price_field)', documentation: 'Creates Stochastic Oscillator handle.' },
    { name: 'iCCI', kind: node_1.CompletionItemKind.Function, detail: 'int iCCI(string symbol, ENUM_TIMEFRAMES period, int ma_period, ENUM_APPLIED_PRICE applied_price)', documentation: 'Creates Commodity Channel Index handle.' },
    { name: 'iADX', kind: node_1.CompletionItemKind.Function, detail: 'int iADX(string symbol, ENUM_TIMEFRAMES period, int adx_period)', documentation: 'Creates Average Directional Index handle.' },
    { name: 'iCustom', kind: node_1.CompletionItemKind.Function, detail: 'int iCustom(string symbol, ENUM_TIMEFRAMES period, string name, ...)', documentation: 'Creates handle for a custom indicator by name.' },
    { name: 'SetIndexBuffer', kind: node_1.CompletionItemKind.Function, detail: 'bool SetIndexBuffer(int index, double &buffer[], ENUM_INDEXBUFFER_TYPE data_type)', documentation: 'Assigns indicator buffer array to plot index.' },
    { name: 'PlotIndexSetDouble', kind: node_1.CompletionItemKind.Function, detail: 'bool PlotIndexSetDouble(int plot_index, ENUM_PLOT_PROPERTY_DOUBLE prop_id, double prop_value)', documentation: 'Sets double property for indicator plot.' },
    { name: 'PlotIndexSetInteger', kind: node_1.CompletionItemKind.Function, detail: 'bool PlotIndexSetInteger(int plot_index, ENUM_PLOT_PROPERTY_INTEGER prop_id, int prop_value)', documentation: 'Sets integer property for indicator plot.' },
    { name: 'PlotIndexSetString', kind: node_1.CompletionItemKind.Function, detail: 'bool PlotIndexSetString(int plot_index, ENUM_PLOT_PROPERTY_STRING prop_id, string prop_value)', documentation: 'Sets string property for indicator plot.' },
    { name: 'IndicatorSetDouble', kind: node_1.CompletionItemKind.Function, detail: 'bool IndicatorSetDouble(ENUM_CUSTOMIND_PROPERTY_DOUBLE prop_id, double prop_value)', documentation: 'Sets double property for current indicator.' },
    { name: 'IndicatorSetInteger', kind: node_1.CompletionItemKind.Function, detail: 'bool IndicatorSetInteger(ENUM_CUSTOMIND_PROPERTY_INTEGER prop_id, int prop_value)', documentation: 'Sets integer property for current indicator (e.g., INDICATOR_DIGITS, INDICATOR_LEVELS).' },
    { name: 'IndicatorSetString', kind: node_1.CompletionItemKind.Function, detail: 'bool IndicatorSetString(ENUM_CUSTOMIND_PROPERTY_STRING prop_id, string prop_value)', documentation: 'Sets string property for current indicator (e.g., INDICATOR_SHORTNAME).' },
    { name: 'IndicatorShortName', kind: node_1.CompletionItemKind.Function, detail: 'bool IndicatorShortName(string name)', documentation: 'Sets short indicator name displayed in data window and chart. Deprecated — use IndicatorSetString(INDICATOR_SHORTNAME, name).' },
    // Account
    { name: 'AccountInfoDouble', kind: node_1.CompletionItemKind.Function, detail: 'double AccountInfoDouble(ENUM_ACCOUNT_INFO_DOUBLE property_id)', documentation: 'Returns account double property. Common: ACCOUNT_BALANCE, ACCOUNT_EQUITY, ACCOUNT_MARGIN, ACCOUNT_MARGIN_FREE, ACCOUNT_PROFIT.' },
    { name: 'AccountInfoInteger', kind: node_1.CompletionItemKind.Function, detail: 'long AccountInfoInteger(ENUM_ACCOUNT_INFO_INTEGER property_id)', documentation: 'Returns account integer property. Common: ACCOUNT_LOGIN, ACCOUNT_LEVERAGE, ACCOUNT_LIMIT_ORDERS.' },
    { name: 'AccountInfoString', kind: node_1.CompletionItemKind.Function, detail: 'string AccountInfoString(ENUM_ACCOUNT_INFO_STRING property_id)', documentation: 'Returns account string property. Common: ACCOUNT_NAME, ACCOUNT_COMPANY, ACCOUNT_CURRENCY, ACCOUNT_SERVER.' },
    // Time
    { name: 'TimeCurrent', kind: node_1.CompletionItemKind.Function, detail: 'datetime TimeCurrent()', documentation: 'Returns current server time as datetime (last known tick time).' },
    { name: 'TimeLocal', kind: node_1.CompletionItemKind.Function, detail: 'datetime TimeLocal()', documentation: 'Returns local computer time as datetime.' },
    { name: 'TimeGMT', kind: node_1.CompletionItemKind.Function, detail: 'datetime TimeGMT()', documentation: 'Returns current GMT time as datetime.' },
    { name: 'TimeTradeServer', kind: node_1.CompletionItemKind.Function, detail: 'datetime TimeTradeServer()', documentation: 'Returns trade server time as datetime.' },
    // Math
    { name: 'MathAbs', kind: node_1.CompletionItemKind.Function, detail: 'double MathAbs(double value)', documentation: 'Returns absolute value.' },
    { name: 'MathMax', kind: node_1.CompletionItemKind.Function, detail: 'double MathMax(double value1, double value2)', documentation: 'Returns the larger of two values.' },
    { name: 'MathMin', kind: node_1.CompletionItemKind.Function, detail: 'double MathMin(double value1, double value2)', documentation: 'Returns the smaller of two values.' },
    { name: 'MathRound', kind: node_1.CompletionItemKind.Function, detail: 'double MathRound(double value)', documentation: 'Rounds to nearest integer.' },
    { name: 'MathFloor', kind: node_1.CompletionItemKind.Function, detail: 'double MathFloor(double value)', documentation: 'Rounds down to nearest integer.' },
    { name: 'MathCeil', kind: node_1.CompletionItemKind.Function, detail: 'double MathCeil(double value)', documentation: 'Rounds up to nearest integer.' },
    { name: 'MathSqrt', kind: node_1.CompletionItemKind.Function, detail: 'double MathSqrt(double value)', documentation: 'Returns square root.' },
    { name: 'MathPow', kind: node_1.CompletionItemKind.Function, detail: 'double MathPow(double base, double exponent)', documentation: 'Returns base raised to exponent.' },
    { name: 'MathLog', kind: node_1.CompletionItemKind.Function, detail: 'double MathLog(double value)', documentation: 'Returns natural logarithm.' },
    { name: 'MathExp', kind: node_1.CompletionItemKind.Function, detail: 'double MathExp(double value)', documentation: 'Returns e raised to value.' },
    { name: 'MathRand', kind: node_1.CompletionItemKind.Function, detail: 'int MathRand()', documentation: 'Returns pseudorandom integer 0..32767. Seed with MathSrand.' },
    { name: 'MathSrand', kind: node_1.CompletionItemKind.Function, detail: 'void MathSrand(int seed)', documentation: 'Seeds random number generator. Often: MathSrand(GetTickCount()).' },
    // String
    { name: 'StringLen', kind: node_1.CompletionItemKind.Function, detail: 'int StringLen(string string_value)', documentation: 'Returns number of characters in string.' },
    { name: 'StringSubstr', kind: node_1.CompletionItemKind.Function, detail: 'string StringSubstr(string string_value, int start_pos, int length)', documentation: 'Returns substring. length=-1 means to end of string.' },
    { name: 'StringFind', kind: node_1.CompletionItemKind.Function, detail: 'int StringFind(string string_value, string match_substring, int start_pos)', documentation: 'Returns position of first occurrence of match_substring, or -1.' },
    { name: 'StringReplace', kind: node_1.CompletionItemKind.Function, detail: 'int StringReplace(string &str, string find, string replacement)', documentation: 'Replaces all occurrences of find with replacement. Returns count of replacements.' },
    { name: 'StringFormat', kind: node_1.CompletionItemKind.Function, detail: 'string StringFormat(string format, ...)', documentation: 'Formats string like printf. e.g. StringFormat("%.2f", value).' },
    { name: 'StringToDouble', kind: node_1.CompletionItemKind.Function, detail: 'double StringToDouble(string value)', documentation: 'Converts string to double.' },
    { name: 'StringToInteger', kind: node_1.CompletionItemKind.Function, detail: 'long StringToInteger(string value)', documentation: 'Converts string to integer.' },
    { name: 'StringToTime', kind: node_1.CompletionItemKind.Function, detail: 'datetime StringToTime(string value)', documentation: 'Converts string "YYYY.MM.DD HH:MM" to datetime.' },
    { name: 'DoubleToString', kind: node_1.CompletionItemKind.Function, detail: 'string DoubleToString(double value, int digits)', documentation: 'Converts double to string with specified decimal places.' },
    { name: 'IntegerToString', kind: node_1.CompletionItemKind.Function, detail: 'string IntegerToString(long value, int str_len, ushort fill_symbol)', documentation: 'Converts integer to string.' },
    { name: 'TimeToString', kind: node_1.CompletionItemKind.Function, detail: 'string TimeToString(datetime value, int mode)', documentation: 'Converts datetime to string. mode: TIME_DATE|TIME_MINUTES|TIME_SECONDS.' },
    { name: 'NormalizeDouble', kind: node_1.CompletionItemKind.Function, detail: 'double NormalizeDouble(double value, int digits)', documentation: 'Rounds to specified decimal places. Use with SymbolInfoInteger(symbol, SYMBOL_DIGITS).' },
    // Array
    { name: 'ArraySize', kind: node_1.CompletionItemKind.Function, detail: 'int ArraySize(void &array[])', documentation: 'Returns total number of elements in array.' },
    { name: 'ArrayResize', kind: node_1.CompletionItemKind.Function, detail: 'int ArrayResize(void &array[], int new_size, int reserve_size)', documentation: 'Resizes array. Returns new size or -1 on error.' },
    { name: 'ArraySetAsSeries', kind: node_1.CompletionItemKind.Function, detail: 'bool ArraySetAsSeries(void &array[], bool flag)', documentation: 'Sets array indexing direction. true=newest element at index 0 (timeseries style).' },
    { name: 'ArrayIsSeries', kind: node_1.CompletionItemKind.Function, detail: 'bool ArrayIsSeries(void &array[])', documentation: 'Returns true if array is set as series.' },
    { name: 'ArraySort', kind: node_1.CompletionItemKind.Function, detail: 'bool ArraySort(void &array[])', documentation: 'Sorts array in ascending order.' },
    { name: 'ArrayBsearch', kind: node_1.CompletionItemKind.Function, detail: 'int ArrayBsearch(void &array[], double value, int count, int start, int direction)', documentation: 'Binary search in sorted array. Returns index.' },
    { name: 'ArrayCopy', kind: node_1.CompletionItemKind.Function, detail: 'int ArrayCopy(void &dst_array[], void &src_array[], int dst_start, int src_start, int count)', documentation: 'Copies array elements. Returns count copied.' },
    { name: 'ArrayFill', kind: node_1.CompletionItemKind.Function, detail: 'void ArrayFill(void &array[], int start, int count, void value)', documentation: 'Fills array elements with specified value.' },
    { name: 'ArrayInitialize', kind: node_1.CompletionItemKind.Function, detail: 'int ArrayInitialize(void &array[], char value)', documentation: 'Initializes all elements with given value.' },
    { name: 'ArrayMaximum', kind: node_1.CompletionItemKind.Function, detail: 'int ArrayMaximum(void &array[], int start, int count)', documentation: 'Returns index of maximum element.' },
    { name: 'ArrayMinimum', kind: node_1.CompletionItemKind.Function, detail: 'int ArrayMinimum(void &array[], int start, int count)', documentation: 'Returns index of minimum element.' },
    // Output
    { name: 'Print', kind: node_1.CompletionItemKind.Function, detail: 'void Print(...)', documentation: 'Prints values to Experts/Journal log tab.' },
    { name: 'PrintFormat', kind: node_1.CompletionItemKind.Function, detail: 'void PrintFormat(string format_string, ...)', documentation: 'Prints formatted string to journal. Equivalent to Print(StringFormat(...)).' },
    { name: 'Alert', kind: node_1.CompletionItemKind.Function, detail: 'void Alert(...)', documentation: 'Opens alert dialog box with message. Blocks execution until closed.' },
    { name: 'Comment', kind: node_1.CompletionItemKind.Function, detail: 'void Comment(...)', documentation: 'Displays values in top-left corner of chart.' },
    { name: 'GetLastError', kind: node_1.CompletionItemKind.Function, detail: 'int GetLastError()', documentation: 'Returns last error code and resets it to 0.' },
    { name: 'ResetLastError', kind: node_1.CompletionItemKind.Function, detail: 'void ResetLastError()', documentation: 'Resets last error to 0.' },
    // Timer
    { name: 'EventSetTimer', kind: node_1.CompletionItemKind.Function, detail: 'bool EventSetTimer(int seconds)', documentation: 'Starts timer that fires OnTimer() every specified seconds.' },
    { name: 'EventKillTimer', kind: node_1.CompletionItemKind.Function, detail: 'void EventKillTimer()', documentation: 'Stops timer started with EventSetTimer.' },
    { name: 'EventSetMillisecondTimer', kind: node_1.CompletionItemKind.Function, detail: 'bool EventSetMillisecondTimer(int milliseconds)', documentation: 'Starts timer with millisecond precision.' },
    // Utility
    { name: 'GetTickCount', kind: node_1.CompletionItemKind.Function, detail: 'uint GetTickCount()', documentation: 'Returns milliseconds elapsed since computer started. Wraps every ~49.7 days.' },
    { name: 'GetTickCount64', kind: node_1.CompletionItemKind.Function, detail: 'ulong GetTickCount64()', documentation: 'Returns milliseconds elapsed since computer started as 64-bit.' },
    { name: 'GetMicrosecondCount', kind: node_1.CompletionItemKind.Function, detail: 'ulong GetMicrosecondCount()', documentation: 'Returns microseconds elapsed since start of MQL5 program.' },
    { name: 'Sleep', kind: node_1.CompletionItemKind.Function, detail: 'void Sleep(int milliseconds)', documentation: 'Suspends execution for specified milliseconds. Only for scripts and non-real-time EAs.' },
    { name: 'IsStopped', kind: node_1.CompletionItemKind.Function, detail: 'bool IsStopped()', documentation: 'Returns true if program is requested to stop. Check in loops to allow clean exit.' },
    { name: 'UninitializeReason', kind: node_1.CompletionItemKind.Function, detail: 'int UninitializeReason()', documentation: 'Returns deinitialization reason code.' },
    { name: 'MQLInfoInteger', kind: node_1.CompletionItemKind.Function, detail: 'int MQLInfoInteger(ENUM_MQL_INFO_INTEGER property_id)', documentation: 'Returns MQL program integer property (MQL_PROGRAM_TYPE, MQL_TESTER, etc.).' },
    { name: 'MQLInfoString', kind: node_1.CompletionItemKind.Function, detail: 'string MQLInfoString(ENUM_MQL_INFO_STRING property_id)', documentation: 'Returns MQL program string property (MQL_PROGRAM_NAME, MQL_PROGRAM_PATH).' },
];
exports.MQL5_CONSTANTS = [
    { name: 'PERIOD_M1', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_TIMEFRAMES = 1', documentation: '1 minute timeframe.' },
    { name: 'PERIOD_M5', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_TIMEFRAMES = 5', documentation: '5 minute timeframe.' },
    { name: 'PERIOD_M15', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_TIMEFRAMES = 15', documentation: '15 minute timeframe.' },
    { name: 'PERIOD_M30', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_TIMEFRAMES = 30', documentation: '30 minute timeframe.' },
    { name: 'PERIOD_H1', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_TIMEFRAMES = 60', documentation: '1 hour timeframe.' },
    { name: 'PERIOD_H4', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_TIMEFRAMES = 240', documentation: '4 hour timeframe.' },
    { name: 'PERIOD_D1', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_TIMEFRAMES = 1440', documentation: 'Daily timeframe.' },
    { name: 'PERIOD_W1', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_TIMEFRAMES = 10080', documentation: 'Weekly timeframe.' },
    { name: 'PERIOD_MN1', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_TIMEFRAMES = 43200', documentation: 'Monthly timeframe.' },
    { name: 'PERIOD_CURRENT', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_TIMEFRAMES = 0', documentation: 'Current chart timeframe.' },
    { name: 'ORDER_TYPE_BUY', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_ORDER_TYPE = 0', documentation: 'Market buy order.' },
    { name: 'ORDER_TYPE_SELL', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_ORDER_TYPE = 1', documentation: 'Market sell order.' },
    { name: 'ORDER_TYPE_BUY_LIMIT', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_ORDER_TYPE = 2', documentation: 'Buy limit pending order.' },
    { name: 'ORDER_TYPE_SELL_LIMIT', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_ORDER_TYPE = 3', documentation: 'Sell limit pending order.' },
    { name: 'ORDER_TYPE_BUY_STOP', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_ORDER_TYPE = 4', documentation: 'Buy stop pending order.' },
    { name: 'ORDER_TYPE_SELL_STOP', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_ORDER_TYPE = 5', documentation: 'Sell stop pending order.' },
    { name: 'TRADE_ACTION_DEAL', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_TRADE_REQUEST_ACTIONS = 1', documentation: 'Place market order (instant execution).' },
    { name: 'TRADE_ACTION_PENDING', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_TRADE_REQUEST_ACTIONS = 5', documentation: 'Place pending order.' },
    { name: 'TRADE_ACTION_SLTP', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_TRADE_REQUEST_ACTIONS = 6', documentation: 'Modify SL/TP of open position.' },
    { name: 'TRADE_ACTION_MODIFY', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_TRADE_REQUEST_ACTIONS = 7', documentation: 'Modify pending order price/SL/TP/expiry.' },
    { name: 'TRADE_ACTION_REMOVE', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_TRADE_REQUEST_ACTIONS = 8', documentation: 'Delete pending order.' },
    { name: 'TRADE_ACTION_CLOSE_BY', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_TRADE_REQUEST_ACTIONS = 10', documentation: 'Close position by opposite position.' },
    { name: 'INIT_SUCCEEDED', kind: node_1.CompletionItemKind.Constant, detail: '= 0', documentation: 'Initialization successful. Return from OnInit().' },
    { name: 'INIT_FAILED', kind: node_1.CompletionItemKind.Constant, detail: '= 1', documentation: 'Initialization failed. EA/indicator will not run.' },
    { name: 'SYMBOL_ASK', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_SYMBOL_INFO_DOUBLE', documentation: 'Best ask price for symbol.' },
    { name: 'SYMBOL_BID', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_SYMBOL_INFO_DOUBLE', documentation: 'Best bid price for symbol.' },
    { name: 'SYMBOL_POINT', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_SYMBOL_INFO_DOUBLE', documentation: 'Point size (minimum price change).' },
    { name: 'SYMBOL_DIGITS', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_SYMBOL_INFO_INTEGER', documentation: 'Number of decimal places in price.' },
    { name: 'SYMBOL_SPREAD', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_SYMBOL_INFO_INTEGER', documentation: 'Current spread in points.' },
    { name: 'SYMBOL_TRADE_CONTRACT_SIZE', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_SYMBOL_INFO_DOUBLE', documentation: 'Trade contract size (e.g. 100000 for forex standard lot).' },
    { name: 'ACCOUNT_BALANCE', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_ACCOUNT_INFO_DOUBLE', documentation: 'Account balance in deposit currency.' },
    { name: 'ACCOUNT_EQUITY', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_ACCOUNT_INFO_DOUBLE', documentation: 'Account equity = balance + floating profit/loss.' },
    { name: 'ACCOUNT_MARGIN', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_ACCOUNT_INFO_DOUBLE', documentation: 'Margin used by open positions.' },
    { name: 'ACCOUNT_MARGIN_FREE', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_ACCOUNT_INFO_DOUBLE', documentation: 'Free margin available to open new positions.' },
    { name: 'ACCOUNT_PROFIT', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_ACCOUNT_INFO_DOUBLE', documentation: 'Current floating profit/loss on open positions.' },
    { name: 'MODE_SMA', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_MA_METHOD = 0', documentation: 'Simple Moving Average.' },
    { name: 'MODE_EMA', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_MA_METHOD = 1', documentation: 'Exponential Moving Average.' },
    { name: 'MODE_SMMA', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_MA_METHOD = 2', documentation: 'Smoothed Moving Average.' },
    { name: 'MODE_LWMA', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_MA_METHOD = 3', documentation: 'Linear Weighted Moving Average.' },
    { name: 'PRICE_CLOSE', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_APPLIED_PRICE = 1', documentation: 'Close price applied.' },
    { name: 'PRICE_OPEN', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_APPLIED_PRICE = 2', documentation: 'Open price applied.' },
    { name: 'PRICE_HIGH', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_APPLIED_PRICE = 3', documentation: 'High price applied.' },
    { name: 'PRICE_LOW', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_APPLIED_PRICE = 4', documentation: 'Low price applied.' },
    { name: 'PRICE_MEDIAN', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_APPLIED_PRICE = 5', documentation: '(High+Low)/2.' },
    { name: 'PRICE_TYPICAL', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_APPLIED_PRICE = 6', documentation: '(High+Low+Close)/3.' },
    { name: 'PRICE_WEIGHTED', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_APPLIED_PRICE = 7', documentation: '(High+Low+Close+Close)/4.' },
    { name: 'clrRed', kind: node_1.CompletionItemKind.Constant, detail: 'color = 0x0000FF', documentation: 'Red color constant.' },
    { name: 'clrGreen', kind: node_1.CompletionItemKind.Constant, detail: 'color = 0x008000', documentation: 'Green color constant.' },
    { name: 'clrBlue', kind: node_1.CompletionItemKind.Constant, detail: 'color = 0xFF0000', documentation: 'Blue color constant.' },
    { name: 'clrWhite', kind: node_1.CompletionItemKind.Constant, detail: 'color = 0xFFFFFF', documentation: 'White color constant.' },
    { name: 'clrBlack', kind: node_1.CompletionItemKind.Constant, detail: 'color = 0x000000', documentation: 'Black color constant.' },
    { name: 'clrYellow', kind: node_1.CompletionItemKind.Constant, detail: 'color = 0x00FFFF', documentation: 'Yellow color constant.' },
    { name: 'clrNONE', kind: node_1.CompletionItemKind.Constant, detail: 'color = 0xFF000000', documentation: 'No color / transparent.' },
    { name: 'DRAW_LINE', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_DRAW_TYPE', documentation: 'Draw indicator as line.' },
    { name: 'DRAW_HISTOGRAM', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_DRAW_TYPE', documentation: 'Draw indicator as histogram (bars from zero).' },
    { name: 'DRAW_NONE', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_DRAW_TYPE', documentation: 'Do not draw indicator.' },
    { name: 'INDICATOR_DATA', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_INDEXBUFFER_TYPE = 0', documentation: 'Buffer is plotted data. Use with SetIndexBuffer.' },
    { name: 'INDICATOR_COLOR_INDEX', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_INDEXBUFFER_TYPE = 1', documentation: 'Buffer stores color index for color draw types.' },
    { name: 'INDICATOR_CALCULATIONS', kind: node_1.CompletionItemKind.Constant, detail: 'ENUM_INDEXBUFFER_TYPE = 2', documentation: 'Buffer used only for internal calculations, not plotted.' },
];
exports.MQL5_PREDEFINED_VARS = [
    { name: '_Symbol', kind: node_1.CompletionItemKind.Variable, detail: 'string', documentation: 'Current chart symbol name. Same as Symbol() function.' },
    { name: '_Period', kind: node_1.CompletionItemKind.Variable, detail: 'ENUM_TIMEFRAMES', documentation: 'Current chart timeframe. Same as Period() function.' },
    { name: '_Point', kind: node_1.CompletionItemKind.Variable, detail: 'double', documentation: 'Point size of current symbol. Same as Point() function.' },
    { name: '_Digits', kind: node_1.CompletionItemKind.Variable, detail: 'int', documentation: 'Number of decimal places for current symbol. Same as Digits() function.' },
    { name: '_Bid', kind: node_1.CompletionItemKind.Variable, detail: 'double', documentation: 'Current bid price. Prefer SymbolInfoDouble(_Symbol, SYMBOL_BID) for thread safety.' },
    { name: '_Ask', kind: node_1.CompletionItemKind.Variable, detail: 'double', documentation: 'Current ask price. Prefer SymbolInfoDouble(_Symbol, SYMBOL_ASK) for thread safety.' },
    { name: '_LastError', kind: node_1.CompletionItemKind.Variable, detail: 'int', documentation: 'Last error code. Prefer GetLastError() which also resets the value.' },
    { name: '_StopFlag', kind: node_1.CompletionItemKind.Variable, detail: 'bool', documentation: 'True when program stop is requested. Check in loops instead of IsStopped().' },
    { name: 'EMPTY_VALUE', kind: node_1.CompletionItemKind.Variable, detail: 'double = DBL_MAX', documentation: 'Empty indicator buffer value. Cells with this value are not plotted.' },
];
function buildCompletionItems() {
    const items = [];
    for (const kw of exports.MQL5_KEYWORDS) {
        items.push({
            label: kw,
            kind: node_1.CompletionItemKind.Keyword,
        });
    }
    for (const t of exports.MQL5_TYPES) {
        items.push({
            label: t,
            kind: node_1.CompletionItemKind.TypeParameter,
        });
    }
    for (const sym of [...exports.MQL5_EVENT_HANDLERS, ...exports.MQL5_FUNCTIONS]) {
        items.push({
            label: sym.name,
            kind: sym.kind,
            detail: sym.detail,
            documentation: {
                kind: node_1.MarkupKind.Markdown,
                value: sym.documentation,
            },
        });
    }
    for (const c of [...exports.MQL5_CONSTANTS, ...exports.MQL5_PREDEFINED_VARS]) {
        items.push({
            label: c.name,
            kind: c.kind,
            detail: c.detail,
            documentation: {
                kind: node_1.MarkupKind.Markdown,
                value: c.documentation,
            },
        });
    }
    return items;
}
function findSymbol(name) {
    return (exports.MQL5_EVENT_HANDLERS.find(s => s.name === name) ??
        exports.MQL5_FUNCTIONS.find(s => s.name === name) ??
        exports.MQL5_CONSTANTS.find(s => s.name === name) ??
        exports.MQL5_PREDEFINED_VARS.find(s => s.name === name));
}
