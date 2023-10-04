import { keccak256 } from "js-sha3";
import { Buffer } from "buffer";
import RLP from "rlp";
import EC from "elliptic-expo/lib/elliptic/ec";
const ec = new EC("secp256k1");

export function createWallet() {
  //Generate a new key pair
  const keyPair = ec.genKeyPair();

  // get private key
  const priv = keyPair.getPrivate("hex");

  // Get a public key
  const pubPoint = keyPair.getPublic();
  const pub = pubPoint.getX().toString('hex') + pubPoint.getY().toString('hex')

  // take keccak hash of public key
  const keccak = keccak256(Buffer.from(pub, "hex"));

  // address is 0x + last 20 bytes of public key
  let address = keccak.slice(-40);

  // compute checksum for address
  address = address.toLowerCase().replace("0x", "");
  const hash = keccak256(address).toString();
  let result = "0x";
  for (let i = 0; i < address.length; i++) {
    if (parseInt(hash[i], 16) >= 8) {
      result += address[i].toUpperCase();
    } else {
      result += address[i];
    }
  }
  const checksum_address = `0x${address}`;

  return {
    public_key: pub,
    private_key: priv,
    address: checksum_address,
  };
}

export function signMessage(message: string, private_key: string) {
  // get key pair from private key
  const keyPair = ec.keyFromPrivate(private_key, "hex");

  // create hash of the meassge
  const messageHash = keccak256(Buffer.from(message, "utf-8"));

  // sign the hash with the private key
  const signature = keyPair.sign(messageHash).toDER("hex");

  return { message_hash: messageHash, signature: signature };
}

export function signTransaction(private_key: string, transaction: Transaction) {
  // get key pair from private key
  const keyPair = ec.keyFromPrivate(private_key, "hex");

  // create hash of transaction
  const transactionHash = Buffer.from(keccak256(transaction.toString()), "hex");

  // sign the transaction hash
  const signature = keyPair.sign(transactionHash, private_key);

  const signedTransaction: SignedTransaction = {
    ...transaction,
    v: signature.recoveryParam,
    r: signature.r,
    s: signature.s,
  };

  // RLP encoding the signed transaction
  const rawSignedTransaction = [
    signedTransaction.from,
    signedTransaction.recipient,
    "0x" + parseInt(signedTransaction.gasLimit, 10).toString(16),
    "0x" + parseInt(signedTransaction.maxFeePerGas, 10).toString(16),
    "0x" + parseInt(signedTransaction.maxPriorityFeePerGas, 10).toString(16),
    "0x" + parseInt(signedTransaction.nonce, 10).toString(16),
    "0x" + parseInt(signedTransaction.value, 10).toString(16),
    "0x" + parseInt(signedTransaction.v, 10).toString(16),
    "0x" + signedTransaction.r,
    "0x" + signedTransaction.s,
  ];
  const encodedSignedTx = RLP.encode(rawSignedTransaction);

  return {
    raw: "0x" + Buffer.from(encodedSignedTx).toString("hex"),
    tx: signedTransaction,
    txDER: signature.toDER("hex"),
    txHash: transactionHash,
  };
}
