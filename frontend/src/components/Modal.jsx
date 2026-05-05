export default function Modal({ children, onClose }) {
  return (
    <div className="modal-bg">
      <div className="modal">
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
}