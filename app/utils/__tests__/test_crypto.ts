import { createWallet, signMessage } from '../crypto';
import EC from 'elliptic-expo/lib/elliptic/ec';
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
  it('should return a valid signature', async () => {
    const wallet = createWallet();
    const message = "test message";

    const result = await signMessage(message, wallet.private_key)

    const keyPair = ec.keyFromPrivate(wallet.private_key)
    expect(keyPair.verify(result.message_hash, result.signature)).toBe(true)
  })
})
