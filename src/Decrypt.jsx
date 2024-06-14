import { useState } from "react"
import CryptoJS from "crypto-js"

export default function Decrypt() {


    const cipherModes = {
        "ECB": CryptoJS.mode.ECB,
        "CBC": CryptoJS.mode.CBC,
    }

    const paddingOptions = {
        "NoPadding": CryptoJS.pad.NoPadding,
        "PKCS5": CryptoJS.pad.Pkcs7,
    }


    const [initVector, setInitVector] = useState('')
    const [ciphertext, setCiphertext] = useState('')
    const [secret, setSecret] = useState("")
    const [mode, setMode] = useState("ECB")
    const [padding, setPadding] = useState("PKCS5")
    const [output, setOutput] = useState("")

    function decrypt() {
        var iv = CryptoJS.enc.Base64.parse(initVector)
        var key = CryptoJS.enc.Utf8.parse(secret)
        var cipherBytes = CryptoJS.enc.Base64.parse(ciphertext)

        const decrypted = CryptoJS.AES.decrypt({ ciphertext: cipherBytes }, key, {
            initVector: iv,
            mode: cipherModes[mode],
            padding: paddingOptions[padding]
        })

        setOutput(decrypted.toString(CryptoJS.enc.Utf8))
    }

    return (
        <div id="decrypt-container">
            <h1>Decrypt</h1>
            <div id='ciphertext-input'>
                <label>Ciphertext: </label>
                <textarea onChange={(e) => setCiphertext(e.target.value)} value={ciphertext} />
            </div>
            <div id="mode-select">
                <label>Cipher Mode</label>
                <select value={mode} onChange={(e) => setMode(e.target.value)}>
                    <option value={"ECB"}>ECB</option>
                    <option value={"CBC"}>CBC</option>
                </select>
            </div>
            <div id="padding-select">
                <label>Select Padding</label>
                <select value={padding} onChange={(e) => setPadding(e.target.value)}>
                    <option value={"None"}>None</option>
                    <option value={"PKCS5"}>PKCS5</option>
                </select>
            </div>
            <div id="initialization-vector">
                <label>Initialization Vector</label>
                <input value={initVector} onChange={(e) => setInitVector(e.target.value)}/>
            </div>
            <div id="secret-key">
                <label>Secret Key</label>
                <input value={secret} onChange={(e) => setSecret(e.target.value)} />
            </div>
            <div id="results-container">
                <button onClick={decrypt}>Decrypt</button>
                {output && <div id="result-container" style={{ border: "1px solid black", padding: 20 }}>
                    <div id="result">
                        <p>
                            {output}
                        </p>
                        <button onClick={() => setOutput("")}>Clear</button>
                    </div>

                </div>}

            </div>
        </div>
    )

}