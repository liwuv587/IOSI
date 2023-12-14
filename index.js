//  #1 安装对应的包
//  npm install iost minimist
//  ## 1.1 如果装不上就是使用 npm --registry https://registry.npm.taobao.org install iost minimist
//  #2 执行脚本
//  node index.js --accountName 你的账号  --privateKey 你的私钥
var argv = require('minimist')(process.argv.slice(2));
const bs58 = require('bs58')
const IOST = require('iost')

console.log(argv)

const accountName = argv['accountName']
const privateKey = argv['privateKey']
let amount = "1"
const limit = (argv['limit'] && parseInt(argv['limit'])) ?? 5;

console.log(limit);

//const rpc = new IOST.RPC(new IOST.HTTPProvider("http://18.209.137.246:30001"))
const rpc = new IOST.RPC(new IOST.HTTPProvider("http://api.iost.io"))
//rpc.blockchain.getChainInfo().then(console.log)


const iost = new IOST.IOST({
    gasRatio: 1,
    gasLimit: 100000,
    expiration: 90,
});
iost.setRPC(rpc);


const account = new IOST.Account(accountName)
const kp = new IOST.KeyPair(bs58.decode(privateKey))
account.addKeyPair(kp, "owner")
account.addKeyPair(kp, "active")

iost.setAccount(account)

//const tx = iost.callABI("token.iost", "transfer", ["iost", accountName, accountName, amount, ""]);
//tx.addApprove('iost', amount)
async function main() {
    for (let n = 0; n < limit; n++) {

        try {

            // let tx = iost.callABI("token.iost", "transfer", ["iost", accountName, accountName, amount, ""]);
            // let tx = iost.callABI("token.iost", "transfer", ["iost", accountName, 'deadaddr', amount, "IOST"]);
            // tx.addApprove('iost', amount)
            // iost.signAndSend(tx)
            //     .on('pending', (resp) => {
            //         console.log('tx pending: ' + JSON.stringify(resp))
            //     })
            //     .on('success', (resp) => {
            //         console.log('tx success: ' + JSON.stringify(resp.tx_hash))
            //     })
            //     .on('failed', (resp) => {
            //         console.log('tx failed: ' + JSON.stringify(resp))
            //     })
        } catch (error) {
            console.log("err", error)
        }

        await sleep(1000)
    }
}
function sleep(ms) {
    return new Promise(resolve => { setTimeout(resolve, ms); });
}

main()