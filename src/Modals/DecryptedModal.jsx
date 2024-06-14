import { Button, Modal } from "react-bootstrap"

export default function DecryptedModal({ output, clear, open, setOpen }) {

    const closeFormAndClear = () => {
        setOpen(false)
        clear()
    }

    return(
        <Modal show={open} onHide={()=>closeFormAndClear()}>
            <Modal.Header closeButton>
                <Modal.Title>Copy Plaintext</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Copy the text below</p>
                <input readOnly style={{ backgroundColor: 'white', textAlign: 'center', width: '100%' }} type="password" value={output} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={()=>closeFormAndClear()}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}