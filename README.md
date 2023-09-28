## TODO:
- [x] ability to create wallet 
- [] ability to sign a message using that wallets private key 
- [x] store the private key in encrypted storage 
    - [x] android
    - [] ios 
- [x] show the ETH wallet address of the wallet on the home screen 
- [] sign an ethereum transaction 
    - RLP package included in package.json

## NOTES: 
- eliptic library to get a public key: https://github.com/enyalabs/elliptic-expo
- encrypted storage: https://docs.expo.dev/versions/latest/sdk/securestore/
- use expo router for navigation: https://docs.expo.dev/routing/navigating-pages/
- for turning public key into wallet address: https://ethereum.org/en/developers/docs/accounts/#account-creation
- ethereum transactions: https://ethereum.org/en/developers/docs/transactions/
- rlp package: https://www.npmjs.com/package/rlp

## WIREFRAME
![wireframe](/docs/app-wireframe.png)