import React, { useEffect, useState } from "react";
import { Modal, Button, Label, TextInput } from "flowbite-react";

export default function ConfirmOrder({ sessionUserId, orderUserId }) {
  const [showModal, setShowModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");

  // Check if session user matches order user
  useEffect(() => {
    if (sessionUserId !== orderUserId) {
      setShowModal(true);
    }
  }, [sessionUserId, orderUserId]);

  const handleSubmit = () => {
    if (!firstName.trim()) {
      alert("Please enter your first name.");
      return;
    }

    // Simulate authentication success
    setShowModal(false);
  };

  return (
    <>
      <Modal show={showModal} onClose={() => setShowModal(false)} size="md" popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-red-700">Confirm Your Identity</h3>

            <div>
              <Label htmlFor="firstName" value="Google First Name (Required)" />
              <TextInput
                id="firstName"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone" value="Phone Number (Optional)" />
              <TextInput
                id="phone"
                type="tel"
                placeholder="e.g. 123-456-7890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="w-full">
              <Button onClick={handleSubmit} color="failure">
                Continue
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
