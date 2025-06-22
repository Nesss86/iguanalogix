export default function Welcome() {
  const quickLogin = () => {
    // Simulate login
    alert('Quick login successful!');
  };

  return (
    <div className="welcome">
      <h1>Welcome to IguanaLogix</h1>
      <button onClick={quickLogin}>Quick Login</button>
    </div>
  );
}
