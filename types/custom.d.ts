
// general transaction type before signing
type Transaction = {
    from: Int, 
    recipient: string, 
    gasLimit: Int, 
    maxFeePerGas: Int, 
    maxPriorityFeePerGas: Int
    nonce: Int,
    value: Int
}

// signed transaction type
type SignedTransaction = {
    from: Int, 
    recipient: string, 
    gasLimit: Int, 
    maxFeePerGas: Int, 
    maxPriorityFeePerGas: Int
    nonce: Int,
    value: Int
    v: string, 
    r: string, 
    s: string
}