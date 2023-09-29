import { createWallet, signMessage, signTransaction } from '../crypto';
import EC from 'elliptic-expo/lib/elliptic/ec';
import RLP from 'rlp';
const ec = new EC('secp256k1')

describe('createWallet', () => {
  it('should generate a wallet with valid public and private keys', () => {
    const wallet = createWallet();

    // Check if public key is a valid 128 character hex string
    expect(/^[0-9A-Fa-f]{128}$/.test(wallet.public_key)).toBe(true);

    // Check if private key is a valid 64 character hex string
    expect(/^[0-9A-Fa-f]{64}$/.test(wallet.private_key)).toBe(true);
  });

  it('should generate a valid Ethereum address', () => {
    const wallet = createWallet();

    // Check if the address starts with '0x' and is 42 characters long
    expect(wallet.address).toMatch(/^0x[0-9A-Fa-f]{40}$/);

    // Check if the checksum address is a valid Ethereum address
    expect(wallet.address).toBe(wallet.address.toLowerCase());
  });
});

describe('signMessage', () => {
  it('should return a valid signature', () => {
    const wallet = createWallet();
    const message = "test message";

    const result = signMessage(message, wallet.private_key)

    const keyPair = ec.keyFromPrivate(wallet.private_key)
    expect(keyPair.verify(result.message_hash, result.signature)).toBe(true)
  })
})

describe('signTransaction', () => {
  it('should return a valid signature', () => {
    const wallet = createWallet()

    const transaction: Transaction = {
      from: wallet.address,
      recipient: '0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8',
      gasLimit: 21000,
      maxFeePerGas: 300,
      maxPriorityFeePerGas: 10,
      nonce: 0,
      value: 1000000000000
    }

    const result = signTransaction(wallet.private_key, transaction)

    const keyPair = ec.keyFromPrivate(wallet.private_key)
    expect(keyPair.verify(result.txHash, result.txDER)).toBe(true)
  })

  it('should return a valid RLP encoded transaction', () => {
    const wallet = createWallet()

    const transaction: Transaction = {
      from: wallet.address,
      recipient: '0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8',
      gasLimit: 21000,
      maxFeePerGas: 300,
      maxPriorityFeePerGas: 10,
      nonce: 0,
      value: 1000000000000
    }
    const result = signTransaction(wallet.private_key, transaction)

    // the first decoded value should be equal to the wallet address
    const decoded = RLP.decode(result.raw)
    const decodedSender = Array.from(decoded[0] as Uint8Array).map(byte => byte.toString(16).padStart(2, '0')).join('');
    expect('0x'+decodedSender).toEqual(wallet.address)
  })
})
