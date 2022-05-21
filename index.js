const chalk = require('chalk');
const WebSocket = require('ws');

const OPENSEA_WYVERN_EXCHANGE_CONTRACTADDR = "0x7f268357A8c2552623316e2562D90e642bB538E5";

const ws_subscription = new WebSocket(
  'ws://127.0.0.1:28333/ws', {
    headers: {
      "Authorization": "MjU4YjcwYjctNjZiNS00ZDZhLTk1M2UtMDdjYWU4NzA3YzQ5OmRjZWVkZWQ2ZmRhOTUyYjdiODc2YmE5ZjA5YTYxMTM3"
    },
    rejectUnauthorized: false,
  }
);

const requestSubscription = () => {
  const kk = `{"jsonrpc": "2.0", "id": 1, "method": "subscribe", "params": ["newTxs", {"filters": "{to} == '${OPENSEA_WYVERN_EXCHANGE_CONTRACTADDR}'", "include": []}]}`;
  console.log(chalk.cyan("Subscription requestted for monitoring rival txns", kk));
  // aws.send(`{"jsonrpc": "2.0", "id": 1, "method": "subscribe", "params": ["bdnBlocks", {"include": ["hash"]}]}`);
  ws_subscription.send(kk);
}

const processSubscription = (result) => {
  console.log(result);
}

ws_subscription.on('open', requestSubscription);
ws_subscription.on('message', processSubscription);
