import { useState } from "react"
import CryptoJS from "crypto-js"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button, Form, FormControl, FormGroup, InputGroup } from "react-bootstrap"
import DecryptedModal from './Modals/DecryptedModal'

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
    const [output, setOutput] = useState('')
    const [secret, setSecret] = useState("")
    const [mode, setMode] = useState("ECB")
    const [padding, setPadding] = useState("PKCS5")

    const [hideSecret, setHideSecret] = useState(true)
    const [showOutput, setShowOutput] = useState(false)

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
        copyToClipboard(decrypted.toString(CryptoJS.enc.Utf8))
    }

    function copyToClipboard(text) {

        navigator.clipboard.writeText(text).then(() => {
            alert("Copied to clipboard!")
        }).catch((err) => {
            alert("Error copying to clipboard")
        })
        
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
                    <Form.Label>Secret Key</Form.Label>
                    <InputGroup>
                        {
                            hideSecret ?
                                <Button variant="light" onClick={() => setHideSecret(false)}><FaEyeSlash /></Button> :
                                <Button variant="light" onClick={() => setHideSecret(true)}><FaEye /></Button>
                        }
                        <Form.Control type={hideSecret ? "password" : "text"} value={secret} onChange={(e) => setSecret(e.target.value)} />
                        <Button variant="dark" onClick={() => setSecret("")} >Clear</Button>
                    </InputGroup>
                </Form.Group>
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
                <Form.Group className="mb-4">
                    <Form.Label>Initialization Vector</Form.Label>
                    <Form.Control type="text" value={initVector} onChange={(e) => setInitVector(e.target.value)} />
                </Form.Group>

                <Button variant="dark" onClick={decrypt}>Decrypt</Button>
                {output && <Button variant="link" onClick={()=>setShowOutput(true)}>Not in clipboard?</Button>}
            </Form>
            <DecryptedModal output={output} clear={()=>setOutput("")} open={showOutput} setOpen={setShowOutput} />

        </div>
    )

}