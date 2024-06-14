import { useState } from "react"
import CryptoJS from "crypto-js"
import { Button, Card, Form, Row } from "react-bootstrap"

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
                        <Form>
                <h1 className="mb-4">Decrypt</h1>
                <Form.Group className="mb-4">
                    <Form.Label>Ciphertext:</Form.Label>
                    <Form.Control as='textarea' rows={3}
                        onChange={(e) => setCiphertext(e.target.value)} value={ciphertext}
                    />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label>Cipher Mode:</Form.Label>
                    <Form.Select value={mode} onChange={(e) => setMode(e.target.value)}>
                        <option value={"ECB"}>ECB</option>
                        <option value={"CBC"}>CBC</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label>Select Padding:</Form.Label>
                    <Form.Select value={padding} onChange={(e) => setPadding(e.target.value)}>
                        <option value={"None"}>None</option>
                        <option value={"PKCS5"}>PKCS5</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label>Initialization Vector</Form.Label>
                    <Form.Control type="text" value={initVector} onChange={(e) => setInitVector(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label>Secret Key</Form.Label>
                    <Form.Control type="text" value={secret} onChange={(e) => setSecret(e.target.value)} />
                </Form.Group>

                <Button variant="dark" onClick={decrypt}>Decrypt</Button>
            </Form>
            {output && <div id="result">
                <p>
                    {output}
                </p>
                <Button onClick={() => setOutput("")}>Clear</Button>
            </div>}
        </div>



    )

}