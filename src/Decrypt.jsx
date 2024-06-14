import { useState } from "react"
import CryptoJS from "crypto-js"
import { Button, Card, Form, InputGroup, Row } from "react-bootstrap"

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
        copyToClipboard(output)
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text)
        alert("Copied to clipboard!")
    }

    return (
        <div id="decrypt-container">
            <Form>
                <h1 className="mb-4">Decrypt</h1>
                <InputGroup className="mb-4">
                    <InputGroup.Text>Ciphertext:</InputGroup.Text>
                    <Form.Control as='textarea' rows={3}
                        onChange={(e) => setCiphertext(e.target.value)} value={ciphertext}
                    />
                 </InputGroup>
                 <InputGroup className="mb-4">
                    <InputGroup.Text>Secret Key</InputGroup.Text>
                    <Form.Control type="text" value={secret} onChange={(e) => setSecret(e.target.value)} />
                </InputGroup>
                <InputGroup className="mb-4">
                <InputGroup.Text >Cipher Mode</InputGroup.Text>
                <Form.Select value={mode} onChange={(e) => setMode(e.target.value)}>
                        <option value={"ECB"}>ECB</option>
                        <option value={"CBC"}>CBC</option>
                    </Form.Select>
                </InputGroup>
                <InputGroup className="mb-4">
                    <InputGroup.Text>Padding</InputGroup.Text>
                    <Form.Select value={padding} onChange={(e) => setPadding(e.target.value)}>
                        <option value={"None"}>None</option>
                        <option value={"PKCS5"}>PKCS5</option>
                    </Form.Select>
                </InputGroup>
                <InputGroup className="mb-4">
                    <InputGroup.Text>Initialization Vector</InputGroup.Text>
                    <Form.Control type="text" value={initVector} onChange={(e) => setInitVector(e.target.value)} />
                </InputGroup>

                <Button variant="dark" onClick={decrypt}>Decrypt</Button>
            </Form>
        </div>



    )

}